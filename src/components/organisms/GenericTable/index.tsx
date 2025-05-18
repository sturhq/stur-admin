import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {Spinner} from '@/components/ui/spinner';
import React from 'react';
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area';
import {Pagination} from './Pagination';

interface GenericTableProps<T, TValue> {
  data: T[];
  columns: ColumnDef<T, TValue>[];
  // Optional props for additional customization
  onRowClick?: (row: T) => void;
  pageSize?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  className?: string;
  emptyState?: EmptyStateProps;
  isLoading?: boolean;
  showPagination?: boolean;
  customToolbar?: React.ReactNode;
}

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  imageSrc?: React.ReactNode;
}

const EmptyState = ({
  title,
  description,
  action,
  imageSrc,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center space-y-3 py-20">
    {imageSrc && <div className="mb-[0.813rem]">{imageSrc}</div>}

    <h1 className="text-xl font-bold !mt-0">{title}</h1>
    <p className="text-sm text-[#30313D] text-center !mt-1.5">
      {description}
    </p>
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export function GenericTable<T, TValue>({
  data,
  columns,
  onRowClick,
  className,
  showPagination = true,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  emptyState,
  hasNextPage,
  hasPrevPage,

  customToolbar,
}: GenericTableProps<T, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  if (data.length === 0 && !isLoading) {
    return (
      <EmptyState
        title={emptyState?.title || 'No data available'}
        description={
          emptyState?.description || 'There are no records to display'
        }
        action={emptyState?.action}
        imageSrc={emptyState?.imageSrc}
      />
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <ScrollArea className="w-full max-sm:w-[22.5rem] whitespace-nowrap">
          {customToolbar &&
            React.cloneElement(customToolbar as React.ReactElement, {
              table,
            })}
          <Table className={className}>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick && onRowClick(row.original)}
                  className={
                    onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''
                  }
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            {showPagination && (
              <Pagination
                columns={columns}
                currentPage={currentPage || 1}
                totalPages={totalPages || 1}
                onPageChange={onPageChange || (() => {})}
                hasNextPage={hasNextPage || false}
                hasPrevPage={hasPrevPage || false}
              />
            )}
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
}
