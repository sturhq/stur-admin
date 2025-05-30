import React, {useState} from 'react';
import {Table} from '@tanstack/react-table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {ArrowUpLeft, Search, X} from 'lucide-react';
import {TableViewOptions} from '@/components/organisms/GenericTable/TableViewOptions';

interface TableToolbarProps<TData> {
  table?: Table<TData>;
}

export function TableToolbar<TData>({table}: TableToolbarProps<TData>) {
  const [nameFilter, setNameFilter] = useState('');

  // Only process if table is available
  if (!table) return null;

  // Apply name filter to the table
  const handleNameFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setNameFilter(value);

    // Filter on account name
    table.getColumn('accountName')?.setFilterValue(value);
  };

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between py-6 px-1 gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <div className="flex items-center border rounded-[0.475rem] px-[0.5rem]">
          <Search size={16} />
          <Input
            placeholder="Search by account name..."
            value={nameFilter}
            onChange={handleNameFilterChange}
            className="h-8 w-[150px] lg:w-[250px] border-none focus:outline-none focus:ring-0 focus:border-none"
          />
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <TableViewOptions table={table} />
      <Button
        variant="outline"
        size="sm"
        className="ml-auto hidden h-8 lg:flex"
      >
        <ArrowUpLeft className=" h-[0.5625rem] w-[0.5625rem]" />
        Export
      </Button>
    </div>
  );
}
