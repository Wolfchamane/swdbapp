<script lang="ts" setup>
	import { type Ref, inject, nextTick, onMounted, ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { type Era, type ErasUseCases, provideErasUseCases } from '@swdbapp/eras-feature';
	import { EraItem } from '@/components';

	const ROUTER = useRouter();
	const useCases: ErasUseCases = provideErasUseCases();
	const toggleLoading: () => void = inject('toggleLoading');
	const eras: Ref<Era[]> = ref([]);

	const fetchEras = async (): Promise<void> => {
		toggleLoading();
		eras.value = [];
		await nextTick(async () => {
			await useCases.listAll();
			eras.value = useCases.eras;
			toggleLoading();
		});
	};

	const navigateTo = (era: Era) => {
		ROUTER.push({ name: 'era-details-view', params: { id: `${era.$id}` } });
	};

	onMounted(async () => await fetchEras());
</script>

<template>
	<div class="eras-view p-1">
		<era-item v-for="era in eras" :key="`era-${era.$id}`" :era="era" @click="navigateTo(era)" />
	</div>
</template>
