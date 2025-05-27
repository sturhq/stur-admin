import React, {useEffect, useState} from 'react';
import {columns} from './columns';
import {GenericTable} from '@/components/organisms/GenericTable';
import {TableToolbar} from './table-toolbar';
import TransactionsSummaryCards from '../../TransactionsSummaryCards';
import {useGetTransactions} from '@/services/transactions.service';
import {useUser} from '@/hooks/useUser';
import {TransactionsSummaryModal} from '../../TransactionsSummaryModal';
export type TRANSACTIONTYPE = {
  _id: string;
  authorization: {
    senderName: string;
    senderBank: string;
    senderAccount: string;
  };

  orderId: string;
  createdAt: string;
  type: string;
  channel: string;
  amount: number;
  status: string;
  transactionId: string;
};

const AllTransactions = () => {
  const [open, setOpen] = useState(false);
  // const isMobile = useIsMobile();
  const [selectedTransaction, setSelectedTransaction] =
    useState<TRANSACTIONTYPE | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const {userData} = useUser();
  const storeId = userData?.store?._id;
  const {data, isLoading, refetch} = useGetTransactions(
    page,
    limit,
    storeId,
    null,
    null
  );

  const transactions = data?.data?.data || [];

  const totalPages = Math.ceil(
    (data?.data?.pagination?.total || 0) / limit
  );

  const hasNextPage = data?.data?.pagination?.hasNextPage;

  const hasPrevPage = data?.data?.pagination?.hasPrevPage;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowClick = (row: TRANSACTIONTYPE) => {
    setSelectedTransaction(row);
    setOpen(true);
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <React.Fragment>
      <div>
        {' '}
        <TransactionsSummaryCards />
        <GenericTable
          data={transactions || []}
          isLoading={isLoading}
          columns={columns}
          pageSize={limit}
          onRowClick={row => handleRowClick(row)}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={() => {}}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          showPagination
          emptyState={{
            title: 'No Transactions Yet',
            description: 'All transactions will be displayed here',
          }}
          customToolbar={<TableToolbar />}
        />
        <TransactionsSummaryModal
          open={open}
          setOpen={setOpen}
          transaction={selectedTransaction}
        />
      </div>
    </React.Fragment>
  );
};

export default AllTransactions;
