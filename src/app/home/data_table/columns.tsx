import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IWorkflow } from '../../../models/Workflow';
import WorkflowStatusLabel from './WorkflowStatusLabel';
import IndeterminateCheckbox from '../../../components/IndeterminateCheckbox';
import { QueryClient } from 'react-query';
import { IWorkflowRun } from '../../../models/WorkflowRun';
import { Link } from 'react-router-dom';
import { IWorkflowRuns } from '../../../models/WorkflowRuns';

const columnHelper = createColumnHelper<IWorkflow>();

export const get_columns = (query_client: QueryClient) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: ColumnDef<IWorkflow, any>[] = [
        {
            id: 'select',
            header: (context) => (
                <IndeterminateCheckbox
                    checked={context.table.getIsAllRowsSelected()}
                    indeterminate={context.table.getIsSomeRowsSelected()}
                    onChange={context.table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: (cell) => (
                <IndeterminateCheckbox
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
                    to={`/workflow/${cell.getValue()}`}
                >
                    {cell.getValue()}
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
                const data: IWorkflowRuns | undefined =
                    query_client.getQueryData(['workflow_runs', row.id]);

                const runs = data?.workflow_runs ?? [];

                if (runs.length === 0) return '';

                return `${runs[0].conclusion}-${runs[0].status}`;
            },
            cell: (cell) => {
                return (
                    <div className="text-center">
                        <WorkflowStatusLabel
                            workflow_id={cell.row.original.id}
                        />
                    </div>
                );
            },
        },
    ];

    return columns;
};
