<script lang="ts" setup>
	import { capitalize } from '@amjs/js-utils';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { type Ref, ref } from 'vue';
	import type { AppMenuItemProperties } from './types';

	const props = defineProps<AppMenuItemProperties>();
	const parsedTitle: Ref<string> = ref(capitalize(props.title.replace('-view', '')));
</script>

<template>
	<div
		class="app-menu-item p-relative d-flex flex-column overflow-hidden my-1 border-1 radius-s shadow cursor-pointer"
		:class="{ 'app-menu-item--disabled': disabled, 'app-menu-item--active': active }">
		<div
			class="app-menu-item--not-available p-absolute top-0 left-0 z-1 w-100 h-100 d-flex flex-column center"
			v-if="disabled">
			Not Available
		</div>
		<font-awesome-icon class="app-menu-item__icon mx-1" :icon="icon" />
		<div class="app-menu-item__title center py-05 border-top-1">{{ parsedTitle }}</div>
	</div>
</template>

<style lang="sass" src="./styles.sass"></style>
