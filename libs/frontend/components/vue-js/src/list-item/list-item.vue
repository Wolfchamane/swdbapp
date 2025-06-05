<script lang="ts" setup>
	import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import type { ListItemProperties } from './list-item.types';

	defineProps<ListItemProperties>();
</script>

<template>
	<div class="list-item d-flex align-center border-1 radius-s my-1 cursor-pointer">
		<img class="era-item__image w-2 h-2 mb-05 mx-1" :src="image" :alt="label" />
		<span class="era-item__name grow">{{ label }}</span>
		<font-awesome-icon class="list-item__icon mx-1" :icon="faCircleRight" />
	</div>
</template>
