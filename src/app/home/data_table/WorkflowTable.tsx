import {
    RowSelectionState,
    TableOptions,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { IWorkflow } from '../../../models/Workflow';
import { get_columns } from './columns';
import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../../constants/icons';
import clsx from 'clsx';
import { useQueryClient } from 'react-query';
import useDispatchWorkflow from '../../../hooks/useDispatchWorkflow';
import DataTable from '../../../components/DataTable';
import SearchBar from '../../../components/SearchBar';
import DataTableNavigation from '../../../components/DataTableNavigation';
import DataTableItemsPerPage from '../../../components/DataTableItemsPerPage';
import { IWorkflows } from '../../../models/Workflows';

interface IWorkflowTableProps {
    data: IWorkflows | undefined;
    totalPages: number;
    perPage: number;
    setPerPage: (perPage: number) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

function WorkflowTable({
    data,
    totalPages,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
}: IWorkflowTableProps) {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const { dispatch_workflow, isLoading } = useDispatchWorkflow();
    const queryClient = useQueryClient();
    const table_data = useMemo(() => data?.workflows ?? [], [data]);

    const options: TableOptions<IWorkflow> = {
        data: table_data,
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
            <div className="pt-2 flex items-center">
                <div className="basis-1/3 text-xs self-start">
                    Showing {(currentPage - 1) * perPage + 1}-
                    {Math.min(
                        currentPage * perPage,
                        data?.total_count ?? Infinity,
                    )}{' '}
                    of {data?.total_count} results
                </div>
                <DataTableNavigation
                    className="basis-1/3"
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <DataTableItemsPerPage
                    className="basis-1/3"
                    perPage={perPage}
                    setPerPage={setPerPage}
                />
            </div>
        </div>
    );
}

export default WorkflowTable;
