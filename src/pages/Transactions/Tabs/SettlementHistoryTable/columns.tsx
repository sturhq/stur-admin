import React, {useEffect, useMemo} from 'react';
import {Badge} from '@/components/ui/badge';
import {ColumnDef} from '@tanstack/react-table';
import {TableColumnHeader} from '@/components/organisms/GenericTable/TableColumnHeader';
import {nigerianCurrencyFormat} from '@/lib/utils';
import {useIsMobile} from '@/hooks/use-mobile';
// import {MobileSettlementTable} from '../Mobile/MobileSettlementTable';
import emptyStateImage from '@/assets/images/transactionEmptyState.svg';
import {z} from 'zod';
import {GenericTable} from '@/components/organisms/GenericTable';
import SettlementSummaryCards from '../../SettlementSummaryCards';

// Define schema for table data validation
export const settlementTableSchema = z.object({
  _id: z.string(),
  accountName: z.string(),
  type: z.enum(['settlement', 'payout', 'refund']),
  dateTime: z.string(),
  amount: z.number(),
  status: z.enum(['successful', 'failed', 'pending']),
});

type SettlementTableType = z.infer<typeof settlementTableSchema>;

export const columns: ColumnDef<SettlementTableType>[] = [
  {
    accessorKey: 'accountName',
    header: ({column}) => (
      <TableColumnHeader column={column} title="ACCOUNT NAME" />
    ),
    cell: ({row}) => (
      <span className="font-medium mr-[18rem]">
        {row.original.accountName}
      </span>
    ),
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
    accessorKey: 'dateTime',
    header: ({column}) => (
      <TableColumnHeader column={column} title="DATETIME" />
    ),
    cell: ({row}) => row.original.dateTime,
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
  settlements: SettlementTableType[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  refetch: () => void;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
};

const AllSettlements = ({
  settlements,
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

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <React.Fragment>
    
      {isMobile ? (
        // <MobileSettlementTable
        //   className="mt-4 mb-16"
        //   data={settlements || []}
        //   isLoading={isLoading}
        //   totalPages={totalPages}
        //   onPageChange={onPageChange}
        //   pageSize={pageSize}
        //   hasNextPage={hasNextPage}
        //   currentPage={page}
        //   hasPrevPage={hasPrevPage}
        //   columns={columns}
        //   emptyState={{
        //     title: 'No Settlements Yet',
        //     description: 'All settlements will be displayed here',
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
          data={settlements || []}
          columns={columns}
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

export default AllSettlements;
