<script lang="ts" setup>
	import type { PeopleListItemProperties } from './people-list-item.types';

	defineProps<PeopleListItemProperties>();
</script>

<template>
	<div class="people-list-item my-1 p-2 pt-1 pb-1 border-1 radius-s">
		<span>{{ name }}</span>
	</div>
</template>
