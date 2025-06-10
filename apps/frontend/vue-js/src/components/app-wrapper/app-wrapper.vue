<script lang="ts" setup>
	import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { RouterView } from 'vue-router';
	import { useNavigation } from '@/utils/use-navigation';
	import { provideTogglers } from '@/utils/use-providers';
	// @ts-expect-error import
	import LICENSE from '../../../../../../LICENSE?raw';
	import { AppHeader } from '../app-header';
	import { AppMenu } from '../app-menu';
	import { LoadingBar } from '../loading-bar';

	const { isHomeView } = useNavigation();
	const { showLicense, showMenu, isLoading } = provideTogglers();
</script>

<template>
	<app-header />
	<loading-bar :is-visible="isLoading" />
	<main class="app-main grow h-100 overflow-hidden p-relative">
		<app-menu :open="isHomeView || showMenu" />
		<div class="h-100 overflow-y-auto">
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
