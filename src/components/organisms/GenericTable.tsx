import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {Button} from '@/components/ui/button';
import {Spinner} from '../ui/spinner';
import React from 'react';
import {ScrollArea, ScrollBar} from '../ui/scroll-area';

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  // Optional props for additional customization
  onRowClick?: (row: T) => void;
  className?: string;
  pageSize?: number;
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  emptyState?: EmptyStateProps;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
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

export function GenericTable<T>({
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
}: GenericTableProps<T>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
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
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          Page {currentPage} of {totalPages}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onPageChange(currentPage - 1)}
                          disabled={!hasPrevPage}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onPageChange(currentPage + 1)}
                          disabled={!hasNextPage}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
}

// Helper function to create columns with less boilerplate
export function createColumns<T>() {
  return createColumnHelper<T>();
}
