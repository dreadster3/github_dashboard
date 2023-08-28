import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavigationButton from './NavigationButton';
import icons from '../constants/icons';
import clsx from 'clsx';

interface IDataTableNavigationProps {
    className?: string;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

function DataTableNavigation({
    className,
    currentPage,
    setCurrentPage,
    totalPages,
}: IDataTableNavigationProps) {
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
        <div className={clsx('flex justify-center gap-4', className)}>
            <NavigationButton
                className="disabled:invisible"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                <FontAwesomeIcon
                    className="text-xl"
                    icon={icons.s_chevron_left}
                />
            </NavigationButton>
            {Array.from(
                { length: last_page - first_page + 1 },
                (_, i) => i + first_page,
            ).map((page) => (
                <NavigationButton
                    key={page}
                    className={clsx(
                        page === currentPage && 'bg-blue-500 text-white',
                    )}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </NavigationButton>
            ))}
            <NavigationButton
                className="disabled:invisible"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                <FontAwesomeIcon
                    className="text-xl"
                    icon={icons.s_chevron_right}
                />
            </NavigationButton>
        </div>
    );
}

export default DataTableNavigation;
