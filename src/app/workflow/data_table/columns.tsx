import { ColumnDef, createColumnHelper } from '@tanstack/table-core';
import { Link } from 'react-router-dom';
import StatusLabel from '../../../components/StatusLabel';
import { IWorkflowRun } from '../../../models/WorkflowRun';

const columnHelper = createColumnHelper<IWorkflowRun>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<IWorkflowRun, any>[] = [
    columnHelper.accessor('run_number', {
        id: 'run_number',
        header: '#',
        cell: (cell) => (
            <Link
                className="hover:text-blue-500 hover:underline"
                to={`/workflows/${cell.row.original.workflow_id}/runs/${cell.row.original.id}`}
            >
                {cell.renderValue()}
            </Link>
        ),
    }),
    columnHelper.accessor('name', {
        id: 'name',
        cell: (cell) => cell.renderValue(),
    }),
    columnHelper.accessor('branch', {
        id: 'branch',
        cell: (cell) => cell.renderValue(),
    }),
    {
        id: 'status',
        header: 'status',
        cell: (cell) => (
            <StatusLabel
                status={
                    cell.row.original.conclusion ?? cell.row.original.status
                }
            />
        ),
    },
];
