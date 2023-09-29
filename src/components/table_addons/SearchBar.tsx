import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface ISearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: ISearchBarProps) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 h-7">
                <MagnifyingGlassIcon className="h-5 w-5 text-ctp-text" />
            </div>
            <input
                type="text"
                className="rounded-full bg-ctp-surface0 p-1 pl-9 text-sm text-ctp-text placeholder:text-ctp-text focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ctp-blue"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search..."
            />
        </div>
    );
}

export default SearchBar;
