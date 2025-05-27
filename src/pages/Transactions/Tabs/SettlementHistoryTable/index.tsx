import React, {useEffect, useState} from 'react';
import {columns} from './columns';
import {GenericTable} from '@/components/organisms/GenericTable';
import {TableToolbar} from './table-toolbar';
import SettlementSummaryCards from '../../SettlementSummaryCards';
import {useGetSettlement} from '@/services/transactions.service';

export type SETTLEMENT_HISTORY = {
  settlementAccount: {
    accountName: string;
    type: string;
  };
  date: string;
  createdAt: string;
  amount: number;
  status: string;
};

const SettlementHistory = () => {
  const [page, setPage] = useState(1);
  // const isMobile = useIsMobile();
  const limit = 20;

  // const columnHelper = createColumns<SETTLEMENT_HISTORY>();
  const {data, isLoading, refetch} = useGetSettlement(page, limit);

  const settlements = data?.data?.data || [];

  const hasNextPage = data?.data?.pagination?.hasNextPage;
  const hasPrevPage = data?.data?.pagination?.hasPrevPage;
  const totalPages = data?.data?.pagination?.totalPages;
  const summary = data?.data?.summary || {};

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <React.Fragment>
      {' '}
      <div>
        <SettlementSummaryCards summary={summary} isLoading={isLoading} />
        <GenericTable
          data={settlements || []}
          columns={columns}
          isLoading={isLoading}
          pageSize={limit}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          showPagination
          emptyState={{
            title: 'No settlement history',
            description: 'You have no settlement history yet.',
          }}
          customToolbar={<TableToolbar />}
        />
      </div>
    </React.Fragment>
  );
};

export default SettlementHistory;
