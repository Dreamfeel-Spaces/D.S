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

export function spacePages(editor: grapesjs.Editor) {
	let boxed = boxedLayout();
	let sidebar = sidebarLayout();
	let scard = card();

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
