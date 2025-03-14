<script lang='ts' setup>
    import type { LoadingBarProperties  } from './loading-bar.types';

    withDefaults(defineProps<LoadingBarProperties>(), { isVisible: false });
    defineOptions({
        inheritAttrs: false,
    });
</script>

<template>
    <div :class="['loading-bar', { 'loading-bar--visible': isVisible }]"></div>
</template>
