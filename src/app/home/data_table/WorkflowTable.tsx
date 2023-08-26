import {
    RowSelectionState,
    TableOptions,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { IWorkflow } from '../../../models/Workflow';
import { get_columns } from './columns';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../../constants/icons';
import clsx from 'clsx';
import { useQueryClient } from 'react-query';
import useDispatchWorkflow from '../../../hooks/useDispatchWorkflow';

interface IWorkflowTableProps {
    data: IWorkflow[];
}

function WorkflowTable({ data }: IWorkflowTableProps) {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const { dispatch_workflow, isLoading } = useDispatchWorkflow();
    const queryClient = useQueryClient();

    const options: TableOptions<IWorkflow> = {
        data: data,
        columns: get_columns(queryClient),
        state: {
            globalFilter,
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    };

    const table = useReactTable(options);

    const handle_dispatch_button_click = async () => {
        const rows = table.getSelectedRowModel().rows;

        const dispatches = rows.map((row) =>
            dispatch_workflow({
                workflow_id: row.original.id,
            }),
        );

        await Promise.all(dispatches);
    };

    return (
        <div className="w-1/2 overflow-hidden">
            <div className="h-full flex flex-row pb-2 border-2 justify-between">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 -top-1 flex items-center pl-3 pointer-events-none">
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
                <button
                    type="button"
                    className={clsx(
                        'bg-blue-400 p-2 rounded-lg shadow-sm text-white text-sm shadow-blue-500 w-20 pointer-events-auto',
                        'disabled:bg-gray-400 disabled:pointer-events-none',
                        'hover:shadow-blue-100 hover:shadow-md',
                        !(
                            table.getIsSomeRowsSelected() ||
                            table.getIsAllRowsSelected()
                        ) && 'invisible',
                    )}
                    onClick={handle_dispatch_button_click}
                >
                    {isLoading ? (
                        <FontAwesomeIcon
                            icon={icons.s_spinner}
                            className={'animate-spin'}
                        />
                    ) : (
                        <>Dispatch</>
                    )}
                </button>
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
