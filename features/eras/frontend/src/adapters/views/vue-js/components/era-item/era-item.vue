<script lang="ts" setup>
import type { EraItemProperties } from './types';

defineProps<EraItemProperties>();
</script>

<template>
	<div class="list-item d-flex align-center border-1 radius-s my-1 cursor-pointer">
		<img class="era-item__icon w-2 h-2 mb-05 ml-1 mr-2" :src="era.logo.href" :alt="era.name" />
		<span class="era-item__name">{{ era.name }}</span>
	</div>
</template>
