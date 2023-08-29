import { Table, flexRender } from '@tanstack/react-table';

interface IDataTableProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: Table<any>;
}

function DataTable({ table }: IDataTableProps) {
    return (
        <table className="table-auto w-full text-sm text-left">
            <thead className="bg-black text-white text-center">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th className={'px-6 py-4'} key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext(),
                                      )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td className="px-6 py-4 text-center" key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataTable;
