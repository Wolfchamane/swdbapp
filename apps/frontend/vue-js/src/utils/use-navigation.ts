import { capitalize } from '@amjs/js-utils';
import { type ComputedRef, type Ref, computed } from 'vue';
import { type LocationQueryRaw, type RouteLocation, type Router, useRoute, useRouter } from 'vue-router';

export interface NavigateToInput {
	route: RouteLocation;
	showMenu: Ref<boolean>;
	toggleMenu: Ref<() => void | undefined>;
}

export interface UseNavigationOutput {
	ROUTER: Router;
	currentRoute: RouteLocation;
	isHomeView: ComputedRef<boolean>;
	title: ComputedRef<string>;
	isActiveRoute(name: string): boolean;
	navigateBack(): void;
	navigateTo(input: NavigateToInput): Promise<void>;
}

export const useNavigation = (): UseNavigationOutput => {
	const ROUTER = useRouter();
	const currentRoute = useRoute();

	const isHomeView: ComputedRef<boolean> = computed(() => /home/.test(String(currentRoute.name)));

	const title: ComputedRef<string> = computed(() => {
		return capitalize(String(currentRoute.name).replace('-view', '')).replace(/-/g, ' ');
	});

	const isActiveRoute = (name: string): boolean => {
		const parsedSingularName: string = /s$/.test(name) ? name.replace(/s$/, '') : name;

		const currentRouteName: string = `${String(currentRoute.name)}}`;

		return new RegExp(parsedSingularName, 'gi').test(currentRouteName);
	};

	const navigateBack = () => {
		ROUTER.back();
	};

	const navigateTo = async ({ route, showMenu, toggleMenu }: NavigateToInput) => {
		const { meta, name } = route;
		const query = (meta?.query || null) as LocationQueryRaw;
		await ROUTER.push({ name, query });
		if (showMenu.value && toggleMenu instanceof Function) {
			toggleMenu();
		}
	};

	return {
		ROUTER,
		currentRoute,
		isHomeView,
		title,
		isActiveRoute,
		navigateBack,
		navigateTo,
	};
};
