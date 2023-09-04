import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { IconButton } from '@material-tailwind/react';
import clsx from 'clsx';
import Button from './Button';

interface IPaginationProps {
    className?: string;
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

function Pagination({
    totalPages,
    currentPage,
    setCurrentPage,
    className,
}: IPaginationProps) {
    let first_page = Math.max(1, currentPage - 1);
    let last_page = Math.min(totalPages, currentPage + 1);
    const pages_to_show = 3;

    if (last_page - first_page + 1 < pages_to_show) {
        if (first_page > 1) {
            first_page -= 1;
        }
        if (last_page < totalPages) {
            last_page += 1;
        }
    }

    return (
        <div className={clsx('flex justify-center', className)}>
            <Button
                variant="text"
                color="blue"
                size="sm"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 1}
                className={clsx(currentPage === 1 && 'opacity-50')}
            >
                <ChevronLeftIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
            {Array.from(
                { length: last_page - first_page + 1 },
                (_, i) => i + first_page,
            ).map((page) => (
                <IconButton
                    variant={currentPage === page ? 'filled' : 'text'}
                    className="rounded-full"
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </IconButton>
            ))}
            <Button
                variant="text"
                color="blue"
                size="sm"
                className={clsx(currentPage === totalPages && 'opacity-50')}
                disabled={currentPage === totalPages}
                onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
            >
                <ChevronRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
        </div>
    );
}

export default Pagination;
