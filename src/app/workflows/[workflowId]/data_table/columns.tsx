import StatusLabel from '@/components/StatusLabel';
import { IRun } from '@/models/Run';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<IRun>();

export const columns: ColumnDef<IRun, any>[] = [
    columnHelper.accessor('run_number', {
        id: 'run_number',
        header: '#',
        cell: (cell) => (
            <a
                className="hover:text-blue-500 hover:underline"
                href={`/workflows/${cell.row.original.workflow_id}/runs/${cell.row.original.id}`}
            >
                {cell.renderValue()}
            </a>
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
