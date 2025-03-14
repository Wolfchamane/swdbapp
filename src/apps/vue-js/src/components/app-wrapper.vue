<script lang="ts" setup>
</script>

<template>
	<header class="app-header border-bottom-1 center">
        <h1 class='sw-ff color-primary'>Star Wars</h1>
        <p class='sw-ff color-primary'>DB Application</p>
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
