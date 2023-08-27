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
import DataTable from '../../../components/DataTable';
import SearchBar from '../../../components/SearchBar';

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
                <SearchBar value={globalFilter} onChange={setGlobalFilter} />
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
                <DataTable table={table} />
            </div>
        </div>
    );
}

export default WorkflowTable;
