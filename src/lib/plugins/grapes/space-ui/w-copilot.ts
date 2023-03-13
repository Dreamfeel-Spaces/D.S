// function listPlugin(editor, opts = {}) {
// 	// Extract the tables and rows from the plugin options
// 	const { tables = [], rows = [] } = opts;
  
// 	// Register the 'list' component type
// 	editor.DomComponents.addType('list', {
// 	  model: {
// 		defaults: {
// 		  droppable: true,
// 		  attributes: {
// 			'data-table': '' // Add a 'data-table' attribute to the component
// 		  }
// 		},
  
// 		init() {
// 		  // Initialize the component
// 		  this.updateContent(); // Call updateContent() to populate the component
// 		  this.listenTo(this, 'change:attributes:data-table', this.updateContent); // Listen for changes to the 'data-table' attribute and call updateContent() when it changes
// 		},
  
// 		updateContent() {
// 		  // Update the content of the component based on the 'data-table' attribute
// 		  const dataTable = this.get('attributes')['data-table'];
// 		  if (!dataTable) return; // If 'data-table' is not set, do nothing
  
// 		  const tableData = tables.find(table => table.name === dataTable);
// 		  if (!tableData) return; // If no matching table is found, do nothing
  
// 		  const rowsData = tableData.rows;
// 		  const rowComponents = rowsData.map((row, index) => {
// 			const { username, image } = row;
  
// 			// Create a 'username' text component for the row
// 			const usernameComponent = editor.Component.create('text', {
// 			  content: username,
// 			  selectable: index === 0, // Only make the first row selectable
// 			  editable: index === 0 // Only make the first row editable
// 			});
  
// 			// Create an 'image' component for the row
// 			const imageComponent = editor.Component.create('image', {
// 			  attributes: {
// 				src: image
// 			  },
// 			  selectable: false, // Make the image component non-selectable
// 			  editable: false // Make the image component non-editable
// 			});
  
// 			// Create a 'row' component to contain the 'username' and 'image' components
// 			const rowComponent = editor.Component.create('div', {
// 			  components: [usernameComponent, imageComponent], // Add the 'username' and 'image' components as child components
// 			  selectable: false // Make the 'row' component non-selectable
// 			});
  
// 			// If this is the first row, make it editable and listen for changes to update all other rows
// 			if (index === 0) {
// 			  rowComponent.set('selectable', true); // Make the row selectable
// 			  // Listen for changes to the first row
// 			  this.listenTo(rowComponent, 'change', () => {
// 				const childComponents = this.get('components');
// 				childComponents.forEach((child, index) => {
// 				  if (index !== 0) {
// 					// For each child component that is not the first row, update the 'username' component with the new content of the first row
// 					const rowComponent = child;
// 					const usernameComponent = rowComponent.get('components')[0];
// 					usernameComponent.set('content', usernameComponent.get('content'));
// 				  }
// 				});
// 			  });
// 			}
  
// 			return rowComponent;
// 		  });
  
// 		  // Replace the current child components with the first row component
// 		  this.components([rowComponents[0]]);
// 		  // Append the other row components as child components
// 		  rowComponents.forEach((component, index) => {
// 			if (index !== 0) {
// 			  // Make the other rows non-selectable and non-editable
// 			  component.set('selectable', false);
// 			  component.set('editable', false);
// 			  component.get('components').forEach(child =>          // Make the other rows non-selectable and non-editable
// 			  component.set('selectable', false);
// 			  component.set('editable', false);
// 			  component.get('components').forEach(child => {
// 				child.set('selectable', false);
// 				child.set('editable', false);
// 			  });
	
// 			  this.append(component);
// 			});
// 		  }
// 		}
// 	  });
// 	}
	
// 	// Export the plugin function
// 	export default listPlugin;
	
export async function cardPlugin(){

}
  