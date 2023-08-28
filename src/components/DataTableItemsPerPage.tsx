import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../constants/icons';
import clsx from 'clsx';

interface IDataTableItemsPerPageProps {
    perPage: number;
    setPerPage: (perPage: number) => void;
    className?: string;
}

function DataTableItemsPerPage({
    perPage,
    setPerPage,
    className,
}: IDataTableItemsPerPageProps) {
    return (
        <div className={clsx('flex flex-row-reverse', className)}>
            <div className="w-10">
                <span className="pointer-events-none absolute px-[1.6rem] py-1 flex items-center text-sm">
                    <FontAwesomeIcon icon={icons.s_chevron_down} />
                </span>
                <select
                    value={perPage}
                    className="w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 peer"
                    onChange={(evt) => setPerPage(parseInt(evt.target.value))}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
}

export default DataTableItemsPerPage;
