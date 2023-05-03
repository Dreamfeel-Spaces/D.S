import { writable } from 'svelte/store';

export const qsLauncher = writable({ skipped:true, step: 0 });
