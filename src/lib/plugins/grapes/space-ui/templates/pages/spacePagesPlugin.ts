import type grapesjs from 'grapesjs';
import boxedLayout from './data.ts/boxedLayout';
import sidebarLayout from './data.ts/sidebarLayout';
import card from './data.ts/card';
import header from './e-commerce/header';
import landingOne from './e-commerce/landingOne';
import detailOne from './e-commerce/detailOne';
import cart from './e-commerce/cart';
import categories1 from './e-commerce/categories1';
import gridOne from './e-commerce/gridOne';
import checkoutOne from './e-commerce/checkoutOne';
import landingONe from './data.ts/landingONe';
import type { Editor } from 'grapesjs';

export function spacePages(editor: Editor) {
	let boxed = boxedLayout();
	let sidebar = sidebarLayout();
	let scard = card();

	const boxedLayoutScript = function () {
		const dropdownEl = document.getElementById('spaces-dropdown-handler');
		const menuOpener = document.getElementById('spaces-menu-opener');
		const sideBarCloser = document.getElementById('spaces-id-handler-close');
		const crossCloser = document.getElementById('space-cross-closer');

		dropdownEl?.addEventListener('click', () => sidebarHandler(dropdownEl));
		crossCloser?.addEventListener('click', () => sidebarHandler(false));
		sideBarCloser?.addEventListener('click', () => sidebarHandler(false));
		sideBarCloser?.addEventListener('click', () => sidebarHandler(false));

		menuOpener?.addEventListener('click', () => sidebarHandler(menuOpener));

		function dropdownHandler(element) {
			let single = element.getElementsByTagName('ul')[0];
			single?.classList.toggle('hidden');
		}
		function menuHandler(el, val) {
			let MainList = el.parentElement.getElementsByTagName('ul')[0];
			let closeIcon = el.parentElement.getElementsByClassName('close-m-menu')[0];
			let showIcon = el.parentElement.getElementsByClassName('show-m-menu')[0];
			if (val) {
				MainList?.classList.remove('hidden');
				el?.classList.add('hidden');
				closeIcon?.classList.remove('hidden');
			} else {
				showIcon?.classList.remove('hidden');
				MainList?.classList.add('hidden');
				el?.classList.add('hidden');
			}
		}

		const sidebarHandler = (check) => {
			let sideBar = document.getElementById('mobile-nav');
			let menu = document.getElementById('spaces-menu-opener');
			let cross = document.getElementById('space-cross-closer');
			sideBar?.style.transform = 'translateX(-100%)';
			if (check) {
				sideBar?.style?.transform = 'translateX(0px)';
				menu?.classList.add('hidden');
				cross?.classList.remove('hidden');
			} else {
				sideBar.style.transform = 'translateX(-100%)';
				menu?.classList.remove('hidden');
				cross?.classList.add('hidden');
			}
		};
		let list = document.getElementById('list');
		let chevrondown = document.getElementById('chevrondown');
		let chevronup = document.getElementById('chevronup');
		const listHandler = (check) => {
			if (check) {
				list?.classList.remove('hidden');
				chevrondown?.classList.remove('hidden');
				chevronup?.classList.add('hidden');
			} else {
				list?.classList.add('hidden');
				chevrondown?.classList.add('hidden');
				chevronup?.classList.remove('hidden');
			}
		};
		let list2 = document.getElementById('list2');
		let chevrondown2 = document.getElementById('chevrondown2');
		let chevronup2 = document.getElementById('chevronup2');
		const listHandler2 = (check) => {
			if (check) {
				list2?.classList.remove('hidden');
				chevrondown2?.classList.remove('hidden');
				chevronup2?.classList.add('hidden');
			} else {
				list2?.classList.add('hidden');
				chevrondown2?.classList.add('hidden');
				chevronup2?.classList.remove('hidden');
			}
		};
	};

	editor.DomComponents.addType('boxed-layout', {
		model: {
			defaults: {
				tagName: 'div',
				script: boxedLayoutScript
			},
			init() {
				console.log('Boxed layout has beeen innitialized');
			},
			updated(property: any) {
				// if (property === 'traits') this.updatedTraits();
			}
		}
	});

	editor.BlockManager.add('Boxed Layout', {
		label: 'Boxed Layout',
		category: 'Master Layout',
		content: boxed
	});

	editor.BlockManager.add('Sidebar Layout', {
		label: 'Sidebar Layout',
		category: 'Master Layout',
		content: sidebar
	});

	editor.BlockManager.add('Card', {
		label: 'Card Layout',
		category: 'Layout',
		content: scard
	});

	editor.BlockManager.add('Header', {
		label: 'Header',
		category: 'Web UI Kit',
		content: header()
	});

	editor.BlockManager.add('E-commerce 1', {
		label: 'E-Commerce 1',
		category: 'Pages',
		content: landingOne()
	});

	editor.BlockManager.add('Detail 1', {
		label: 'Detail 1',
		category: 'Pages',
		content: detailOne()
	});

	editor.BlockManager.add('Cart 1', {
		label: 'Cart 1',
		category: 'Pages',
		content: cart()
	});

	editor.BlockManager.add('Categories 1', {
		label: 'Categories 1',
		category: 'Pages',
		content: categories1()
	});

	editor.BlockManager.add('Grid 1', {
		label: 'Grid 1',
		category: 'Pages',
		content: gridOne()
	});

	editor.BlockManager.add('Checkout 1', {
		label: 'Checkout 1',
		category: 'Pages',
		content: checkoutOne()
	});

	editor.BlockManager.add('Lanfing 1', {
		label: 'Lanfing 1',
		category: 'Pages',
		content: landingONe()
	});
}
