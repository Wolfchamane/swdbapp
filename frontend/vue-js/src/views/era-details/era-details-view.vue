<script lang="ts" setup>
	import { type Ref, inject, ref, watch } from 'vue';
	import { type RouteLocation, useRoute, useRouter } from 'vue-router';
	import { type EraDetails, type EraTitle, type ErasUseCases, provideErasUseCases } from '@swdbapp/eras-feature';
	import type { Nullable } from '@swdbapp/types';

	const ROUTER = useRouter();
	const useCases: ErasUseCases = provideErasUseCases();
	const currentRoute: RouteLocation = useRoute();
	const toggleLoading: () => void = inject('toggleLoading');
	const era: Ref<Nullable<EraDetails>> = ref(null);

	const fetchEraDetails = async (id: string): Promise<void> => {
		toggleLoading();
		await useCases.detail({ id });
		era.value = useCases.eraDetail;
		console.log(era.value);
		toggleLoading();
	};

	const navigateToTitle = (id: number): void => {
		ROUTER.push({ name: 'title-details-view', params: { id: `${id}` } });
	};

	const isTitleClickable = (title: EraTitle): boolean => {
		return [33].includes(title.$id);
	};

	watch(
		() => currentRoute.params.id,
		eraId => fetchEraDetails(eraId as string),
		{ immediate: true }
	);
</script>

<template lang="pug">
    .era-details-view.p-relative.p-1
        h1.era-details-view__header.d-flex.align-center.border-bottom-1.p-sticky.mt-0.bg-color-background.top-0
            img.w-2.h-2.mb-05.mr-1(:src='era?.logo.href', :alt='era?.name')/
            span {{ era?.name }}

        p.mt-2.ta-justify
            | {{ era?.description }}

        template(v-if='era?.titles')
            p.text-uppercase.border-bottom-1.pb-05.mt-2 Titles

            .d-flex.flex-column.center
                img.era-details-view__title-logo(v-for='title in era?.titles', :key='`era-title-${title.$id}`', :src='title.logo.href', :alt='title.name',
                :class='{ "cursor-pointer": isTitleClickable(title) }'
                @click='navigateToTitle(title.$id)')/
</template>

<style lang="sass" src="./styles.sass"></style>
