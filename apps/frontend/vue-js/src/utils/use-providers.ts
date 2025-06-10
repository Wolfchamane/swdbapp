import { type Ref, inject, provide, ref } from 'vue';

const showLicense: Ref<boolean> = ref(false);
const showMenu: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);

const toggleLicense = () => (showLicense.value = !showLicense.value);
const toggleLoading = () => (isLoading.value = !isLoading.value);
const toggleMenu = () => (showMenu.value = !showMenu.value);

export const provideTogglers = () => {
	provide('toggleLoading', toggleLoading);
	provide('toggleLicense', toggleLicense);
	provide('toggleMenu', toggleMenu);

	return {
		showLicense,
		showMenu,
		isLoading,
	};
};

export const injectTogglers = () => {
	const toggleLoading: Ref<() => void | undefined> = inject('toggleLoading');
	const toggleLicense: Ref<() => void | undefined> = inject('toggleLicense');
	const toggleMenu: Ref<() => void | undefined> = inject('toggleMenu');

	return {
		showLicense,
		isLoading,
		showMenu,
		toggleLoading,
		toggleLicense,
		toggleMenu,
	};
};
