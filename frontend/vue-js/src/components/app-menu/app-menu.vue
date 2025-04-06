<script lang="ts" setup>
	import { type Ref, ref } from 'vue';
	import { type RouteLocation, useRoute, useRouter } from 'vue-router';
	import routes from '@/router/routes';
	import { AppMenuItem } from '../app-menu-item';

	const ROUTER = useRouter();
	const currentRoute = useRoute();
	const menuItems: Ref<RouteLocation[]> = ref(
		routes
			.filter((route: RouteLocation) => route.path !== '/')
			.filter((route: RouteLocation) => {
				return route.meta?.menuItem;
			})
	);

	const navigateTo = (route: RouteLocation) => {
		ROUTER.push({ ...route });
	};

	const isActive = (route: RouteLocation): boolean => {
		return new RegExp(route.path).test(currentRoute.path);
	};
</script>

<template lang="pug">
    aside.app-menu.mx-1
        app-menu-item(v-for="route in menuItems",
            :key='`route-${route.name}`', :title='route.name' :icon='route.meta.icon',
            :active='isActive(route)'
            @click='navigateTo(route)')/
</template>

<style lang="sass" src="./styles.sass"></style>
