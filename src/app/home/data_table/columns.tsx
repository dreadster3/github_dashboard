import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { IWorkflow } from '../../../models/Workflow';
import WorkflowStatusLabel from './WorkflowStatusLabel';
import IndeterminateCheckbox from '../../../components/IndeterminateCheckbox';
import { QueryClient } from 'react-query';
import { IWorkflowRun } from '../../../models/WorkflowRun';

const columnHelper = createColumnHelper<IWorkflow>();

export const get_columns = (query_client: QueryClient) => {
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
            cell: (cell) => cell.renderValue(),
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
                const data: IWorkflowRun[] | undefined =
                    query_client.getQueryData(['workflow_runs', row.id]);

                if (!data) return '';

                return `${data[0].conclusion}-${data[0].status}`;
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
