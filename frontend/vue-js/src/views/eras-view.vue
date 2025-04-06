<script lang="ts" setup>
    import { provideErasUseCases, type Era, type ErasUseCases } from '@swdbapp/eras-feature';
    import { inject, onMounted, type Ref, ref, nextTick } from 'vue';
    import { EraItem } from '@/components';
    import { useRouter } from 'vue-router';

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
        ROUTER.push({ name: 'era-details-view', params: { id: `${era.$id}` }});
    };

    onMounted(async () => await fetchEras());
</script>

<template lang="pug">
    .eras-view
        era-item(v-for='era in eras', :key='`era-${era.$id}`', :era='era', @click='navigateTo(era)')/
</template>
