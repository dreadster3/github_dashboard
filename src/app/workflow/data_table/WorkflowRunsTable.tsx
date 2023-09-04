import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import DataTable from '../../../components/DataTable';
import TablePagination from '../../../components/TablePagination';
import Button from '../../../components/core/Button';
import TableAddon from '../../../components/core/table/TableAddon';
import useDispatchWorkflow from '../../../hooks/useDispatchWorkflow';
import { IRuns } from '../../../models/Runs';
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
        <div className="overflow-hidden w-2/3">
            <TableAddon className="flex flex-row-reverse">
                <Button
                    isLoading={isLoading}
                    onClick={handle_dispatch_button_click}
                >
                    Dispatch
                </Button>
            </TableAddon>
            <DataTable table={table} />
            <TablePagination
                rowsPerPage={perPage}
                count={data?.total_count ?? workflow_runs.length}
                page={currentPage}
                onPageChange={setCurrentPage}
                OnRowsPerPageChange={setPerPage}
                isLoading={isDataLoading}
            />
        </div>
    );
}

export default WorkflowRunsTable;
