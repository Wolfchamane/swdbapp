<script lang="ts" setup>
	import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { type ComputedRef, type Ref, computed, inject, onMounted, ref, watch } from 'vue';
	import { type RouteLocation, useRoute } from 'vue-router';
	import { type TitleDetails, type TitlesUseCases, provideTitlesUseCases } from '@swdbapp/titles-feature';
	import type { Nullable } from '@swdbapp/types';

	const currentRoute: RouteLocation = useRoute();
	const toggleLoading: () => void | undefined = inject('toggleLoading');
	const useCases: TitlesUseCases = provideTitlesUseCases();
	const title: Ref<Nullable<TitleDetails>> = ref(null);
	const content: Ref<Nullable<HTMLElement>> = ref(null);
	const showPlot: Ref<boolean> = ref(false);

	const readableDuration: ComputedRef<string> = computed(() => {
		const { duration } = title.value || {};
		if (duration) {
			const HOUR: number = Number(60 * 60 * 1000);
			const MIN: number = Number(60 * 1000);

			const durationHours: number = Number(duration / HOUR);
			const readHours: number = Math.trunc(durationHours);
			const durationMinutes: number = duration - Number(readHours * HOUR);
			const readMinutes: number = Number(durationMinutes / MIN);

			return `${readHours}h ${readMinutes}min`;
		} else {
			return 'N/A';
		}
	});

	const starWarsLink: ComputedRef<Nullable<string>> = computed(() => {
		const { type } = title.value || {};
		const name = title.value?.title || '';
		if (name && type) {
			return `https://starwars.com/${type}/${name
				.replace(/\s/g, '-')
				.replace(/[^a-zA-Z0-9-]/g, '')
				.toLowerCase()}`;
		}

		return null;
	});

	const episode: ComputedRef<string> = computed(() => {
		return title.value?.title.replace(/^(.+):.+$/, '$1').replace(':', '');
	});

	const mainTitle: ComputedRef<string> = computed(() => {
		return title.value?.title.replace(/^.+:(.+)$/, '$1');
	});

	const fetchTitleDetails = async (id: string): Promise<void> => {
		toggleLoading();
		await useCases.detail({ id });
		title.value = useCases.titleDetail;
		toggleLoading();
	};

	const toggleShowPlow = () => (showPlot.value = !showPlot.value);

	watch(
		() => currentRoute.params.id,
		async id => await fetchTitleDetails(id as string),
		{ immediate: true }
	);

	onMounted(() => {
		if (content.value instanceof HTMLElement) {
			setTimeout(() => {
				content.value.classList.add('overflow-y-auto');
			}, 0);
		}
	});
</script>

<template lang="pug">
    .title-details-view.p-relative.p-1.h-100.overflow-hidden.d-flex.flex-column
        .title-details-view__header.mt-0.border-bottom-1.top-0.p-1.d-flex.flex-column.center
            span(v-if='episode') {{ episode }}
            h1.color-primary {{ mainTitle }}

        .px-1.grow(ref='content')
            .title-details-view__opening-crawl-wrapper
               .title-details-view__opening-crawl.d-flex.flex-column.center.px-2(v-html='title?.openingCrawl')

            .w-100
                img.w-100(:src='title?.poster', :alt='title?.title')/

            p.mt-2.ta-justify
                | {{ title?.resume }}

            p.text-uppercase.border-bottom-1.pb-05.mt-2 Release Date
            p.ta-right {{ title?.releaseDate.toLocaleDateString() }}

            p.text-uppercase.border-bottom-1.pb-05.mt-2 Rating
            p.ta-right {{ title?.rating }}

            p.text-uppercase.border-bottom-1.pb-05.mt-2 Genre/s
            p.ta-right {{ title?.genre.join(', ') }}

            p.text-uppercase.border-bottom-1.pb-05.mt-2 Duration
            p.ta-right {{ readableDuration }}

            p.text-uppercase.border-bottom-1.pb-05.mt-2 Director
            p.ta-right {{ title?.director }}

            p.text-uppercase.border-bottom-1.pb-05.mt-2 Music Composser
            p.ta-right {{ title?.musicDirector }}

            p.text-uppercase.border-bottom-1.pb-05.mt-2 Producers
            p.ta-right {{ title?.producers.join(', ') }}

            p.text-uppercase.border-bottom-1.pb-05.mt-2 Actors
            p.ta-right {{ title?.actors.join(', ') }}

            p.text-uppercase.border-bottom-1.pb-05.mt-2.d-flex.cursor-pointer(@click='toggleShowPlow')
                .grow Plot
                font-awesome-icon.color-foreground.fs-1(:icon="showPlot ? faChevronUp : faChevronDown")
            transition
                p.ta-justify(v-show='showPlot', v-html='title?.plot')

            p.text-uppercase.border-bottom-1.pb-05.mt-2 Links
            p.ta-left
                a(v-if='starWarsLink', :href='starWarsLink', target='_blank') {{ starWarsLink }}
</template>

<style lang="sass" src="./styles.sass"></style>
