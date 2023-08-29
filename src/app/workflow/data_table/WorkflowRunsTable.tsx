import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import clsx from 'clsx';
import DataTable from '../../../components/DataTable';
import DataTableItemsPerPage from '../../../components/DataTableItemsPerPage';
import DataTableNavigation from '../../../components/DataTableNavigation';
import icons from '../../../constants/icons';
import useDispatchWorkflow from '../../../hooks/useDispatchWorkflow';
import { IWorkflowRuns } from '../../../models/WorkflowRuns';
import { columns } from './columns';

interface IWorkflowRunsTableProps {
    data: IWorkflowRuns | undefined;
    workflow_id: number;
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
    workflow_id,
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
        <div className="overflow-hidden w-1/2">
            <div className="flex flex-row-reverse justify-between pb-2 h-full border-2">
                <button
                    type="button"
                    className={clsx(
                        'bg-blue-400 p-2 rounded-lg shadow-sm text-white text-sm shadow-blue-500 w-20 pointer-events-auto',
                        'disabled:bg-gray-400 disabled:pointer-events-none',
                        'hover:shadow-blue-100 hover:shadow-md',
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

export default WorkflowRunsTable;
