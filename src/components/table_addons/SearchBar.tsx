import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../constants/icons';

interface ISearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: ISearchBarProps) {
    return (
        <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FontAwesomeIcon
                    className="text-gray-400 dark:text-neutral-200"
                    icon={icons.s_search}
                />
            </div>
            <input
                type="text"
                className="block p-1 pl-9 text-sm bg-white rounded-full dark:ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:outline-none border-neutral-700 dark:text-neutral-200 dark:ring-neutral-400 dark:ring-[0.5px] dark:bg-neutral-900"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search..."
            />
        </div>
    );
}

export default SearchBar;
