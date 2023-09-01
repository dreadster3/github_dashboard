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
import TablePagination from '../../../components/TablePagination';
import Button from '../../../components/core/Button';
import TableAddon from '../../../components/core/TableAddon';
import SearchBar from '../../../components/table_addons/SearchBar';
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
        <div className="overflow-hidden w-2/3">
            <TableAddon>
                <SearchBar value={globalFilter} onChange={setGlobalFilter} />
                <Button
                    className={clsx(
                        !(
                            table.getIsAllRowsSelected() ||
                            table.getIsSomeRowsSelected()
                        ) && 'invisible',
                    )}
                    isLoading={isLoading}
                    onClick={handle_dispatch_button_click}
                >
                    Dispatch
                </Button>
            </TableAddon>
            <DataTable table={table} />
            <TablePagination
                rowsPerPage={perPage}
                count={table_data.length}
                page={currentPage}
                onPageChange={setCurrentPage}
                OnRowsPerPageChange={setPerPage}
                isLoading={isLoading}
            />
        </div>
    );
}

export default WorkflowTable;
