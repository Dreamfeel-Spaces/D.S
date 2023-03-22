import { writable } from 'svelte/store';

export const apiHelperModal = writable({ open: false });

export const passwordResetDialog = writable({ open: false });

export const heroSliderPaused = writable({ paused: false });
