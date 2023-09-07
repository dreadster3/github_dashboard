import { Table as ReactTable, flexRender } from '@tanstack/react-table';
import Table from './core/table/Table';
import TableBody from './core/table/TableBody';
import TableCell from './core/table/TableCell';
import TableHeader from './core/table/TableHeader';
import TableRow from './core/table/TableRow';

interface IDataTableProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: ReactTable<any>;
}

function DataTable({ table }: IDataTableProps) {
    return (
        <Table>
            <TableHeader className="sticky left-0 top-0 shadow-lg">
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableCell
                                align="center"
                                className="bg-ctp-surface0 text-ctp-text"
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
                        className="bg-ctp-surface1 text-ctp-text odd:bg-ctp-surface2"
                        key={row.id}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell
                                align="center"
                                className=""
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
    );
}

export default DataTable;
