<script lang="ts" setup>
	import { type Ref, onMounted, ref } from 'vue';
	import { LoadingBar, PaginationControl } from '@swdbapp/vuejs-components';
	import type { ListPeopleUseCaseInput, PeopleListItem } from '../../../application';
	import { providePeopleUseCases } from '../../../graph';
	import { PeopleListItem as PItem } from './components';

	const useCases = providePeopleUseCases();
	const isLoading: Ref<boolean> = ref(false);
	const peopleList: Ref<PeopleListItem[]> = ref([]);
	const page: Ref<number> = ref(1);
	const search: Ref<string> = ref('');
	const totalPages: Ref<number> = ref(0);

	const LIMIT: number = 10;

	const fetchPeople = async (): Promise<void> => {
		isLoading.value = true;
		const useCaseListInput: ListPeopleUseCaseInput = {
			page: page.value,
		};
		if (search.value) {
			useCaseListInput.search = search.value;
		}

		peopleList.value = await useCases.list(useCaseListInput);
		isLoading.value = false;
	};

	const onPaginate = async (nextPage: number): Promise<void> => {
		page.value = nextPage;
		await fetchPeople();
	};

	onMounted(async () => {
		await fetchPeople();
		totalPages.value = Math.ceil(Number(useCases.count / LIMIT));
	});
</script>

<template>
	<div class="d-flex flex-column h-100 overflow-hidden">
		<loading-bar :is-visible="isLoading" />
		<pagination-control
			:min="1"
			:current-page="page"
			:total-pages="totalPages"
			:disabled="isLoading"
			@paginate="onPaginate" />
		<div class="grow p-1 overflow-y-auto">
			<p-item
				v-for="people in peopleList"
				:key="`people-${people.$id}`"
				:name="people.name"
				:id="people.$id"
				:alignment="people.alignment" />
		</div>
	</div>
</template>
