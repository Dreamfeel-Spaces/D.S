export function transformRows(rows: any[] = [], columns: any[] = []) {
	return rows.map((row) => {
		row = { ...row };
		let tabledata = [...row.tableData];
		delete (row as any)['tableData'];
		return {
			...row,
			...{
				...tabledata.reduce((prev, curr) => {
					return { ...prev, [curr.column]: curr.data };
				}, {})
			}
		};
	});
}
