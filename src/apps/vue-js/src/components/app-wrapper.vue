<script lang="ts" setup>
    import { useRoute, useRouter } from 'vue-router';
    import { type ComputedRef, computed } from 'vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
    import { capitalize } from '@amjs/js-utils';

    const ROUTER = useRouter();
    const currentRoute = useRoute();
    const isHomeView: ComputedRef<boolean> = computed(() => {
        return currentRoute.name === 'home-view';
    });

    const navigateBack = () => {
        ROUTER.back();
    };
</script>

<template>
	<header class="app-header border-bottom-1 center">
        <template v-if='isHomeView'>
            <h1 class='sw-ff color-primary'>Star Wars</h1>
            <p class='sw-ff color-primary'>DB Application</p>
        </template>
        <template v-else>
            <div class="d-flex align-center py-1 fs-xl color-primary">
                <font-awesome-icon :icon='faCircleLeft' @click='navigateBack' class='mx-1'/>
                <div class='grow sw-ff'>{{ capitalize(String(currentRoute.name).replace('-view', '')) }}</div>
            </div>
        </template>
    </header>
	<main class="app-main grow overflow-y-auto">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
	</main>
	<footer class="app-footer d-flex align-center justify-center p-1 border-top-1">
        About
    </footer>
</template>

<style lang='sass'>
</style>
