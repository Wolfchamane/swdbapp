<script lang="ts" setup>
	import { type Ref, ref } from 'vue';
	import { type RouteLocation, useRoute, useRouter } from 'vue-router';
	// @ts-expect-error import
	import routes from '@/router/routes';
	import { AppMenuItem } from '../app-menu-item';

	const ROUTER = useRouter();
	const currentRoute = useRoute();
	const menuItems: Ref<RouteLocation[]> = ref(
		routes
			.filter((route: RouteLocation) => route.path !== '/')
			.filter((route: RouteLocation) => {
				return !!route.meta?.icon;
			})
	);

	const navigateTo = (route: RouteLocation) => {
		ROUTER.push({ ...route });
	};

	const isActive = (route: RouteLocation): boolean => {
		return new RegExp(route.path).test(currentRoute.path);
	};
</script>

<template>
	<aside class="app-menu mx-1">
		<app-menu-item
			v-for="route in menuItems"
			:key="`route-${String(route.name)}`"
			:title="String(route.name)"
			:icon="route.meta.icon"
			:active="isActive(route)"
			@click="navigateTo(route)" />
	</aside>
</template>

<style lang="sass" src="./styles.sass"></style>
