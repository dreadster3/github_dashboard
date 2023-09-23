'use client';

import DataTable from '@/components/DataTable';
import TablePagination from '@/components/TablePagination';
import Button from '@/components/core/Button';
import Card from '@/components/core/card/Card';
import CardBody from '@/components/core/card/CardBody';
import CardFooter from '@/components/core/card/CardFooter';
import CardHeader from '@/components/core/card/CardHeader';
import useDispatchWorkflow from '@/hooks/useDispatchWorkflow';
import { IRuns } from '@/models/Runs';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './columns';

interface IWorkflowRunsTableProps {
    data: IRuns | undefined;
    workflow_id: number;
    totalPages: number;
    perPage: number;
    setPerPage: (perPage: number) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    isDataLoading: boolean;
}

function WorkflowRunsTable({
    data,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
    workflow_id,
    isDataLoading,
}: IWorkflowRunsTableProps) {
    const workflow_runs = data?.workflow_runs ?? [];
    const { isLoading, dispatch_workflow } = useDispatchWorkflow();

    const table = useReactTable({
        data: workflow_runs,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handle_dispatch_button_click = () => {
        dispatch_workflow({
            workflow_id,
        });
    };

    return (
        <Card className="h-full w-2/3 overflow-hidden">
            <CardHeader className="flex flex-row-reverse items-center justify-between p-3">
                <Button
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
                    count={data?.total_count ?? workflow_runs.length}
                    page={currentPage}
                    onPageChange={setCurrentPage}
                    onRowsPerPageChange={setPerPage}
                    isLoading={isDataLoading}
                />
            </CardFooter>
        </Card>
    );
}

export default WorkflowRunsTable;
