import { createColumnHelper } from '@tanstack/react-table';
import { IWorkflow } from '../../models/Workflow';

const columnHelper = createColumnHelper<IWorkflow>();

export const columns = [
    columnHelper.accessor('id', {
        id: 'id',
        cell: (column) => column.renderValue(),
    }),
    columnHelper.accessor('name', {
        id: 'name',
        cell: (column) => column.renderValue(),
    }),
    columnHelper.accessor('state', {
        id: 'state',
        cell: (column) => column.renderValue(),
    }),
];
