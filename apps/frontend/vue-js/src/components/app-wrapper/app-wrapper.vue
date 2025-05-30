<script lang="ts" setup>
	import { capitalize } from '@amjs/js-utils';
	import { faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { type ComputedRef, type Ref, computed, provide, ref } from 'vue';
	import { RouterView, useRoute } from 'vue-router';
	import { AppHeader, AppMenu, type MenuItem } from '@swdbapp/frontend-lib-components';
	import routes from '@/router/routes';
	// @ts-expect-error import
	import LICENSE from '../../../../../../LICENSE?raw';
	import { LoadingBar } from '../loading-bar';

	const currentRoute = useRoute();
	const showLicense: Ref<boolean> = ref(false);
	const isLoading: Ref<boolean> = ref(false);

	const isHomeView: ComputedRef<boolean> = computed(() => {
		return currentRoute.name === 'home-view';
	});

	const title: ComputedRef<string> = computed(() => {
		const viewName: string = String(currentRoute.name).replace('-view', '');
		return /home/gi.test(viewName) ? 'DB Explorer' : capitalize(viewName).replace(/-/g, ' ');
	});

	const menuItems: ComputedRef<MenuItem[]> = computed(() => {
		return routes.map(({ name, path }) => ({
			to: path,
			label: name,
		}));
	});

	const toggleLicense = () => (showLicense.value = !showLicense.value);

	const toggleLoading = () => (isLoading.value = !isLoading.value);

	provide('toggleLoading', toggleLoading);
</script>

<template>
	<app-header :location="title">
		<font-awesome-icon :icon="faBars" />
	</app-header>
	<app-menu :items="menuItems"></app-menu>
	<loading-bar :is-visible="isLoading" />
	<main class="app-main grow d-flex h-100 overflow-hidden">
		<!--app-menu /-->
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
