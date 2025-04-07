<script lang="ts" setup>
	import { type Ref, inject, ref, watch } from 'vue';
	import { type RouteLocation, useRoute } from 'vue-router';
	import { type EraDetails, type ErasUseCases, provideErasUseCases } from '@swdbapp/eras-feature';
	import type { Nullable } from '@swdbapp/types';

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

	watch(
		() => currentRoute.params.id,
		eraId => fetchEraDetails(eraId as string),
		{ immediate: true }
	);
</script>

<template lang="pug">
    .era-details-view.p-relative
        h1.era-details-view__header.d-flex.align-center.border-bottom-1.p-sticky.mt-0.bg-color-foreground
            img.w-2.h-2.mb-05.mr-1(:src='era?.logo.href', :alt='era?.name')/
            span {{ era?.name }}

        p.mt-2.ta-justify
            | {{ era?.description }}

        template(v-if='era?.titles')
            p.text-uppercase.border-bottom-1.pb-05.mt-2 Titles

            .d-flex.flex-column.center
                img(v-for='title in era?.titles', :key='`era-title-${title.$id}`', :src='title.logo.href', :alt='title.name')/
</template>

<style lang="sass" src="./styles.sass"></style>
