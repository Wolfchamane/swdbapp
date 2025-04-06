<script lang="ts" setup>
	import type { LoadingBarProperties } from './types';

	withDefaults(defineProps<LoadingBarProperties>(), { isVisible: false });
	defineOptions({
		inheritAttrs: false,
	});
</script>

<template lang='pug'>
    .loading-bar(:class='{ "loading-bar--visible": isVisible }')
</template>
