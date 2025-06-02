import React, {useState} from 'react';
import {Table} from '@tanstack/react-table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {ArrowUpLeft, Search, X} from 'lucide-react';
import {TableViewOptions} from '@/components/organisms/GenericTable/TableViewOptions';
import {
  Tabs,
  // TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {TableFacetedFilter} from '@/components/organisms/GenericTable/TableFacetedFilter';
// import {Alert} from '@/components/ui/alert';

interface TableToolbarProps<TData> {
  table?: Table<TData>;
  claimStatus?: 'Claimed' | 'Unclaimed' | 'All';
  setClaimStatus?: (status: 'Claimed' | 'Unclaimed' | 'All') => void;
}

export function TableToolbar<TData>({
  table,
  claimStatus,
  setClaimStatus,
}: TableToolbarProps<TData>) {
  const [nameFilter, setNameFilter] = useState('');

  // Only process if table is available
  if (!table) return null;

  // Apply name filter to the table
  const handleNameFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setNameFilter(value);

    table.getColumn('storeName')?.setFilterValue(value);
  };

  const isFiltered = table.getState().columnFilters.length > 0;

  const statusOptions = [
    {value: 'active', label: 'Active'},
    {value: 'inactive', label: 'Inactive'},
    {value: 'pending', label: 'Pending'},
    {value: 'blocked', label: 'Blocked'},
  ];

  const handleTabChange = (value: string) => {
    if (setClaimStatus) {
      if (value === 'All') {
        setClaimStatus('All');
      } else if (value === 'Unclaimed') {
        setClaimStatus('Unclaimed');
      } else if (value === 'Claimed') {
        setClaimStatus('Claimed');
      }
    }
  };

  return (
    <div className="flex items-center justify-between pb-6 px-1 gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Tabs
          defaultValue="All"
          className="w-full"
          onValueChange={handleTabChange}
          value={claimStatus}
        >
          <TabsList className=" p-1 h-12 rounded-lg gap-4 flex">
            <TabsTrigger
              value="All"
              className="data-[state=active]:bg-[#30313D] data-[state=active]:text-[#FFFFFF] data-[state=active]:border-none text-[#30313D] p-[8px] rounded-[12px] no-underline border "
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="Unclaimed"
              className="data-[state=active]:bg-[#30313D] data-[state=active]:text-[#FFFFFF] data-[state=active]:border-none text-[#30313D] p-[8px] border rounded-[12px]"
            >
              Unclaimed stur
            </TabsTrigger>
            <TabsTrigger
              value="Claimed"
              className="data-[state=active]:bg-[#30313D] data-[state=active]:text-[#FFFFFF] data-[state=active]:border-none text-[#30313D] p-[8px]  border rounded-[12px]"
            >
              Claimed stur
            </TabsTrigger>
          </TabsList>

          {/* <TabsContent value="claimed" className="">
            <Alert variant="warning" className="mb-4">
              <TriangleAlert size={18} />
              Your store has not been setup yet.
            </Alert>
          </TabsContent> */}
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
            className="h-8 w-[150px] lg:w-[250px] border-none focus:outline-none focus:ring-0 focus:border-none"
          />
        </div>
        {table.getColumn('status') && (
          <TableFacetedFilter
            column={table.getColumn('status')}
            title="Filter Status"
            options={statusOptions}
          />
        )}
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
