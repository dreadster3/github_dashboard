import {
    TableOptions,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { EWorkflowState, IWorkflow } from '../../models/Workflow';
import { columns } from './columns';
import { useMemo, useState } from 'react';

interface IWorkflowTableProps {
    data: IWorkflow[];
}

function WorkflowTable({ data }: IWorkflowTableProps) {
    const [globalFilter, setGlobalFilter] = useState('');

    const memo_data = useMemo(
        () => [
            {
                id: 1,
                name: 'test',
                state: EWorkflowState.ACTIVE,
                path: 'test',
            },
            {
                id: 2,
                name: 'test2',
                state: EWorkflowState.ACTIVE,
                path: 'test2',
            },
            {
                id: 3,
                name: 'something',
                state: EWorkflowState.ACTIVE,
                path: 'something',
            },
        ],
        [],
    );

    const options: TableOptions<IWorkflow> = {
        data: memo_data,
        columns: columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    };

    const table = useReactTable(options);

    return (
        <div>
            <input
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search..."
            />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
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
                                <td key={cell.id}>
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
        </div>
    );
}

export default WorkflowTable;
