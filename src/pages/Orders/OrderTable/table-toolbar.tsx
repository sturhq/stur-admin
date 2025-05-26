import React, {useState} from 'react';
import {Table} from '@tanstack/react-table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {ArrowUpLeft, Plus, Search, TriangleAlert, X} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {TableViewOptions} from '@/components/organisms/GenericTable/TableViewOptions';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {Alert} from '@/components/ui/alert';

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

    // Filter on product title
    table.getColumn('title')?.setFilterValue(value);
  };

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between pb-6 px-1 gap-2">
      <div className="flex flex-1 items-center space-x-2">
        {/* <Search size={16} /> */}
        <Tabs
          defaultValue="all"
          className="w-full  "
          // onValueChange={handleTabChange}
          // value={tab}
        >
          <TabsList className=" p-1 h-12 rounded-lg gap-4 flex">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[#30313D] data-[state=active]:text-[#FFFFFF] data-[state=active]:border-none text-[#30313D] p-[8px] rounded-[12px] no-underline border "
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="unclaimed"
              className="data-[state=active]:bg-[#30313D] data-[state=active]:text-[#FFFFFF] data-[state=active]:border-none text-[#30313D] p-[8px] border rounded-[12px]"
            >
              Unclaimed stur
            </TabsTrigger>
            <TabsTrigger
              value="claimed"
              className="data-[state=active]:bg-[#30313D] data-[state=active]:text-[#FFFFFF] data-[state=active]:border-none text-[#30313D] p-[8px]  border rounded-[12px]"
            >
              Claimed stur
            </TabsTrigger>
          </TabsList>

          <TabsContent value="claimed" className="">
            <Alert variant="warning" className="mb-4">
              <TriangleAlert size={18} />
              Your store has not been setup yet.
            </Alert>
          </TabsContent>
        </Tabs>

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
      <div className="flex flex-row gap-[8px]">
        <div className="flex items-center border rounded-[0.475rem] px-[0.5rem]">
          <Search size={16} />
          <Input
            placeholder="Search..."
            value={nameFilter}
            onChange={handleNameFilterChange}
            className="h-8 w-[150px] lg:w-[250px] border-none"
          />
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
    </div>
  );
}
