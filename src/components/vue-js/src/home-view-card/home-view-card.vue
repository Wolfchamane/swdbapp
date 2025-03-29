<script lang="ts" setup>
	import { RouterLink } from 'vue-router';
	import { provideAssetsDir } from '@swdbapp/core';
	import type { HomeViewCardProperties } from './home-view-card.types';

	defineProps<HomeViewCardProperties>();

	interface ImageURLInput {
		image: string;
	}

	const imageURL = ({ image }: ImageURLInput): string => `${provideAssetsDir()}/images/${image}.png`;
</script>

<template>
	<router-link
		:to="{ name: disabled ? $route.name : `${title.toLowerCase()}-view`, query }"
		:class="[
			'home-view__card card p-relative d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer',
			{ 'home-view__card--disabled': disabled },
		]">
		<div
			class="home-view__card--not-available p-absolute top-0 left-0 z-1 w-100 h-100 d-flex flex-column center"
			v-show="disabled">
			Not Available
		</div>
		<div class="home-view__card-picture-wrapper p-1 overflow-hidden">
			<img class="home-view__card-picture" :src="imageURL({ image })" :alt="title" />
		</div>
		<div class="home-view__card-title center py-05 border-top-1">{{ title }}</div>
	</router-link>
</template>
