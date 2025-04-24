<script lang="ts" setup>
	import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { type ComputedRef, type Ref, computed, inject, nextTick, ref, watch } from 'vue';
	import { type RouteLocation, useRoute } from 'vue-router';
	import { provideTitlesUseCases } from '../../../../graph';
	import type { TitleDetails  } from '../../../../types';
	import type { TitlesUseCases } from '../../../../application';
	import type { Nullable } from '@swdbapp/types';
	import { dateToStr, getCurrentLocale, notAvailableString, numberToReadableTime } from '@swdbapp/utils-frontend';

	const currentRoute: RouteLocation = useRoute();
	const toggleLoading: () => void | undefined = inject('toggleLoading');
	const useCases: TitlesUseCases = provideTitlesUseCases();
	const title: Ref<Nullable<TitleDetails>> = ref(null);
	const content: Ref<Nullable<HTMLElement>> = ref(null);
	const openingCrawl: Ref<Nullable<HTMLElement>> = ref(null);
	const showPlot: Ref<boolean> = ref(false);
	const episodeTitle: Ref<Nullable<string>> = ref(null);
	const mainTitle: Ref<Nullable<string>> = ref(null);
	const isNotEmpty: Ref<boolean> = ref(false);

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

	const setOpeningCrawlMaxWidth = (): void => {
		if (openingCrawl.value instanceof HTMLElement) {
			const header: HTMLHeadingElement | null = openingCrawl.value.querySelector('h1');
			if (header) {
				const fixedPadding: number = Number(4 * 16);
				openingCrawl.value.style.width = `${Number(header.getBoundingClientRect().width + fixedPadding)}px`;
			}
		}
	};

	const enableScroll = (): void => {
		if (content.value instanceof HTMLElement) {
			setTimeout(() => {
				content.value.classList.add('overflow-y-auto');
			}, 1000);
		}
	};

	const fetchTitleDetails = async (id: string): Promise<void> => {
		toggleLoading();
		await useCases.detail({ id });
		title.value = useCases.titleDetail;
		await nextTick(async () => {
			episodeTitle.value = title.value?.title.replace(/(\w+):.+/, '$1') || '';
			mainTitle.value = title.value?.title.replace(/.+\:(.+)/, '$1').trim() || 'Unknown';
			isNotEmpty.value = Object.keys(title.value)
				.filter(key => !['title', 'logo', 'type', '$id'].includes(key))
				.some(key => !!title.value[key]);
			if (isNotEmpty.value) {
				await nextTick(() => {
					setOpeningCrawlMaxWidth();
					enableScroll();
				});
			}
			toggleLoading();
		});
	};

	const toggleShowPlow = () => (showPlot.value = !showPlot.value);

	watch(
		() => currentRoute.params.id,
		async id => await fetchTitleDetails(id as string),
		{ immediate: true }
	);
</script>

<template>
	<div class="title-details-view p-relative p-1 h-100 overflow-hidden d-flex flex-column">
		<div class="title-details-view__header mt-0 border-bottom-1 top-0 p-1 d-flex flex-column center">
			<span v-if="episodeTitle">{{ episodeTitle }}</span>
			<h1 class="color-primary">{{ mainTitle }}</h1>
		</div>
		<template v-if="isNotEmpty">
			<div class="px-1 grow" ref="content">
				<div v-if="title?.openingCrawl" class="title-details-view__opening-crawl-wrapper d-flex center">
					<div
						class="title-details-view__opening-crawl d-flex flex-column center px-2"
						ref="openingCrawl"
						v-html="title?.openingCrawl"></div>
				</div>
				<p class="mt-2 ta-justify">{{ notAvailableString(title?.resume) }}</p>
				<div class="d-flex title-details-view__info-wrapper mt-2">
					<div class="title-details-view__poster w-100" v-if="title?.poster">
						<img class="w-100" :src="title?.poster?.href" :alt="title?.title" />
					</div>
					<div class="title-details-view__info">
						<p class="text-uppercase border-bottom-1 pb-05 mt-2">Release Date</p>
						<p class="ta-right">
							{{ notAvailableString(dateToStr(title?.releaseDate, getCurrentLocale())) }}
						</p>
						<p class="text-uppercase border-bottom-1 pb-05 mt-2">Rating</p>
						<p class="ta-right">{{ notAvailableString(title?.rating) }}</p>
						<p class="text-uppercase border-bottom-1 pb-05 mt-2">Genre/s</p>
						<p class="ta-right">{{ notAvailableString(title?.genre?.join(', ')) }}</p>
						<p class="text-uppercase border-bottom-1 pb-05 mt-2">Duration</p>
						<p class="ta-right">{{ notAvailableString(numberToReadableTime(title?.duration)) }}</p>
						<p class="text-uppercase border-bottom-1 pb-05 mt-2">Director</p>
						<p class="ta-right">{{ notAvailableString(title?.director) }}</p>
						<p class="text-uppercase border-bottom-1 pb-05 mt-2">Music Composer</p>
						<p class="ta-right">{{ notAvailableString(title?.musicDirector) }}</p>
						<p class="text-uppercase border-bottom-1 pb-05 mt-2">Producers</p>
						<p class="ta-right">{{ notAvailableString(title?.producers?.join(', ')) }}</p>
						<p class="text-uppercase border-bottom-1 pb-05 mt-2">Actors</p>
						<p class="ta-right">{{ notAvailableString(title?.actors?.join(', ')) }}</p>
					</div>
				</div>
				<template v-if="title?.plot">
					<p class="text-uppercase border-bottom-1 pb-05 mt-2 d-flex cursor-pointer" @click="toggleShowPlow">
						<span class="grow">Plot</span>
						<font-awesome-icon
							class="color-foreground fs-1"
							:icon="showPlot ? faChevronUp : faChevronDown" />
					</p>
					<transition>
						<p class="ta-justify" v-show="showPlot" v-html="title?.plot"></p>
					</transition>
				</template>
				<p class="text-uppercase border-bottom-1 pb-05 mt-2">Links</p>
				<p class="ta-left">
					<a v-if="starWarsLink" :href="starWarsLink" target="_blank">{{ starWarsLink }}</a>
				</p>
			</div>
		</template>
		<template v-else>
			<p class="mt-2 center">No available info for this title, yet ...</p>
		</template>
	</div>
</template>

<style lang="sass" src="./styles.sass"></style>
