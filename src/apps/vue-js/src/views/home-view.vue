<script lang="ts" setup>
	import { type Ref, ref } from 'vue';
	import { HomeViewCard } from '@swdbapp/vuejs-components';

	const assetsDir: Ref<string> = ref(import.meta.env.VITE_ASSETS_DIR);
</script>

<template>
	<div class="home-view h-100 p-1 d-flex align-center justify-center flex-wrap overflow-hidden overflow-y-auto">
		<home-view-card title="People" image="people" :assets-dir="assetsDir" />
		<home-view-card title="Films" image="films" :assets-dir="assetsDir" disabled />
		<home-view-card title="Planets" image="planets" :assets-dir="assetsDir" disabled />
		<home-view-card title="Species" image="species" :assets-dir="assetsDir" disabled />
		<home-view-card title="Starships" image="starships" :assets-dir="assetsDir" disabled />
		<home-view-card title="Vehicles" image="vehicles" :assets-dir="assetsDir" disabled />
	</div>
</template>
