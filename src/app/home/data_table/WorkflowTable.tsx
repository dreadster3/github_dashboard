import { useQueryClient } from '@tanstack/react-query';
import {
    RowSelectionState,
    TableOptions,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import DataTable from '../../../components/DataTable';
import TablePagination from '../../../components/TablePagination';
import Button from '../../../components/core/Button';
import Card from '../../../components/core/card/Card';
import CardBody from '../../../components/core/card/CardBody';
import CardFooter from '../../../components/core/card/CardFooter';
import CardHeader from '../../../components/core/card/CardHeader';
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
        <Card className="h-full w-2/3 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-3">
                <SearchBar value={globalFilter} onChange={setGlobalFilter} />
                <Button
                    isInvisible={
                        !(
                            table.getIsAllRowsSelected() ||
                            table.getIsSomeRowsSelected()
                        )
                    }
                    isLoading={isLoading}
                    onClick={handle_dispatch_button_click}
                >
                    Dispatch
                </Button>
            </CardHeader>
            <CardBody className="max-h-[600px] overflow-scroll p-0">
                <DataTable table={table} />
            </CardBody>
            <CardFooter className="p-3 shadow-2xl shadow-black">
                <TablePagination
                    rowsPerPage={perPage}
                    count={table_data.length}
                    page={currentPage}
                    onPageChange={setCurrentPage}
                    OnRowsPerPageChange={setPerPage}
                    isLoading={isLoading}
                />
            </CardFooter>
        </Card>
    );
}

export default WorkflowTable;
