<script lang="ts" setup>
	import { type Ref, inject, nextTick, ref, watch } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { PaginationControl } from '@swdbapp/frontend-vue-components';
	import type { Nullable } from '@swdbapp/types';
	import type { TitlesListAllUseCaseInput, TitlesUseCases } from '../../../../application';
	import { provideTitlesUseCases } from '../../../../graph';
	import type { Title } from '../../../../types';
	import { ListItem } from '@swdbapp/frontend-vue-components';

	const ROUTER = useRouter();
	const CURRENT_ROUTE = useRoute();
	const toggleLoading: () => void = inject('toggleLoading');
	const useCases: TitlesUseCases = provideTitlesUseCases();
	const titles: Ref<Title[]> = ref([]);
	const pagination: Ref<{ offset: number; limit: number; total: number }> = ref({});
	const currentPage: Ref<number> = ref(NaN);
	const totalPages: Ref<number> = ref(NaN);
	const titlesList: Ref<Nullable<HTMLElement>> = ref(null);

	const fetchTitles = async (input?: TitlesListAllUseCaseInput): Promise<void> => {
		toggleLoading();
		await useCases.listAll(input);
		await nextTick(() => {
			pagination.value = {
				...useCases.pagination,
			};
			window.requestAnimationFrame(() => {
				titlesList.value?.scroll({ top: 0, behavior: 'smooth' });
			});
		});
		titles.value = useCases.titles;
		toggleLoading();
	};

	const onPaginate = async (offset: number) => {
		const query: TitlesListAllUseCaseInput = {
			offset: Number(offset - 1),
			limit: useCases.pagination.limit,
		};

		await ROUTER.push({ ...CURRENT_ROUTE, query });
	};

	const navigateToTitleDetail = (id: number): void => {
		ROUTER.push({ name: 'title-details-view', params: { id } });
	};

	watch(
		() => pagination.value.offset,
		(offset: number) => {
			currentPage.value = offset ? Number(Math.trunc(Number(offset / pagination.value.limit)) + 1) : 1;
		}
	);

	watch(
		() => pagination.value.total,
		(total: number) => {
			totalPages.value = Number(Math.trunc(total / pagination.value.limit) + 1);
		}
	);

	watch(
		() => CURRENT_ROUTE.query,
		async query => {
			await fetchTitles(query);
		},
		{ immediate: true }
	);
</script>

<template>
	<div class="titles-list-view p-1 pr-0 d-flex flex-column h-100 overflow-hidden">
		<div class="grow pr-1 overflow-y-auto" ref="titlesList">
			<list-item
				v-for="title in titles"
				:key="`title-${title.$id}`"
				:image="title.logo.href"
				:label="title.title"
				@click="navigateToTitleDetail(title.$id)" />
		</div>
		<div class="d-flex center p-sticky bottom-0 pr-1">
			<pagination-control :current-page="currentPage" :total-pages="totalPages" :min="1" @paginate="onPaginate" />
		</div>
	</div>
</template>
