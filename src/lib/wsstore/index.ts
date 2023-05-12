import { writable } from 'svelte/store';

export const apiHelperModal = writable({ open: false });

export const passwordResetDialog = writable({ open: false });

export const heroSliderPaused = writable({ paused: false });

export const recentlyViewed = writable({});

export const geoStore = writable({});

export const tableIcon = writable('folder_open');

export const templateModalOpen = writable(false);
