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
import {TRANSACTIONTYPE} from '.';
import {dateTimeSemiColon} from '@/lib/dateTimeFormat';

export const columns: ColumnDef<TRANSACTIONTYPE>[] = [
  {
    accessorKey: 'customer',
    header: ({column}) => (
      <TableColumnHeader column={column} title="SUMMARY" />
    ),
    cell: ({row}) => (
      <span className="font-medium">
        {row.original.authorization?.senderName}
      </span>
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
    cell: ({row}) => dateTimeSemiColon(row.original.createdAt),
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
        {row.original.channel === 'pos' ? 'POS' : row.original.type}
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
            row.original.status === 'success' ? 'positive' : 'negative'
          }
        >
          {/* caplitalize */}
          {row.original.status.charAt(0).toUpperCase() +
            row.original.status.slice(1)}
        </Badge>
      );
    },
  },
];

type Props = {
  transactions: TRANSACTIONTYPE[];
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

  const handleRowClick = (row: TRANSACTIONTYPE) => {
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
