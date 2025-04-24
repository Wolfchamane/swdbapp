<script lang="ts" setup>
	import type { TitleItemProperties } from './types';

	defineProps<TitleItemProperties>();
</script>

<template>
	<div class="list-item d-flex align-center border-1 radius-s my-1 cursor-pointer">
		<img class="title-item__logo w-2 h-2 mx-1" :src="title.logo" :alt="title.title" />
		<span class="title-item__name">{{ title.title }}</span>
	</div>
</template>
