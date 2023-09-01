import { Table as ReactTable, flexRender } from '@tanstack/react-table';
import Table from './core/Table';
import TableBody from './core/TableBody';
import TableCell from './core/TableCell';
import TableHeader from './core/TableHeader';
import TableRow from './core/TableRow';

interface IDataTableProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: ReactTable<any>;
}

function DataTable({ table }: IDataTableProps) {
    return (
        <div className="overflow-auto max-h-[600px]">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableCell
                                    className="text-gray-300"
                                    key={header.id}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow
                            className="last:border-0 odd:bg-gray-100 dark:bg-stone-800 dark:odd:bg-stone-900"
                            key={row.id}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    className="border-0 dark:text-gray-200"
                                    key={cell.id}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DataTable;
