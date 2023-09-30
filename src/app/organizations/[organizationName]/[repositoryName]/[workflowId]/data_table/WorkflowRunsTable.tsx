'use client';

import DataTable from '@/components/DataTable';
import SelectMenu, { SelectItem } from '@/components/Select';
import TablePagination from '@/components/TablePagination';
import Button from '@/components/core/Button';
import Card from '@/components/core/card/Card';
import CardBody from '@/components/core/card/CardBody';
import CardFooter from '@/components/core/card/CardFooter';
import CardHeader from '@/components/core/card/CardHeader';
import useDispatchWorkflow from '@/hooks/useDispatchWorkflow';
import useGetBranches from '@/hooks/useGetBranches';
import useGetRepository from '@/hooks/useGetRepository';
import { IRuns } from '@/models/Runs';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { columns } from './columns';

interface IWorkflowRunsTableProps {
    data: IRuns | undefined;
    workflow_id: number;
    totalPages: number;
    perPage: number;
    setPerPage: (perPage: number) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    isDataLoading: boolean;
}

function WorkflowRunsTable({
    data,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
    workflow_id,
    isDataLoading,
}: IWorkflowRunsTableProps) {
    const workflow_runs = useMemo(() => data?.workflow_runs ?? [], [data]);
    const { organizationName, repositoryName } = useParams();
    const { isLoading, dispatch_workflow } = useDispatchWorkflow(
        organizationName as string,
        repositoryName as string,
    );
    const { data: repo } = useGetRepository(
        organizationName as string,
        repositoryName as string,
    );
    const { data: branches } = useGetBranches(
        organizationName as string,
        repositoryName as string,
    );

    const [branch, setBranch] = useState(repo?.default_branch ?? '');

    const table = useReactTable({
        data: workflow_runs,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handle_dispatch_button_click = () => {
        dispatch_workflow({
            workflow_id,
            branch,
        });
    };

    useEffect(() => {
        setBranch(repo?.default_branch ?? '');
    }, [repo]);

    return (
        <Card className="h-full w-full overflow-hidden">
            <CardHeader className="flex flex-row-reverse items-center justify-between p-3">
                <Button
                    isLoading={isLoading}
                    onClick={handle_dispatch_button_click}
                >
                    Dispatch
                </Button>
                <SelectMenu value={branch} onValueChange={setBranch}>
                    {branches?.map((branch) => (
                        <SelectItem key={branch.name} value={branch.name}>
                            {branch.name}
                        </SelectItem>
                    ))}
                </SelectMenu>
            </CardHeader>
            <CardBody className="max-h-[600px] overflow-auto p-0">
                <DataTable table={table} />
            </CardBody>
            <CardFooter className="p-3 shadow-2xl shadow-black">
                <TablePagination
                    rowsPerPage={perPage}
                    count={data?.total_count ?? workflow_runs.length}
                    page={currentPage}
                    onPageChange={setCurrentPage}
                    onRowsPerPageChange={setPerPage}
                    isLoading={isDataLoading}
                />
            </CardFooter>
        </Card>
    );
}

export default WorkflowRunsTable;
