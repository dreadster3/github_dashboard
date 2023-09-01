import SelectMenu, { SelectItem } from '../Select.tsx';

interface IDataTableItemsPerPageProps {
    perPage: number;
    setPerPage: (perPage: number) => void;
    className?: string;
    disabled?: boolean;
    options?: number[];
}

function DataTableItemsPerPage({
    perPage,
    setPerPage,
    className,
    disabled,
    options = [10, 25, 50, 100],
}: IDataTableItemsPerPageProps) {
    return (
        <div className={className}>
            <div className="flex flex-row-reverse w-full">
                <SelectMenu
                    disabled={disabled}
                    className="text-gray-200 bg-white dark:shadow-inner dark:border-neutral-600 dark:border-[0.5px] dark:bg-neutral-900 dark:shadow-neutral-700"
                    defaultValue={perPage.toString()}
                    onValueChange={(value: string) =>
                        setPerPage(parseInt(value))
                    }
                >
                    {options.map((option) => (
                        <SelectItem key={option} value={option.toString()}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectMenu>
            </div>
        </div>
    );
}

export default DataTableItemsPerPage;
