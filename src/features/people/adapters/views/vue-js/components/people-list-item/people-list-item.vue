<script lang="ts" setup>
	import type { PeopleListItemProperties } from './people-list-item.types';

	defineProps<PeopleListItemProperties>();
</script>

<template>
	<div
		:class="`people-list-item d-flex align-center justify-space-between my-1 p-2 pt-1 pb-1 w-100 border-1 radius-s ${alignment}`">
		<span class="people-list-item__name grow">{{ name }}</span>
		<div :class="`people-list-item__lightSaber fs-m`">
			<svg class="w-2 h-2">
				<use :xlink:href="`#${alignment}`"></use>
			</svg>
		</div>
	</div>
</template>
