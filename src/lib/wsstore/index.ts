import { writable } from 'svelte/store';

export const apiHelperModal = writable({ open: false });

export const passwordResetDialog = writable({ open: false });

export const heroSliderPaused = writable({ paused: false });

export const recentlyViewed = writable({});

export const geoStore = writable({});

export const tableIcon = writable('folder_open');

export const templateModalOpen = writable(false);

export const colorScheme = writable([
	'#253031',
	'#315659',
	'#2978A0',
	'#BCAB79',
	'#2E4D4F',
	'#88AB75',
    "#AD6A6C",
    "#5D2E46"
]);
