import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../constants/icons';

interface ISearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: ISearchBarProps) {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 -top-1 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon
                    className="text-gray-400"
                    icon={icons.s_search}
                />
            </div>
            <input
                type="text"
                className="block bg-white rounded-full border p-1 pl-9 text-sm focus:ring-blue-500 focus:ring-2 focus:outline-none focus:ring-inset"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search..."
            />
        </div>
    );
}

export default SearchBar;
