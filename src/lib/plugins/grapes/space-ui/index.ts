//@ts-nocheck
export const spaceTestPlugin = (editor, config) => {
	const { tables, rows } = config;
	editor.DomComponents.addType('api-list-component', {
		model: {
			defaults: {
				tagName: 'div',
				traits: [
					{ type: 'select', options: tables.map((table) => table.name), name: 'data-collection' }
				]
			},
			init() {
				for (let table of tables) {
					this.append(`<div  data-gjs-type="card">
					<p>{{name}}</p>
					</div>`);
				}

				this.on('change:components', () => {

					// Get the current child components
					const currentChildren = card.get('components');

					// Loop through all the other cards and update their children
					cards.forEach((otherCard) => {
						if (otherCard !== card) {
							// Ignore the current card
							// Clear any existing child components
							otherCard.components((parent) => parent === otherCard).reset();

							// Add the same child components as the current card
							currentChildren.forEach((childComponent) => {
								const clonedComponent = childComponent.clone(); // Clone the component
								otherCard.components((parent) => parent === otherCard).add(clonedComponent); // Add the cloned component to the other card
							});
						}
					});
				});
			},
			handlePropChange() {
				let prop = this.get('testprop');
				// Here inside view it is getting the old value. of "testprop" i.e '12345' but not
				//the new value
				//which is being fetched from server in the init() of model.
				let comp1 =
					'<div>' +
					'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" />' +
					'<span title="foo">' +
					prop +
					'</span>' +
					'</div>';

				const component = this.append(comp1);
				return component;
			}
		},
		view: {
			init() {}
		}
	});

	// A block for the custom component
	editor.BlockManager.add('api-grid-component', {
		label: 'Api List Component',
		content: `<div  data-gjs-type="api-list-component"></div>`
	});
};
