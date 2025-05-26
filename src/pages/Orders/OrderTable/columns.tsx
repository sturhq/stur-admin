import React, {useEffect} from 'react';
import {Badge} from '@/components/ui/badge';
import {ColumnDef} from '@tanstack/react-table';
import {TableColumnHeader} from '@/components/organisms/GenericTable/TableColumnHeader';
import {nigerianCurrencyFormat} from '@/lib/utils';
import {useNavigate} from 'react-router-dom';
import {useIsMobile} from '@/hooks/use-mobile';
// import {MobileOrderTable} from '../Mobile/MobileOrderTable';
import emptyStateImage from '@/assets/images/transactionEmptyState.svg';
import {z} from 'zod';
import {GenericTable} from '@/components/organisms/GenericTable';
import {BoxIcon, Star, Truck} from 'lucide-react';

// Define schema for table data validation
export const orderTableSchema = z.object({
  _id: z.string(),
  customer: z.string(),
  total: z.number(),
  vendor: z.string(),
  amount: z.number(),
  status: z.enum(['pending', 'completed']),
  deliveryStatus: z.enum(['pending', 'out-for-delivery', 'delivered']),
});

type OrderTableType = z.infer<typeof orderTableSchema>;

const renderStatusVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return 'positive';
    case 'pending':
      return 'warning';
    default:
      return 'outline';
  }
};

const renderDeliveryVariant = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'positive';
    case 'out-for-delivery':
      return 'info';
    case 'pending':
      return 'warning';
    default:
      return 'outline';
  }
};

export const columns: ColumnDef<OrderTableType>[] = [
  {
    accessorKey: 'customer',
    header: ({column}) => (
      <TableColumnHeader column={column} title="CUSTOMER" />
    ),
    cell: ({row}) => (
      <span className="font-medium">{row.original.customer}</span>
    ),
  },
  {
    accessorKey: 'total',
    header: ({column}) => (
      <TableColumnHeader column={column} title="TOTAL" />
    ),
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'vendor',
    header: ({column}) => (
      <TableColumnHeader column={column} title="VENDOR" />
    ),
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'amount',
    header: ({column}) => (
      <TableColumnHeader column={column} title="AMOUNT" />
    ),
    cell: ({row}) => nigerianCurrencyFormat(row.original.amount),
  },
  {
    accessorKey: 'status',
    header: ({column}) => (
      <TableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({row}) => {
      const status = row.original.status as 'pending' | 'completed';
      const deliveryStatus = row.original.deliveryStatus as
        | 'pending'
        | 'out-for-delivery'
        | 'delivered';

      return (
        <div className="flex items-center gap-2">
          <Badge
            variant={status === 'completed' ? 'positive' : 'warning'}
            className="flex gap-[0.25rem] items-center"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <BoxIcon size={13} />
          </Badge>
          <Badge
            variant={
              deliveryStatus === 'delivered'
                ? 'positive'
                : deliveryStatus === 'out-for-delivery'
                  ? 'warning'
                  : 'warning'
            }
          >
            <span className="flex gap-[0.25rem] items-center">
              {deliveryStatus === 'out-for-delivery'
                ? 'Out for delivery'
                : deliveryStatus.charAt(0).toUpperCase() +
                  deliveryStatus.slice(1)}
              {(deliveryStatus === 'out-for-delivery' ||
                deliveryStatus === 'delivered') && <Truck size={13} />}
              {(deliveryStatus === 'pending' ||
                deliveryStatus === 'delivered') && <BoxIcon size={13} />}
            </span>
          </Badge>
        </div>
      );
    },
  },
];

type Props = {
  orders: OrderTableType[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  refetch: () => void;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
};

const AllOrders = ({
  orders,
  isLoading,
  page,
  totalPages,
  refetch,
  pageSize,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}: Props) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleRowClick = (row: OrderTableType) => {
    // gaRecordEvent('ORDER', 'order_clicked');
    navigate(`/orders/order-detail/${row._id}`);
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <React.Fragment>
      {isMobile ? (
        // <MobileOrderTable
        //   className="mt-4 mb-16"
        //   data={orders || []}
        //   isLoading={isLoading}
        //   totalPages={totalPages}
        //   onPageChange={onPageChange}
        //   pageSize={pageSize}
        //   hasNextPage={hasNextPage}
        //   currentPage={page}
        //   hasPrevPage={hasPrevPage}
        //   columns={columns}
        //   onRowClick={handleRowClick}
        //   emptyState={{
        //     title: 'No Orders Yet',
        //     description: 'All orders will be displayed here',
        //     imageSrc: (
        //       <img
        //         src={emptyStateImage}
        //         alt="Empty State"
        //         className="w-[6rem] object-cover"
        //       />
        //     ),
        //   }}
        // />
        <div></div>
      ) : (
        <GenericTable
          className="!mt-0 !space-y-0"
          data={orders || []}
          columns={columns}
          onRowClick={row => handleRowClick(row)}
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      )}
    </React.Fragment>
  );
};

export default AllOrders;
