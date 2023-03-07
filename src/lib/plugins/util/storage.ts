export function gStorage(key: string) {
	return {
		type: 'local',
		autosave: true,
		autoload: true,
		stepsBeforeSave: 1,
		options: {
			local: {
				key
			}
		}
	};
}
