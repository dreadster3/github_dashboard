import SelectMenu, { SelectItem } from './Select.tsx';

interface IDataTableItemsPerPageProps {
    perPage: number;
    setPerPage: (perPage: number) => void;
    className?: string;
    disabled?: boolean;
}

function DataTableItemsPerPage({
    perPage,
    setPerPage,
    className,
    disabled,
}: IDataTableItemsPerPageProps) {
    return (
        <div className={className}>
            <div className="flex flex-row-reverse w-full">
                <SelectMenu
                    disabled={disabled}
                    className="bg-white"
                    defaultValue={perPage.toString()}
                    onValueChange={(value) => setPerPage(parseInt(value))}
                >
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                </SelectMenu>
            </div>
        </div>
    );
}

export default DataTableItemsPerPage;
