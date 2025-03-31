<script lang="ts" setup>
	import type { CharactersViewItemProperties } from './characters-view-item.types';

	defineProps<CharactersViewItemProperties>();
</script>

<template>
	<div
		:class="[
			'characters-view__item',
			'd-block',
			'p-relative',
			'radius-xs',
			'overflow-hidden',
			'cursor-pointer',
			{
				'characters-view__item--loading': isLoading,
			},
		]">
		<div class="characters-view__item-loading-veil d-block p-absolute z-1 top-0 left-0 w-100 h-100"></div>
		<template v-if="!isLoading && name && image">
			<img class="characters-view__item-picture" :src="image" :alt="name" />
			<span class="characters-view__item-name p-absolute left-0 bottom-0">{{ name }}</span>
		</template>
	</div>
</template>
