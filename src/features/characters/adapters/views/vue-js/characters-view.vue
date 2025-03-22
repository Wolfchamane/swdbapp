<script lang="ts" setup>
	import { type Ref, onMounted, ref, watch } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { LoadingBar, PaginationControl } from '@swdbapp/vuejs-components';
	import { provideCharactersUseCases } from '../../../graph';
	import type { Character } from '../../../types';
	import { CharactersViewItem } from './characters-view-item';

	const ROUTER = useRouter();
	const currentRoute = useRoute();
	const useCases = provideCharactersUseCases();
	const characters: Ref<Character[]> = ref([]);
	const isLoading: Ref<boolean> = ref(false);
	const currentPage: Ref<number> = ref(NaN);
	const totalPages: Ref<number> = ref(1);

	const fetchCharacters = async (): Promise<void> => {
		isLoading.value = true;
		try {
			characters.value = new Array(10);
			const list = await useCases.list({
				page: currentPage.value,
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

	const onPaginate = async (page: number): Promise<void> => {
		await ROUTER.replace({ path: '/characters', query: { page } });
	};

	const setCurrentPageValue = (value: string | number | string[] | number[] | undefined): void => {
		currentPage.value = Number(value);
		if (isNaN(currentPage.value)) {
			currentPage.value = 1;
		}
	};

	watch(
		() => currentRoute.query?.page,
		async newPage => {
			setCurrentPageValue(newPage);
			await fetchCharacters();
		}
	);

	onMounted(async () => {
		setCurrentPageValue(currentRoute.query?.page);
		await fetchCharacters();
	});
</script>

<template>
	<div class="characters-view__wrapper d-flex flex-column w-100 h-100">
		<div class="characters-view__controls pb-1">
			<loading-bar :is-visible="isLoading" />
			<pagination-control :current-page="currentPage" :total-pages="totalPages" :min="1" @paginate="onPaginate" />
		</div>
		<div
			class="characters-view grow d-flex flex-wrap justify-center w-100 h-100 p-1 overflow-hidden overflow-y-auto">
			<characters-view-item
				v-for="(character, index) in characters"
				:key="`character-${(character && character.$id) || index}`"
				:is-loading="isLoading"
				:image="character?.image.href || ''"
				:name="character?.name || ''" />
		</div>
	</div>
</template>
