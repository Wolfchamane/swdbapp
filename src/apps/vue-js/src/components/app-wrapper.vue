<script lang="ts" setup>
	import { type Ref, onMounted, ref } from 'vue';
	import { providePeopleUseCases } from '@swdbapp/feature-people';

	const useCases = providePeopleUseCases();
	const response: Ref<string> = ref('');

	onMounted(async () => {
		response.value = JSON.stringify(await useCases.list(), null, 2);
	});
</script>

<template>
	<header class="app-header"></header>
	<main class="app-main">
		<h1>It works!</h1>
		<p>{{ response }}</p>
	</main>
	<footer class="app-footer"></footer>
</template>
