<script lang="ts" setup>
	import type { EraItemProperties } from './types';

	defineProps<EraItemProperties>();
</script>

<template lang="pug">
    .era-item.d-flex.align-center.border-1.radius-s.my-1.cursor-pointer
        img.era-item__icon.w-2.h-2.mb-05.ml-1.mr-2(:src='era.logo.href', :alt='era.name')/
        span.era-item__name {{ era.name }}
</template>

<style lang="sass" src="./styles.sass"></style>
