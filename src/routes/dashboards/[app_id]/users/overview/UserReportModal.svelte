<script lang="ts">
	//@ts-nocheck
	import {
		Button,
		Modal,
		Label,
		Input,
		Select,
		Checkbox,
		Textarea,
		Accordion,
		CloseButton,
		Alert,
		Radio
	} from 'flowbite-svelte';
	let formModal = false;
	export let columns: any = [];
	let reportType: '';
	let metaData = {
		sort: '',
		sortBy: '',
		layout: '',
		orientation: '',

		includeChart: false
	};
	let filters = [{ customValue: '' }];
	let charts = [{ labelKey: '', valueKey: '', chartType: '' }];
	let formType = 'manual';

	import { page } from '$app/stores';
	import axios from 'axios';

	let prompt = '';

	let Aiing = false;
	let success = false;
	let error = false;
	let responseData: any = null;
	let errorMsg: any = '';

	async function handleSubmit() {
		Aiing = true;
		error = false;
		success = false;
		try {
			const response = await axios.post(`/dreamAi/${$page.params.app_id}`, {
				prompt,
				type: whoAmi
			});
			if (response) {
				Aiing = false;
				success = true;
				responseData = response.data;
			}
		} catch (error) {
			Aiing = false;
			error = true;
			errorMsg = error;
		}
	}
</script>

<div class="text-end">
	<Button size="xs" gradient on:click={() => (formModal = true)}>+ Add Report</Button>
