<script lang="ts" setup>
	import { capitalize } from '@amjs/js-utils';
	import { type Ref, ref } from 'vue';
	import { type RouteLocation } from 'vue-router';
	import { ListItem } from '@swdbapp/frontend-vue-components';
	// @ts-expect-error import
	import routes from '@/router/routes';
	import { useNavigation } from '@/utils/use-navigation';
	import { injectTogglers } from '@/utils/use-providers';
	import type { AppMenuProperties } from './app-menu.types';

	defineProps<AppMenuProperties>();

	const { isActiveRoute, navigateTo } = useNavigation();
	const { showMenu, toggleMenu } = injectTogglers();

	interface MenuItem {
		lcName: string;
		ccName: string;
		route: RouteLocation;
	}

	const menuItems: Ref<MenuItem[]> = ref(
		routes
			.filter((route: RouteLocation) => !/details/.test(String(route.name)))
			.map((route: RouteLocation) => {
				const parsedName: string = String(route.name).replace('-view', '');

				return {
					lcName: parsedName.toLowerCase(),
					ccName: capitalize(parsedName),
					route,
				};
			})
	);

	const onListItemClick = (route: RouteLocation) => {
		navigateTo({ route, showMenu, toggleMenu });
	};

	const _isActiveRoute = (name: string): boolean => {
		debugger;
		return isActiveRoute(name);
	};
</script>

<template>
	<aside :class="['app-menu', { 'app-menu--open': open }]">
		<list-item
			v-for="menuItem in menuItems"
			:key="`route-${menuItem.lcName}`"
			:label="menuItem.ccName"
			:image="''"
			:active="_isActiveRoute(menuItem.lcName)"
			@click="onListItemClick(menuItem.route)" />
	</aside>
</template>

<style lang="sass" src="./app-menu.styles.sass"></style>
