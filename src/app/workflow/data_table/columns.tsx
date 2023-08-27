import { ColumnDef, createColumnHelper } from '@tanstack/table-core';
import { IWorkflowRun } from '../../../models/WorkflowRun';
import StatusLabel from '../../../components/StatusLabel';

const columnHelper = createColumnHelper<IWorkflowRun>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<IWorkflowRun, any>[] = [
    columnHelper.accessor('id', {
        id: 'id',
        cell: (cell) => cell.renderValue(),
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
        header: (context) => <div className="text-center">status</div>,
        cell: (cell) => (
            <StatusLabel
                status={
                    cell.row.original.conclusion ?? cell.row.original.status
                }
            />
        ),
    },
];
