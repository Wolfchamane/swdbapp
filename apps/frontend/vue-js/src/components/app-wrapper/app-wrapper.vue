<script lang="ts" setup>
	import { capitalize } from '@amjs/js-utils';
	import { faCircleInfo, faCircleLeft, faCircleXmark, faGear, faHome } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { type ComputedRef, type Ref, computed, provide, ref } from 'vue';
	import { RouterView, useRoute, useRouter } from 'vue-router';
	// @ts-expect-error import
	import LICENSE from '../../../../../../LICENSE?raw';
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

	const navigateHome = () => {
		ROUTER.replace({ path: '/' });
	};

	const toggleLoading = () => (isLoading.value = !isLoading.value);

	provide('toggleLoading', toggleLoading);
</script>

<template>
	<header class="app-header d-flex align-center border-bottom-1 center color-primary py-1">
		<font-awesome-icon class="ml-1 cursor-pointer" v-if="!isHomeView" :icon="faHome" @click="navigateHome" />
		<font-awesome-icon class="mx-1 cursor-pointer" v-if="!isHomeView" :icon="faCircleLeft" @click="navigateBack" />
		<div class="d-flex flex-column center grow">
			<span class="sw-ff color-primary m-0 my-1 fs-xl">Star Wars</span>
			<span class="sw-ff color-primary m-0 mb-05" v-if="isHomeView">Explorer</span>
			<span class="sw-ff m-0 mb-05 color-primary" v-else>{{ title }}</span>
		</div>
		<div class="d-flex align-center jusitify-space-between px-1">
			<font-awesome-icon class="mr-1 cursor-pointer" :icon="faCircleInfo" @click="toggleLicense" />
			<font-awesome-icon class="disabled" v-if="!isHomeView" :icon="faGear" />
		</div>
	</header>
	<loading-bar :is-visible="isLoading" />
	<main class="app-main grow d-flex h-100 overflow-hidden">
		<app-menu />
		<div class="grow overflow-y-auto">
			<router-view v-slot="{ Component }">
				<transition name="fade">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</main>
	<transition name="fade" appear>
		<footer class="app-footer d-flex center p-1 border-top-1" v-if="isHomeView">
			&copy; 2025 - Arturo Martínez Díaz
		</footer>
	</transition>
	<transition name="fade" appear>
		<div
			class="app-license p-absolute top-0 left-0 z-1 w-100 h-100 m-1 p-1 radius-m bg-color-background color-foreground overflow-hidden border-1 border-primary"
			v-show="showLicense">
			<font-awesome-icon
				class="p-absolute top-1 right-1 cursor-pointer"
				:icon="faCircleXmark"
				@click="toggleLicense"
				style="align-self: end" />
			<pre
				class="w-100 h-100 pt-3 pl-1 pr-1 pb-1 grow ta-justify overflow-hidden overflow-y-auto"
				v-html="LICENSE"></pre>
		</div>
	</transition>
</template>
