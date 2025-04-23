<script lang="ts" setup>
	import { type ComputedRef, type Ref, computed, inject, ref, watch } from 'vue';
	import { type RouteLocation, useRoute, useRouter } from 'vue-router';
	import { type EraDetails, type ErasUseCases, provideErasUseCases } from '@swdbapp/eras-feature';
	import type { Nullable } from '@swdbapp/types';

	const ROUTER = useRouter();
	const useCases: ErasUseCases = provideErasUseCases();
	const currentRoute: RouteLocation = useRoute();
	const toggleLoading: () => void = inject('toggleLoading');
	const era: Ref<Nullable<EraDetails>> = ref(null);

	const isEmpty: ComputedRef<boolean> = computed(() => {
		return !era.value || (!era.value.description && !era.value.titles?.length);
	});

	const fetchEraDetails = async (id: string): Promise<void> => {
		toggleLoading();
		await useCases.detail({ id });
		era.value = useCases.eraDetail;
		toggleLoading();
	};

	const navigateToTitle = (id: number): void => {
		ROUTER.push({ name: 'title-details-view', params: { id: `${id}` } });
	};

	watch(
		() => currentRoute.params.id,
		eraId => fetchEraDetails(eraId as string),
		{ immediate: true }
	);
</script>

<template>
	<div class="era-details-view p-relative p-1">
		<h1
			class="era-details-view__header d-flex align-center border-bottom-1 p-sticky mt-0 bg-color-background top-0">
			<img class="w-2 h-2 mb-05 mr-1" :src="era?.logo.href" :alt="era?.name" />
			<span>{{ era?.name }}</span>
		</h1>
		<p class="mt-2 ta-justify">{{ era?.description }}</p>
		<template v-if="era?.titles">
			<p class="text-uppercase border-bottom-1 pb-05 mt-2">Titles</p>
			<div class="era-details-view__grid">
				<template v-for="title in era?.titles" :key="`era-title-${title.$id}`">
					<div class="d-flex flex-column center era-details-view__title-logo cursor-pointer">
						<img :src="title.logo.href" :alt="title.title" @click="navigateToTitle(title.$id)" />
					</div>
				</template>
			</div>
		</template>
		<template v-if="isEmpty">
			<p class="mt-2 center">This is not the era you are looking for</p>
		</template>
	</div>
</template>

<style lang="sass" src="./styles.sass"></style>
