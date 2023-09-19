import { QueryClient } from '@tanstack/react-query';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import Checkbox from '../../../components/core/Checkbox';
import { IRuns } from '../../../models/Runs';
import { IWorkflow } from '../../../models/Workflow';
import WorkflowStatusLabel from './WorkflowStatusLabel';

const columnHelper = createColumnHelper<IWorkflow>();

export const get_columns = (query_client: QueryClient) => {
    const columns: ColumnDef<IWorkflow, any>[] = [
        {
            id: 'select',
            header: (context) => (
                <Checkbox
                    checked={context.table.getIsAllRowsSelected()}
                    indeterminate={context.table.getIsSomeRowsSelected()}
                    onChange={context.table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: (cell) => (
                <Checkbox
                    checked={cell.row.getIsSelected()}
                    disabled={!cell.row.getCanSelect()}
                    indeterminate={cell.row.getIsSomeSelected()}
                    onChange={cell.row.getToggleSelectedHandler()}
                />
            ),
        },
        columnHelper.accessor('id', {
            id: 'id',
            cell: (cell) => (
                <Link
                    className="hover:text-blue-500 hover:underline"
                    to={`/workflows/${cell.getValue()}/runs`}
                >
                    {cell.renderValue()}
                </Link>
            ),
        }),
        columnHelper.accessor('name', {
            id: 'name',
            cell: (cell) => cell.renderValue(),
        }),
        columnHelper.accessor('state', {
            id: 'state',
            cell: (cell) => cell.renderValue(),
        }),
        {
            header: 'status',
            accessorFn: (row) => {
                const data: IRuns | undefined = query_client.getQueryData(
                    ['workflow_runs', row.id],
                    { exact: false },
                );

                const runs = data?.workflow_runs ?? [];

                if (runs.length === 0) return '';

                return `${runs[0].conclusion}-${runs[0].status}`;
            },
            cell: (cell) => {
                return (
                    <WorkflowStatusLabel workflow_id={cell.row.original.id} />
                );
            },
        },
    ];

    return columns;
};
