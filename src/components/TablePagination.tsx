import Pagination from './core/Pagination';
import DataTableItemsPerPage from './table_navigation/DataTableItemsPerPage';

interface ITablePaginationProps {
    rowsPerPageOptions?: number[];
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (newPage: number) => void;
    OnRowsPerPageChange: (newRowsPerPage: number) => void;
    isLoading?: boolean;
}

const TablePagination = ({
    rowsPerPageOptions,
    count,
    page,
    rowsPerPage,
    onPageChange,
    OnRowsPerPageChange,
    isLoading,
}: ITablePaginationProps) => {
    return (
        <div className="flex items-center pt-2">
            <div className="self-start text-xs text-ctp-text basis-1/3">
                Showing {1 * (page - 1) + 1}-
                {Math.min(page * rowsPerPage, count)} of {count} results
            </div>
            <Pagination
                className="basis-1/3"
                totalPages={Math.ceil(count / rowsPerPage)}
                currentPage={page}
                setCurrentPage={onPageChange}
            />
            <DataTableItemsPerPage
                disabled={isLoading}
                className="basis-1/3"
                perPage={rowsPerPage}
                options={rowsPerPageOptions}
                setPerPage={OnRowsPerPageChange}
            />
        </div>
    );
};

export default TablePagination;
