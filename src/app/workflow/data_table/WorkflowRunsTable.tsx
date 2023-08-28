import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './columns';
import DataTable from '../../../components/DataTable';
import DataTableNavigation from '../../../components/DataTableNavigation';
import { IWorkflowRuns } from '../../../models/WorkflowRuns';
import { useMemo } from 'react';
import DataTableItemsPerPage from '../../../components/DataTableItemsPerPage';

interface IWorkflowRunsTableProps {
    data: IWorkflowRuns | undefined;
    totalPages: number;
    perPage: number;
    setPerPage: (perPage: number) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

function WorkflowRunsTable({
    data,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
}: IWorkflowRunsTableProps) {
    const workflow_runs = useMemo(() => data?.workflow_runs ?? [], [data]);

    const table = useReactTable({
        data: workflow_runs,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-1/2 overflow-hidden">
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

export default WorkflowRunsTable;
