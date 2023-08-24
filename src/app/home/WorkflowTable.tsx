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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../constants/icons';

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
                state: EWorkflowState.DELETED,
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
        <div className="w-1/2 overflow-hidden">
            <div className="pt-2 pb-2 border-2 rounded-md">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon
                            className="text-gray-400"
                            icon={icons.s_search}
                        />
                    </div>
                    <input
                        type="text"
                        className="block bg-white rounded-full border p-1 pl-9 text-sm focus:ring-blue-500 focus:ring-2 focus:outline-none focus:ring-inset"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Search..."
                    />
                </div>
            </div>
            <div className="bg-white border-2 rounded-lg overflow-hidden">
                <table className="table-auto w-full text-sm text-left">
                    <thead className="bg-black text-white">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th className={'px-6 py-4'} key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
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
                                    <td className="px-6 py-4" key={cell.id}>
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
        </div>
    );
}

export default WorkflowTable;
