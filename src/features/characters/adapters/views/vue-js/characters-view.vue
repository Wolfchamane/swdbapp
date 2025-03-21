<script lang="ts" setup>
	import { type Ref, onMounted, ref } from 'vue';
	import { LoadingBar, PaginationControl } from '@swdbapp/vuejs-components';
	import { provideCharactersUseCases } from '../../../graph';
	import type { Character } from '../../../types';

	const useCases = provideCharactersUseCases();
	const characters: Ref<Character[]> = ref([]);
	const isLoading: Ref<boolean> = ref(false);
	const page: Ref<number> = ref(1);
	const currentPage: Ref<number> = ref(1);
	const totalPages: Ref<number> = ref(1);

	const fetchCharacters = async (): Promise<void> => {
		isLoading.value = true;
		try {
			characters.value = new Array(10);
			const list = await useCases.list({
				page: page.value,
			});
			totalPages.value = Math.ceil(Number(list.total / list.limit));
			currentPage.value = list.page;
			characters.value = list.items;
		} catch (e) {
			console.log(e);
		} finally {
			setTimeout(() => (isLoading.value = false), 400);
		}
	};

	const onPaginate = async (nextPage: number): Promise<void> => {
		page.value = nextPage;
		await fetchCharacters();
	};

	onMounted(async () => {
		await fetchCharacters();
	});
</script>

<template>
	<div class="characters-view__wrapper">
		<loading-bar :is-visible="isLoading" />
		<pagination-control :current-page="currentPage" :total-pages="totalPages" :min="1" @paginate="onPaginate" />
		<div class="characters-view d-flex flex-wrap justify-center w-100 h-100 p-1 overflow-hidden overflow-y-auto">
			<div
				v-for="(character, index) in characters"
				:key="`character-${(character && character.$id) || index}`"
				:class="[
					'characters-view__item',
					'd-block',
					'p-relative',
					'radius-xs',
					'overflow-hidden',
					{
						'characters-view__item--loading': isLoading,
					},
				]">
				<div class="characters-view__item-loading-veil d-block p-absolute z-1 top-0 left-0 w-100 h-100"></div>
				<template v-if="!isLoading && character">
					<img class="characters-view__item-picture" :src="character.image.href" :alt="character.name" />
					<span class="characters-view__item-name p-absolute left-0 bottom-0">{{ character.name }}</span>
				</template>
			</div>
		</div>
	</div>
</template>
