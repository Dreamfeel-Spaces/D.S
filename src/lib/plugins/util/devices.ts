export function gDevices() {
	return {
		devices: [
			{
				name: 'Desktop',
				width: '',
				id: 'desktop'
			},
			{
				name: 'Mobile',
				width: '320px', // this value will be used on canvas width
				widthMedia: '480px',
				id: 'mobile' // this value will be used in CSS @media
			}
		]
	};
}
