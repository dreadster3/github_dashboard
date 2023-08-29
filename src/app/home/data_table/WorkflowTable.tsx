import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import {
    RowSelectionState,
    TableOptions,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import DataTable from '../../../components/DataTable';
import DataTableItemsPerPage from '../../../components/DataTableItemsPerPage';
import DataTableNavigation from '../../../components/DataTableNavigation';
import SearchBar from '../../../components/SearchBar';
import icons from '../../../constants/icons';
import useDispatchWorkflow from '../../../hooks/useDispatchWorkflow';
import { IWorkflow } from '../../../models/Workflow';
import { IWorkflows } from '../../../models/Workflows';
import { get_columns } from './columns';

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
        <div className="overflow-hidden w-7/12">
            <div className="flex flex-row justify-between pb-2 h-full border-2">
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
            <div className="overflow-hidden bg-white rounded-lg border-2">
                <DataTable table={table} />
            </div>
            <div className="flex items-center pt-2">
                <div className="self-start text-xs basis-1/3">
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
