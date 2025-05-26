import React, {useEffect, useMemo} from 'react';
import {Badge} from '@/components/ui/badge';
import {ColumnDef} from '@tanstack/react-table';
import {TableColumnHeader} from '@/components/organisms/GenericTable/TableColumnHeader';
import {nigerianCurrencyFormat} from '@/lib/utils';
import {useNavigate} from 'react-router-dom';
import {useIsMobile} from '@/hooks/use-mobile';
// import {MobileTransactionTable} from '../Mobile/MobileTransactionTable';
import emptyStateImage from '@/assets/images/transactionEmptyState.svg';
import {z} from 'zod';
import {GenericTable} from '@/components/organisms/GenericTable';
import TransactionsSummaryCards from '../../TransactionsSummaryCards';

// Define schema for table data validation
export const transactionTableSchema = z.object({
  _id: z.string(),
  customer: z.string(),
  orderId: z.string(),
  dateTime: z.string(),
  type: z.string(),
  source: z.string(),
  amount: z.number(),
  status: z.enum(['successful', 'failed', 'pending']),
});

type TransactionTableType = z.infer<typeof transactionTableSchema>;

export const columns: ColumnDef<TransactionTableType>[] = [
  {
    accessorKey: 'customer',
    header: ({column}) => (
      <TableColumnHeader column={column} title="SUMMARY" />
    ),
    cell: ({row}) => (
      <span className="font-medium">{row.original.customer}</span>
    ),
  },
  {
    accessorKey: 'orderId',
    header: ({column}) => (
      <TableColumnHeader column={column} title="ORDER ID" />
    ),
    cell: ({row}) => <span>{row.original.orderId || '-'}</span>,
  },
  {
    accessorKey: 'dateTime',
    header: ({column}) => (
      <TableColumnHeader column={column} title="DATETIME" />
    ),
    cell: ({row}) => row.original.dateTime,
  },
  {
    accessorKey: 'type',
    header: ({column}) => (
      <TableColumnHeader column={column} title="TYPE" />
    ),
    cell: ({row}) => (
      <span className="capitalize">{row.original.type}</span>
    ),
  },
  {
    accessorKey: 'source',
    header: ({column}) => (
      <TableColumnHeader column={column} title="SOURCE" />
    ),
    cell: ({row}) => (
      <span className="uppercase">
        {row.original.source === 'pos' ? 'POS' : row.original.source}
      </span>
    ),
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
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === 'successful'
              ? 'positive'
              : status === 'pending'
                ? 'warning'
                : 'negative'
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
];

type Props = {
  transactions: TransactionTableType[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  refetch: () => void;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
};

const AllTransactions = ({
  transactions,
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

  const handleRowClick = (row: TransactionTableType) => {
    navigate(`/transactions/transaction-detail/${row._id}`);
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <React.Fragment>
   
      {isMobile ? (
        // <MobileTransactionTable
        //   className="mt-4 mb-16"
        //   data={transactions || []}
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
        //     title: 'No Transactions Yet',
        //     description: 'All transactions will be displayed here',
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
          className="mt-4"
          data={transactions || []}
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

export default AllTransactions;