</div>
<form class="flex flex-col space-y-3" action="?/addReport&tab=reports" method="POST">
	<Modal bind:open={formModal} autoclose={false} class="w-full text-left">
		<div slot="header">
			<div class="text-left">
				<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Report</h3>
				<div class="flex mt-4">
					<Radio value="manual" bind:group={formType}>Manual</Radio>
					<Radio class="ml-2" value="describe" bind:group={formType}>Generate with AI</Radio>
				</div>
			</div>
		</div>
		{#if formType === 'manual'}
			<div class="flex flex-col space-y-3">
				<input value={JSON.stringify([...columns])} name={'columnMetaData'} type="hidden" />
				<Label class="space-y-2">
					<span>Name</span>
					<Input required type="text" name="name" placeholder="name" />
				</Label>
				<Label class="space-y-2">
					<span>Desc</span>
					<Textarea rows={3} type="text" name="description" placeholder="Desc" />
				</Label>
				<div class="flex">
					<div class=" flex-1">Select fields</div>
					<Checkbox
						checked={columns.filter((col) => col.checked).length === columns.length}
						on:click={() => {
							columns = [...columns.map((col) => ({ ...col, checked: !col.checked }))];
						}}>Select all</Checkbox
					>
				</div>
				<div class=" gap-2 wrap">
					{#each columns as column}
						<Checkbox bind:checked={column.checked} bind:value={column.checked}
							>{column.name}</Checkbox
						>
					{/each}
				</div>
				<hr />
				<div class="mb-4">
					<Checkbox
						name="includeChart"
						bind:checked={metaData.includeChart}
						bind:value={metaData.includeChart}>Include charts</Checkbox
					>
					{#if metaData.includeChart}
						<div>
							<div class="mb-2 mt-6">
								<p>Chart options</p>
								<input type="hidden" name="charts" value={JSON.stringify(charts)} />
							</div>
							{#each charts as chart}
								<div class="mb-3 flex gap-2 wrap">
									<Select
										placeholder="Chart type"
										required
										bind:value={chart.type}
										items={[
											{
												name: 'Bar',
												value: 'bar'
											},
											{
												name: 'Line',
												value: 'line'
											},
											{
												name: 'Pie',
												value: 'pie'
											},
											{
												name: 'Scatter',
												value: 'scatter'
											}
										]}
										name="type"
									/>
									<Select
										required
										name="labelKey"
										bind:value={chart.labelKey}
										items={[...columns]
											.map((col) => {
												return {
													name: col.name,
													value: col.name
												};
											})
											.concat([
												{
													name: 'Date created',
													value: 'dateCreated'
												}
											])}
										placeholder="Label"
										class=""
									/>
									<Select
										required
										name="valueKey"
										bind:value={chart.valueKey}
										items={[...columns]
											.map((col) => {
												return {
													name: col.name,
													value: col.name
												};
											})
											.concat([
												{
													name: 'Date created',
													value: 'dateCreated'
												}
											])}
										placeholder="Value"
									/>
								</div>
							{/each}
							<button
								type="button"
								on:click={() => {
									charts = [...charts, { labelKey: '', valueKey: '', chartType: '' }];
								}}>Add chart</button
							>
						</div>
					{/if}
				</div>
				<hr />
				<div class="flex">
					<div class=" flex-1">Sort and order</div>
				</div>
				<div class="mb-3 flex gap-2 wrap">
					<Select
						name="sort_by"
						bind:value={metaData.sortBy}
						items={[...columns]
							.map((col) => {
								return {
									name: col.name,
									value: col.name
								};
							})
							.concat([
								{
									name: 'Date created',
									value: 'dateCreated'
								}
							])}
						placeholder="Sort by"
						class=""
					/>
					<Select
						name="sort"
						bind:value={metaData.sort}
						items={[
							{
								name: 'None',
								value: 'none'
							},
							{
								name: 'Ascending',
								value: 'asc'
							},
							{
								name: 'Descending',
								value: 'desc'
							}
						]}
						placeholder="Select Order"
					/>
				</div>
				<hr />
				<div class="flex">
					<div class=" flex-1">Filters</div>
				</div>

				{#each filters as filter, index}
					<div class="mb-3 flex gap-2 wrap">
						<Select
							required
							bind:value={filter.compare}
							items={[...columns]
								.map((col) => {
									return {
										name: col.name,
										value: col.name
									};
								})
								.concat([
									{
										name: 'Date created',
										value: 'dateCreated'
									}
								])}
							placeholder="Where"
							class=""
						/>
						<Select
							required
							bind:value={filter.operand}
							items={[
								{
									name: 'Equals',
									value: 'equals'
								},
								{
									name: 'Less than',
									value: 'less_than'
								},
								{
									name: 'Greater than',
									value: 'greater_than'
								},
								{
									name: 'Starts with',
									value: 'starts_with'
								},
								{
									name: 'Includes',
									value: 'includes'
								}
							]}
							placeholder="Comparison"
						/>
						<Select
							required
							bind:value={filter.compareValue}
							items={[...columns]
								.map((col) => {
									return {
										name: col.name,
										value: col.name
									};
								})
								.concat([
									{
										name: 'Custom value',
										value: '__custom_field'
									}
								])}
							placeholder="Compare with"
						/>
						<CloseButton
							on:click={(e) => {
								const all = [...filters];
								all.splice(index, 1);
								filters = [...all];
							}}
						/>
					</div>
					{#if filter.compareValue === '__custom_field'}
						<div>
							<Input
								name="customValue"
								required
								bind:value={filter.customValue}
								placeholder="Custom value"
							/>
						</div>
					{/if}
					<input name="__report_filters" value={JSON.stringify(filters)} type="hidden" />
				{/each}
				<div class="my-4">
					<button
						type="button"
						on:click={() => {
							filters = [...filters, { customValue: '' }];
						}}>Add filter</button
					>
				</div>
				<hr />
				<div class="flex">
					<div class=" flex-1">Layout</div>
				</div>
				<div class="mb-3 flex gap-2 wrap">
					<Select
						required
						name="layout"
						id="layout"
						bind:value={metaData.layout}
						items={[
							{
								name: 'Tabular',
								value: 'tabular'
							},
							{
								name: 'Columnar',
								value: 'columnar'
							},
							{
								name: 'Justified',
								value: 'justified'
							}
						]}
					/>
				</div>

				<div class="flex">
					<div class=" flex-1">Orientation</div>
				</div>
				<div class="mb-3 flex gap-2 wrap">
					<Select
						required
						bind:value={metaData.orientation}
						items={[
							{
								name: 'Potrait',
								value: 'potrait'
							},
							{
								name: 'Landscape',
								value: 'landscape'
							}
						]}
						name="orientation"
					/>
				</div>
			</div>
		{:else}
			<div class="flex flex-col space-y-3">
				<Label class="space-y-2">
					<span>Name</span>
					<Input required type="text" name="name" placeholder="name" />
				</Label>
				<Label class="space-y-2">
					<Textarea
						rows={4}
						type="text"
						name="description"
						placeholder="i.e Get reports where {columns[0]
							?.name} field is likely to be more than 1000 by end of year."
					/>
				</Label>
			</div>
		{/if}
		<Button
			disabled={Aiing}
			slot="footer"
			type={formType === 'describe' ? 'button' : 'submit'}
			class="w-full">Create Report</Button
		>
	</Modal>
</form>
