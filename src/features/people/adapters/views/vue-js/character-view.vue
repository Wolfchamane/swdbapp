<script lang="ts" setup>
	import { type ComputedRef, type Ref, computed, inject, onMounted, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import { strIsNA, strIsUnknown, cmToFeet, strIsNone } from '@swdbapp/utils';
	import { LoadingBar } from '@swdbapp/vuejs-components';
	import { type Character } from '../../../application';
	import { providePeopleUseCases } from '../../../graph';

	const currentRoute = useRoute();
	const useCases = providePeopleUseCases();
	const isLoading: Ref<boolean> = ref(false);
	const character: Ref<Character | null> = ref(null);
	const measureSystem: Ref<string> = ref('metric');
	const ASSETS_DIR: string = inject('ASSETS_DIR');
    const root: Ref<HTMLDivElement | null> = ref(null);

	const characterHeight: ComputedRef<string> = computed(() => {
		return measureSystem.value === 'metric'
			? `${character.value?.height} cm`
			: `${cmToFeet(character.value?.height)} ft`;
	});

	const characterFilmPoster = (title: string): string => {
		return `${ASSETS_DIR}/images/films/${title.replace(/\s+/g, '-').trim().toLowerCase()}.png`;
	};

    const characterPicture = (name: string): string => {
        return `${ASSETS_DIR}/images/characters/${name.replace(/\s+/g, '-').trim().toLowerCase()}.png`;
    };

	onMounted(async () => {
		isLoading.value = true;
		const id: string = currentRoute.params.id as string;
		character.value = await useCases.describe({ id });
        if (root.value instanceof HTMLDivElement) {
            const backgroundNode: HTMLDivElement | null = root.value.querySelector('.character-view__background');
            if (backgroundNode instanceof HTMLDivElement) {
                backgroundNode.style.backgroundImage = `url(${characterPicture(character.value?.name)})`;
            }
        }
		setTimeout(() => isLoading.value = false, 10000);
	});
</script>

<template>
	<div ref="root" class="character-view p-relative w-100 h-100">
        <div class='character-view__background w-100 h-100'></div>
            <div class='character-view__content p-absolute z-1 top-0 left-0 w-100 h-100'>
            <loading-bar :is-visible="isLoading" />
            <div class="mt-1 px-1">
                <label for="metric">
                    <input type="radio" name="measureSystem" id="metric" v-model="measureSystem" checked />
                    <span>Metric</span>
                </label>
                <label for="imperial">
                    <input type="radio" name="measureSystem" id="imperial" v-model="measureSystem" />
                    <span>Imperial</span>
                </label>
            </div>

            <div class='character-view__info'>
                <h1 class='center'>{{ character?.name }}</h1>
                <dl :class="['p-relative my-1', 'px-1', 'character-view__details', { 'character-view__details--loading' : isLoading }]">
                    <dt>Birth Year</dt>
                    <dd>{{ character?.birthYear }}</dd>
                    <dt>Gender</dt>
                    <dd>
                        {{
                            strIsUnknown(character?.gender)
                                ? 'Unknown'
                                : strIsNA(character?.gender)
                                    ? 'Not Available'
                                    : character?.gender
                        }}
                    </dd>
                    <dt>Height</dt>
                    <dd>{{ characterHeight }}</dd>
                    <dt>Mass</dt>
                    <dd>{{ character?.mass }} Kg</dd>
                    <dt>Eye color</dt>
                    <dd>{{ character?.eyeColor }}</dd>
                    <dt>Hair color</dt>
                    <dd>{{ strIsNone(character?.hairColor) ? '' : character?.hairColor }}</dd>
                    <dt>Skin color</dt>
                    <dd>{{ character?.skinColor }}</dd>
                    <dt>Home world</dt>
                    <dd>{{ character?.homeWorld?.name }}</dd>
                </dl>
            </div>

            <div class="my-1 px-1">
                <h2 class='center'>Movies</h2>
                <div class="carrousel">
                    <div v-for="film in character?.films" :key="`film-${film.$id}`" class="carrousel-item film-poster">
                        <img :src="characterFilmPoster(film.title)" :alt="film.title" />
                        <div class="d-flex flex-column center py-05">
                            <span class='film-poster__title'>{{ film.title }}</span>
                            <span class='fs-s mt-05'>({{ film.releaseDate.getFullYear() }})</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>
