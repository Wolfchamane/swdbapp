<script lang="ts" setup>
	import { HomeViewCard } from '@swdbapp/vuejs-components';
</script>

<template>
	<div class="home-view h-100 p-1 d-flex align-center justify-center flex-wrap overflow-hidden overflow-y-auto">
		<home-view-card title="Characters" image="people" :query="{ page: 1 }" />
		<home-view-card title="Films" image="films" disabled />
		<home-view-card title="Planets" image="planets" disabled />
		<home-view-card title="Species" image="species" disabled />
		<home-view-card title="Starships" image="starships" disabled />
		<home-view-card title="Vehicles" image="vehicles" disabled />
	</div>
</template>
