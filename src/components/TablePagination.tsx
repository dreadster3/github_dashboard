import Pagination from './core/Pagination';
import DataTableItemsPerPage from './table_navigation/DataTableItemsPerPage';

interface ITablePaginationProps {
    rowsPerPageOptions?: number[];
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (newRowsPerPage: number) => void;
    isLoading?: boolean;
}

const TablePagination = ({
    rowsPerPageOptions,
    count,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    isLoading,
}: ITablePaginationProps) => {
    const handle_per_page_change = (newRowsPerPage: number) => {
        onRowsPerPageChange(newRowsPerPage);
        onPageChange(1);
    };

    return (
        <div className="flex items-center">
            <div className="basis-1/3 self-start text-xs text-ctp-text">
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
                setPerPage={handle_per_page_change}
            />
        </div>
    );
};

export default TablePagination;
