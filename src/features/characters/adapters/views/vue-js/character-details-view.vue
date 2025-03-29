<script lang="ts" setup>
	import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { type Ref, ref, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import type { Nullable } from '@swdbapp/types';
	import { LoadingBar } from '@swdbapp/vuejs-components';
	import { provideCharactersUseCases } from '../../../graph';
	import type { Character, CharacterDetails } from '../../../types';

	const useCases = provideCharactersUseCases();
	const ROUTE = useRoute();
	const character: Ref<Nullable<Character>> = ref(null);
	const characterDetails: Ref<Nullable<CharacterDetails>> = ref(null);
	const expandDetails: Ref<boolean> = ref(false);
	const isLoading: Ref<boolean> = ref(false);

	const fetchCharacterInfo = async (id: string): Promise<void> => {
		isLoading.value = true;
		const characterDetails: Character | Error = await useCases.info({ id });
		if (characterDetails instanceof Error) {
			// @todo
		} else {
			character.value = characterDetails;
		}
		isLoading.value = false;
	};

	const fetchCharacterDetails = async (): Promise<void> => {
		await useCases.detail(character.value);
	};

	const toggleExpandDetails = async () => {
		if (!expandDetails.value && !characterDetails.value) {
			isLoading.value = true;
			await fetchCharacterDetails();
			isLoading.value = false;
		}

		expandDetails.value = !expandDetails.value;
	};

	watch(
		() => ROUTE.params.id,
		async (id: string | string[]) => {
			await fetchCharacterInfo(id as string);
		},
		{ immediate: true }
	);
</script>

<template>
	<section class="character-details-view d-flex flex-column w-100 h-100">
		<div class="character-view__controls pb-1">
			<loading-bar :is-visible="isLoading" />
		</div>
		<div class="character-details__content px-1">
			<header class="character-details__header">
				<img class="character-details__picture radius-s" :src="character?.image.href" :alt="character?.name" />
				<h1 class="center color-primary">{{ character?.name }}</h1>
			</header>
			<article>
				<p class="ta-justify">{{ character?.description }}</p>
			</article>
			<article class="character-details__details">
				<header
					@click="toggleExpandDetails"
					class="d-flex align-center cursor-pointer border-bottom-1 character-details__details-header mb-1">
					<p class="grow">Details</p>
					<font-awesome-icon :icon="expandDetails ? faChevronUp : faChevronDown" />
				</header>
				<transition>
					<div class="character-details__details-content" v-show="expandDetails">
						<span>Films</span>
						<div class="carrousel">
							<div
								class="carrousel-item film-poster p-relative"
								v-for="film in character?.details?.films"
								:key="`film-${film.episodeNumber}`">
								<img :src="`./images/films/${film.image}.jpeg`" :alt="film.title" />
								<div
									class="film-poster__info p-absolute z-1 bottom-0 left-0 d-flex flex-column center w-100">
									<span>Episode {{ film.episodeNumber }}</span>
									<span>{{ film.title }}</span>
									<span>{{ film.releaseDate.getFullYear() }}</span>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</article>
		</div>
	</section>
</template>
