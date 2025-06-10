<script setup lang="ts">
	import { faBars, faCircleInfo, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { useNavigation } from '@/utils/use-navigation';
	import { injectTogglers } from '@/utils/use-providers';

	const { isHomeView, title, navigateBack } = useNavigation();
	const { toggleLicense, toggleMenu } = injectTogglers();
</script>

<template>
	<header class="app-header d-flex align-center border-bottom-1 center color-primary py-1">
		<font-awesome-icon
			:class="['mx-1', 'cursor-pointer', { disabled: isHomeView }]"
			:icon="faBars"
			@click="toggleMenu" />
		<font-awesome-icon v-show="!isHomeView" :icon="faCircleLeft" @click="navigateBack" />
		<div class="d-flex flex-column center grow">
			<span class="sw-ff color-primary m-0 my-1 fs-xl">Star Wars</span>
			<span class="sw-ff color-primary m-0 mb-05" v-if="isHomeView">Explorer</span>
			<span class="sw-ff m-0 mb-05 color-primary" v-else>{{ title }}</span>
		</div>
		<font-awesome-icon class="mx-1 cursor-pointer" :icon="faCircleInfo" @click="toggleLicense" />
	</header>
</template>
