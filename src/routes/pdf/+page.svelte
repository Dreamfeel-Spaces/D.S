<script lang="ts">
	import type { Template } from '@pdfme/generator';
	import { generate } from '@pdfme/generator';
	import { BLANK_PDF } from '@pdfme/ui';

	const template: Template = {
		basePdf: BLANK_PDF,
		schemas: [
			{
				a: {
					type: 'text',
					position: { x: 10, y: 5 },
					width: 190,
					height: 10,
					alignment: 'right'
				},
				b: {
					type: 'text',
					position: { x: 10, y: 15 },
					width: 190,
					height: 10,
					alignment: 'right'
				},
				c: {
					type: 'text',
					position: { x: 10, y: 25 },
					width: 190,
					height: 10,
					alignment: 'right'
				},
				d: {
					type: 'text',
					position: { x: 10, y: 50 },
					width: 180,
					height: 10
				}
			},
			{
				a: {
					type: 'text',
					position: { x: 10, y: 5 },
					width: 190,
					height: 10,
					alignment: 'right'
				},
				b: {
					type: 'text',
					position: { x: 10, y: 15 },
					width: 190,
					height: 10,
					alignment: 'right'
				},
				c: {
					type: 'text',
					position: { x: 10, y: 25 },
					width: 190,
					height: 10,
					alignment: 'right'
				},
				e: {
					type: 'text',
					position: { x: 10, y: 50 },
					width: 180,
					height: 10
				}
			}
		]
	};
	const inputs = [
		{
			a: 'Demo',
			b: 'People',
			c: 'Report 1',
			d: 'The description goes here and blah blah blah',
			e: 'njhb'
		},
		{
			a: 'Demo',
			b: 'People',
			c: 'Report 1',
			d: 'The description goes here and blah blah blah',
			e: 'njhb'
		}
	];

	async function genPDF() {
		console.log(inputs);
		generate({ template, inputs }).then((pdf) => {
			console.log(pdf);

			const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
			window.open(URL.createObjectURL(blob));
			// Node.js
			// fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
		});
	}
</script>

<button on:click={genPDF}> Save </button>
