import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {Button} from '@/components/ui/button';
import {Spinner} from '../ui/spinner';
import React from 'react';
import {
  nigerianCurrencyFormat,
  renderDeliveryStatusBadge,
  renderPaymentStatusBadge,
  renderStatusBadge,
} from '@/lib/utils';
import {dateTimeSemiColon} from '@/lib/dateTimeFormat';
import {Badge} from '../ui/badge';
import {BoxIcon, CreditCard} from 'lucide-react';
import clsx from 'clsx';

interface GenericTableProps<T> {
  data: any[];
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
  <div className="flex flex-col items-center justify-center space-y-3 py-20 border border-[#EBEEF1] rounded-lg">
    {imageSrc && <div className="mb-[0.813rem]">{imageSrc}</div>}

    <h1 className="text-xl font-bold !mt-0">{title}</h1>
    <p className="text-sm text-[#30313D] text-center !mt-1.5">
      {description}
    </p>
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export function MobileTable<T>({
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
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center border border-[#EBEEF1] rounded-[15px] py-4">
          <Spinner />
        </div>
      ) : (
        <div className="pb-20">
          <div
            className={clsx(
              className,
              'border border-[#EBEEF1] rounded-[15px]'
            )}
          >
            {data?.map((item, i) => {
              const isLast = data?.length - 1 === i;
              return (
                <div
                  key={item.id}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={clsx(
                    'flex items-start justify-between gap-4 px-3 py-4',
                    isLast ? '' : 'border-b border-b-[#EBEEF1]',
                    onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''
                  )}
                >
                  <div>
                    <p className="font-semibold text-sm text-[#30313D]">
                      {item.customer.firstName}
                    </p>
                    <p className="mt-1 mb-2.5 text-sm text-[#6A7383]">
                      {dateTimeSemiColon(item?.createdAt)}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={renderStatusBadge(item.status)}>
                        {/* caplitalize */}
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </Badge>
                      <Badge
                        variant={renderPaymentStatusBadge(
                          item.paymentStatus
                        )}
                        className="flex gap-[0.25rem]"
                      >
                        <p>
                          {/* caplitalize */}
                          {item.paymentStatus.charAt(0).toUpperCase() +
                            item.paymentStatus.slice(1)}
                        </p>
                        <CreditCard size={13} />
                      </Badge>
                      <Badge
                        variant={renderDeliveryStatusBadge(
                          item.deliveryStatus
                        )}
                        className="flex gap-[0.25rem]"
                      >
                        <p>
                          {/* caplitalize */}
                          {item.deliveryStatus === 'out_for_delivery'
                            ? 'Out For Delivery'
                            : item.deliveryStatus
                                .split('_')
                                .map(
                                  word =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1)
                                )
                                .join(' ')}
                        </p>

                        <BoxIcon size={13} />
                      </Badge>
                    </div>
                  </div>
                  <p className="text-[#6A7383] text-sm">
                    {nigerianCurrencyFormat(item.totalAmount)}
                  </p>
                </div>
              );
            })}
          </div>
          {showPagination && (
            <div className="flex items-center justify-between px-2 mt-4">
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
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to create columns with less boilerplate
export function createColumns<T>() {
  return createColumnHelper<T>();
}
