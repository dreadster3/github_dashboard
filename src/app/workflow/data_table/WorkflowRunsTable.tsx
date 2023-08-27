import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { IWorkflowRun } from '../../../models/WorkflowRun';
import { columns } from './columns';
import DataTable from '../../../components/DataTable';

interface IWorkflowRunsTableProps {
    data: IWorkflowRun[];
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

function WorkflowRunsTable({
    data,
    currentPage,
    setCurrentPage,
    totalPages,
}: IWorkflowRunsTableProps) {
    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-1/2 overflow-hidden">
            <div className="bg-white border-2 rounded-lg overflow-hidden">
                <DataTable table={table} />
            </div>
            <div className="flex justify-between">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <p>{currentPage}</p>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default WorkflowRunsTable;
