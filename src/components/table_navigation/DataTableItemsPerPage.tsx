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
            <div className="flex w-full flex-row-reverse">
                <SelectMenu
                    disabled={disabled}
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
