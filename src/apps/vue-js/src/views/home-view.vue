<script lang="ts" setup>
	import { type Ref, ref } from 'vue';

	const assetsDir: Ref<string> = ref(import.meta.env.VITE_ASSETS_DIR);

	const imageURL = (name: string): string => `${assetsDir.value}/images/${name}.png`;
</script>

<template>
	<div class="home-view h-100 p-1 d-flex align-center justify-center flex-wrap overflow-hidden overflow-y-auto">
		<router-link :to="{ name: 'people-view' }">
			<div
				class="home-view__card card d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer">
				<div class="home-view__card-picture-wrapper p-1 overflow-hidden">
					<img class="home-view__card-picture" :src="imageURL('people')" alt="People" />
				</div>
				<div class="home-view__card-title center py-05 border-top-1">People</div>
			</div>
		</router-link>
		<div
			class="home-view__card card d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer">
			<div class="home-view__card-picture-wrapper p-1 overflow-hidden">
				<img class="home-view__card-picture" :src="imageURL('films')" alt="Films" />
			</div>
			<div class="home-view__card-title center py-05 border-top-1">Films</div>
		</div>
		<div
			class="home-view__card card d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer">
			<div class="home-view__card-picture-wrapper p-1 overflow-hidden">
				<img class="home-view__card-picture" :src="imageURL('planets')" alt="Planets" />
			</div>
			<div class="home-view__card-title center py-05 border-top-1">Planets</div>
		</div>
		<div
			class="home-view__card card d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer">
			<div class="home-view__card-picture-wrapper p-1 overflow-hidden">
				<img class="home-view__card-picture" :src="imageURL('species')" alt="Species" />
			</div>
			<div class="home-view__card-title center py-05 border-top-1">Species</div>
		</div>
		<div
			class="home-view__card card d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer">
			<div class="home-view__card-picture-wrapper p-1 overflow-hidden">
				<img class="home-view__card-picture" :src="imageURL('starships')" alt="Starships" />
			</div>
			<div class="home-view__card-title center py-05 border-top-1">Starships</div>
		</div>
		<div
			class="home-view__card card d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer">
			<div class="home-view__card-picture-wrapper p-1 overflow-hidden">
				<img class="home-view__card-picture" :src="imageURL('vehicles')" alt="Vehicles" />
			</div>
			<div class="home-view__card-title center py-05 border-top-1">Vehicles</div>
		</div>
	</div>
</template>
