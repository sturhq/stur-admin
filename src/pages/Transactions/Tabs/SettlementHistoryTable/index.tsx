import React from 'react';
import {columns} from './columns';
import {GenericTable} from '@/components/organisms/GenericTable';
import {TableToolbar} from './table-toolbar';
import SettlementSummaryCards from '../../SettlementSummaryCards';

const data = {
  data: [
    {
      _id: '1',
      accountName: 'Merchant account name',
      type: 'settlement',
      dateTime: '2 Jan 2025; 21:29',
      amount: 67000,
      status: 'successful',
    },
    {
      _id: '2',
      accountName: 'Merchant account name',
      type: 'settlement',
      dateTime: '2 Jan 2025; 21:29',
      amount: 67000,
      status: 'successful',
    },
    {
      _id: '3',
      accountName: 'Merchant account name',
      type: 'settlement',
      dateTime: '2 Jan 2025; 21:29',
      amount: 67000,
      status: 'successful',
    },
  ],
  pagination: {
    total: 3,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

const SettlementHistory = () => {
  const {
    data: productData,
    pagination: {page, limit, totalPages, hasNextPage, hasPrevPage},
  } = data;

  return (
    <React.Fragment>
      {' '}
      <div>
        <SettlementSummaryCards />
        <GenericTable
          data={productData}
          columns={columns}
          pageSize={limit}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={() => {}}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          showPagination
          isLoading={false}
          emptyState={{
            title: 'No Products Found',
            description: 'There are no products available at the moment.',
            action: <button>Add Product</button>,
          }}
          customToolbar={<TableToolbar />}
        />
      </div>
    </React.Fragment>
  );
};

export default SettlementHistory;
