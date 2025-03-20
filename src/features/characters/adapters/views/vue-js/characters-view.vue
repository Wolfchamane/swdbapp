<script lang="ts" setup>
	import { type Ref, onMounted, ref } from 'vue';
	import { provideCharactersUseCases } from '../../../graph';
	import type { Character } from '../../../types';

	const useCases = provideCharactersUseCases();
	const characters: Ref<Character[]> = ref([]);

	const fetchCharacters = async (): Promise<void> => {
		try {
			const list = await useCases.list({});
			characters.value = list.items;
		} catch (e) {
			console.log(e);
		}
	};

	onMounted(async () => {
		await fetchCharacters();
	});
</script>

<template>
	<div class="characters-view">
		<ul>
			<li v-for="character in characters" :key="`character-${character.$id}`" class="character-view__item">
				<span>{{ character.name }}</span>
			</li>
		</ul>
	</div>
</template>
