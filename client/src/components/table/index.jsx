import { Table } from 'ant-table-extensions'
const TableEl = ({ heading, columns, dataSource, loading }) => {
	return (
		<div>
			<h3>{heading}</h3>
			<Table
				searchable
				bordered
				exportable
				exportableProps={{ showColumnPicker: true }}
				searchableProps={{ fuzzySearch: true }}
				columns={columns}
				dataSource={dataSource}
				scroll={{ x: true }}
				loading={loading}
			/>
		</div>
	)
}

export default TableEl
