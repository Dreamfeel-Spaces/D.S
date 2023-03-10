//@ts-nocheck
export const cardPlugin = (editor, config) => {
	const type = 'card';
	const dc = editor.DomComponents;

	dc.addType(type, {
		model: {
			defaults: {
				droppable: false,
				draggable: true,
				attributes: {
					class: 'card'
				},
				components: [
					{
						tagName: 'img',
						attributes: {
							class: 'avatar',
							src: '{{avatarUrl}}'
						}
					},
					{
						tagName: 'div',
						components: [
							{
								tagName: 'h4',
								content: '{{name}}'
							},
							{
								tagName: 'p',
								content: '{{name}}'
							}
						]
					}
				]
			},
			init() {
				this.listenTo(this, 'change:attributes change:components', () => {
					const cardComponents = this.components();
					const cardData = this.get('data');
					const regex = /{{(\w+)}}/g;
					const imageRegex = /src="{{(\w+)}}"/g;
					const html = this.toHTML();

					cardComponents.each((component, index) => {
						if (index === 0) {
							// Update the avatar image source
							const avatar = component;
							const avatarSrc = avatar.get('attributes').src;

							if (avatarSrc.match(imageRegex)) {
								avatarSrc.replace(imageRegex, (match, key) => {
									const value = cardData[key];
									avatar.setAttributes({ src: value });
								});
							}
						} else {
							// Update all other components
							const componentHtml = html.replace(regex, (match, key) => {
								const value = cardData[key];
								return value || match;
							});
							component.set('content', componentHtml);
						}
					});
				});

				// Listen for changes to the first child component's image source
				const firstComponent = this.components().at(0);
				firstComponent.on('change:attributes:src', (model, value) => {
					const regex = /{{(\w+)}}/;
					const match = value.match(regex);

					if (match) {
						const key = match[1];
						const value = this.get('data')[key];

						// Update all other child components' image sources
						this.components().each((component, index) => {
							if (index === 0) return;

							const attributes = component.get('attributes');
							const src = attributes && attributes.src;

							if (src && src.match(regex)) {
								const updatedSrc = src.replace(regex, value);
								component.setAttributes({ src: updatedSrc });
							}
						});
					}
				});
			}
		},
		view: {
			events: {
				dblclick() {
					editor.select(this.model);
				}
			}
		}
	});

	// editor.BlockManager.add('card', {
	// 	label: 'Cardlist',
	// 	content: `<div  data-gjs-type="card"></div>`
	// });
};

// Watch for changes to the card's children
// cardPlugin.on('change:components', () => {
// 	// Get the current child components
// 	const currentChildren = card.get('components');

// 	// Loop through all the other cards and update their children
// 	cards.forEach((otherCard) => {
// 		if (otherCard !== card) {
// 			// Ignore the current card
// 			// Clear any existing child components
// 			otherCard.components((parent) => parent === otherCard).reset();

// 			// Add the same child components as the current card
// 			currentChildren.forEach((childComponent) => {
// 				const clonedComponent = childComponent.clone(); // Clone the component
// 				otherCard.components((parent) => parent === otherCard).add(clonedComponent); // Add the cloned component to the other card
// 			});
// 		}
// 	});
// });

// Watch for removal of components from the card
// cardPlugin.on('component:remove', (removedComponent) => {
// 	// Get the type of the removed component
// 	const removedType = removedComponent.get('type');

// 	// Loop through all the other cards and remove the same component
// 	cards.forEach((otherCard) => {
// 		if (otherCard !== card) {
// 			// Ignore the current card
// 			// Find the same component in the other card
// 			const componentToRemove = otherCard.components().find((component) => {
// 				return component.get('type') === removedType;
// 			});

// 			// Remove the component from the other card
// 			if (componentToRemove) {
// 				componentToRemove.remove();
// 			}
// 		}
// 	});
// });
