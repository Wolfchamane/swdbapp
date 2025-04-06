<script lang="ts" setup>
	import { type Ref, ref } from 'vue';
	import { type RouteLocation, useRoute, useRouter } from 'vue-router';
	import routes from '@/router/routes';
	import { AppMenuItem } from '../app-menu-item';

	const ROUTER = useRouter();
	const currentRoute = useRoute();
	const menuItems: Ref<RouteLocation[]> = ref(routes.filter((route: RouteLocation) => route.path !== '/'));

	const navigateTo = (route: RouteLocation) => {
		ROUTER.push({ ...route });
	};

	const isCurrentRoute = (route: RouteLocation): boolean => {
		return route.name === currentRoute.name;
	};
</script>

<template lang="pug">
    aside.app-menu.mx-1
        app-menu-item(v-for="route in menuItems",
            :key='`route-${route.name}`', :title='route.name' :icon='route.meta.icon', :expanded='isHomeView',
            :active='isCurrentRoute(route)'
            @click='navigateTo(route)')/
</template>

<style lang="sass" src="./styles.sass"></style>
