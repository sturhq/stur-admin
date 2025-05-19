import React, {useState} from 'react';
import {Table} from '@tanstack/react-table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

import {X} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

    // Filter on stur Name
    table.getColumn('title')?.setFilterValue(value);
  };

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between py-6 px-1 gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by product name..."
          value={nameFilter}
          onChange={handleNameFilterChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <Select
          onValueChange={value =>
            table.getColumn('status')?.setFilterValue(value || undefined)
          }
          value={
            (table.getColumn('status')?.getFilterValue() as string) ??
            undefined
          }
        >
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="out-of-stock">Out of stock</SelectItem>
          </SelectContent>
        </Select>

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
    </div>
  );
}
