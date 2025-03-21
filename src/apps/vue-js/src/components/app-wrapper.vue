<script lang="ts" setup>
	import { capitalize } from '@amjs/js-utils';
	import { faCircleInfo, faCircleLeft, faCircleXmark, faGear } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { type ComputedRef, type Ref, computed, ref } from 'vue';
	import { RouterView, useRoute, useRouter } from 'vue-router';
	import LICENSE from '../../../../../LICENSE?raw';

	const ROUTER = useRouter();
	const currentRoute = useRoute();
	const showLicense: Ref<boolean> = ref(false);

	const isHomeView: ComputedRef<boolean> = computed(() => {
		return currentRoute.name === 'home-view';
	});

	const toggleLicense = () => (showLicense.value = !showLicense.value);

	const navigateBack = () => {
		ROUTER.back();
	};
</script>

<template>
	<header class="app-header d-flex align-center border-bottom-1 center color-primary py-1">
		<font-awesome-icon v-if="!isHomeView" :icon="faCircleLeft" @click="navigateBack" class="mx-1 cursor-pointer" />
		<template v-if="isHomeView">
			<div class="d-flex flex-column center grow">
				<span class="sw-ff color-primary m-0 my-1 fs-xl">Star Wars</span>
				<span class="sw-ff color-primary m-0 mb-05">Explorer</span>
			</div>
		</template>
		<template v-else>
			<div class="grow sw-ff">{{ capitalize(String(currentRoute.name).replace('-view', '')) }}</div>
		</template>
		<div class="d-flex align-center justify-space-between px-1">
			<font-awesome-icon :icon="faCircleInfo" class="mr-1 cursor-pointer" @click="toggleLicense" />
			<font-awesome-icon v-if="!isHomeView" :icon="faGear" class="disabled" />
		</div>
	</header>
	<main class="app-main grow overflow-y-auto">
		<router-view v-slot="{ Component }">
			<transition name="fade">
				<component :is="Component" />
			</transition>
		</router-view>
	</main>
	<transition name="fade" appear>
		<footer v-if="isHomeView" class="app-footer d-flex align-center justify-center p-1 border-top-1">
			&copy; 2025 - Arturo Martínez Díaz
		</footer>
	</transition>
	<transition name="slide">
		<div
			class="app-license p-absolute top-0 left-0 z-1 w-100 h-100 m-1 p-1 radius-m bg-color-background color-foreground overflow-hidden"
			v-show="showLicense">
			<font-awesome-icon
				:icon="faCircleXmark"
				@click="toggleLicense"
				class="p-absolute top-1 right-1 cursor-pointer"
				style="align-self: end" />
			<pre
				v-html="LICENSE"
				class="w-100 h-100 pt-3 pl-1 pr-1 pb-1 grow ta-justify overflow-hidden overflow-y-auto" />
		</div>
	</transition>
</template>
