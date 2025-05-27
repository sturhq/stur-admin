import React, {useEffect} from 'react';
import {Badge} from '@/components/ui/badge';
import {ColumnDef} from '@tanstack/react-table';
import {TableColumnHeader} from '@/components/organisms/GenericTable/TableColumnHeader';
import {nigerianCurrencyFormat} from '@/lib/utils';
import {useNavigate} from 'react-router-dom';
import {useIsMobile} from '@/hooks/use-mobile';
import {z} from 'zod';
import {GenericTable} from '@/components/organisms/GenericTable';
import {BoxIcon, Truck} from 'lucide-react';

// Define types for nested objects
type Customer = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
};

type Vendor = {
  _id: string;
  name: string;
};

export const orderTableSchema = z.object({
  _id: z.string(),
  customer: z.object({
    _id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  }),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
    })
  ),
  vendor: z.object({
    _id: z.string(),
    name: z.string(),
  }),
  totalAmount: z.number(),
  status: z.enum(['pending', 'completed']),
  deliveryStatus: z.enum(['pending', 'out-for-delivery', 'delivered']),
});

type OrderTableType = z.infer<typeof orderTableSchema>;

const renderStatusVariant = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'confirmed':
      return 'info';
    case 'completed':
      return 'positive';
    case 'cancelled':
      return 'negative';
    default:
      return 'info';
  }
};

const renderDeliveryVariant = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'out_for_delivery':
      return 'warning';
    case 'delivered':
      return 'positive';
    default:
      return 'info';
  }
};

export const columns: ColumnDef<OrderTableType>[] = [
  {
    accessorKey: 'customer',
    header: ({column}) => (
      <TableColumnHeader column={column} title="CUSTOMER" />
    ),
    cell: ({row}) => (
      <span className="font-medium">
        {row.original.customer?.firstName || 'Unknown'}{' '}
        {row.original.customer?.lastName || ''}
      </span>
    ),
  },
  {
    accessorKey: 'total',
    header: ({column}) => (
      <TableColumnHeader column={column} title="TOTAL" />
    ),
    cell: ({row}) => <span>{row.original.items?.length}</span>,
  },
  {
    accessorKey: 'vendor',
    header: ({column}) => (
      <TableColumnHeader column={column} title="VENDOR" />
    ),
    cell: ({row}) => (
      <span>{row.original.vendor?.name || 'Unknown Vendor'}</span>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({column}) => (
      <TableColumnHeader column={column} title="AMOUNT" />
    ),
    cell: ({row}) => nigerianCurrencyFormat(row.original.totalAmount),
  },
  {
    accessorKey: 'status',
    header: ({column}) => (
      <TableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({row}) => {
      const status = row.original.status;
      const deliveryStatus = row.original.deliveryStatus;

      return (
        <div className="flex items-center gap-2">
          <Badge
            variant={renderStatusVariant(status)}
            className="flex gap-[0.25rem] items-center"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <BoxIcon size={13} />
          </Badge>
          <Badge variant={renderDeliveryVariant(deliveryStatus)}>
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
    navigate(`/orders/order-detail/${row._id}`);
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <React.Fragment>
      {isMobile ? (
        <div className="mt-4 mb-16">
          <p>Mobile view</p>
        </div>
      ) : (
        <GenericTable
          className="!mt-0 !space-y-0"
          data={orders || []}
          columns={columns}
          onRowClick={handleRowClick}
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          onPageChange={onPageChange}
          isLoading={isLoading}
          emptyState={{
            title: 'No Orders Found',
            description: 'There are no orders to display at this time.',
          }}
        />
      )}
    </React.Fragment>
  );
};

export default AllOrders;
