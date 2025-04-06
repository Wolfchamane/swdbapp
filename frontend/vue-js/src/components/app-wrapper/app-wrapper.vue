<script lang="ts" setup>
	import { capitalize } from '@amjs/js-utils';
	import { faCircleInfo, faCircleLeft, faCircleXmark, faGear } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { type ComputedRef, type Ref, computed, ref, provide } from 'vue';
	import { RouterView, useRoute, useRouter } from 'vue-router';
	import LICENSE from '../../../../../LICENSE?raw';
	import { AppMenu } from '../app-menu';
    import { LoadingBar } from '../loading-bar';

	const ROUTER = useRouter();
	const currentRoute = useRoute();
	const showLicense: Ref<boolean> = ref(false);
    const isLoading: Ref<boolean> = ref(false);

	const isHomeView: ComputedRef<boolean> = computed(() => {
		return currentRoute.name === 'home-view';
	});

	const title: ComputedRef<string> = computed(() => {
		return capitalize(String(currentRoute.name).replace('-view', '')).replace(/-/g, ' ');
	});

	const toggleLicense = () => (showLicense.value = !showLicense.value);

	const navigateBack = () => {
		ROUTER.back();
	};

    const toggleLoading = () => (isLoading.value = !isLoading.value);

    provide('toggleLoading', toggleLoading);
</script>

<template lang="pug">
    header.app-header.d-flex.align-center.border-bottom-1.center.color-primary.py-1
        font-awesome-icon.mx-1.cursor-pointer(v-if='!isHomeView', :icon='faCircleLeft', @click='navigateBack')
        .d-flex.flex-column.center.grow
            span.sw-ff.color-primary.m-0.my-1.fs-xl Star Wars
            span.sw-ff.color-primary.m-0.mb-05(v-if="isHomeView") Explorer
            span.sw-ff.m-0.mb-05.color-primary(v-else) {{ title }}
        .d-flex.align-center.jusitify-space-between.px-1
            font-awesome-icon.mr-1.cursor-pointer(:icon='faCircleInfo', @click='toggleLicense')/
            font-awesome-icon.disabled(v-if='!isHomeView', :icon='faGear')

    loading-bar(:is-visible='isLoading')/
    main.app-main.grow.d-flex.h-100.overflow-hidden
        app-menu/

        .p-1.grow.overflow-y-auto
            router-view(v-slot='{ Component }')
                transition(name='fade')
                    component(:is='Component')

    transition(name='fade', appear)
        footer.app-footer.d-flex.center.p-1.border-top-1(v-if='isHomeView')
            | &copy; 2025 - Arturo Martínez Díaz

    transition(name='fade', appear)
        .app-license.p-absolute.top-0.left-0.z-1.w-100.h-100.m-1.p-1.radius-m.bg-color-background.color-foreground.overflow-hidden(v-show='showLicense')
            font-awesome-icon.p-absolute.top-1.right-1.cursor-pointer(:icon='faCircleXmark', @click='toggleLicense', style='align-self: end')
            pre.w-100.h-100.pt-3.pl-1.pr-1.pb-1.grow.ta-justify.overflow-hidden.overflow-y-auto(v-html='LICENSE')
</template>
