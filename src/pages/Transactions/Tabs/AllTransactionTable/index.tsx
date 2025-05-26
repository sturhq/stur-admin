import React from 'react';
import {columns} from './columns';
import {GenericTable} from '@/components/organisms/GenericTable';
import {TableToolbar} from './table-toolbar';
import TransactionsSummaryCards from '../../TransactionsSummaryCards';

const data = {
  data: [
    {
      _id: '1',
      customer: 'Ibrahim Adekunle',
      orderId: 'ID 45271',
      dateTime: '2 Jan 2025; 21:29',
      type: 'Transfer',
      source: 'POS',
      amount: 67000,
      status: 'successful',
    },
    {
      _id: '2',
      customer: 'Solomon Buchi',
      orderId: '-',
      dateTime: '2 Jan 2025; 21:29',
      type: 'Transfer',
      source: 'Terminal',
      amount: 67000,
      status: 'successful',
    },
    // Add more transactions as needed
  ],
  pagination: {
    total: 2,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

const AllTransactions = () => {
  const {
    data: productData,
    pagination: {page, limit, totalPages, hasNextPage, hasPrevPage},
  } = data;

  return (
    <React.Fragment>
      <div>
        {' '}
        <TransactionsSummaryCards />
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

export default AllTransactions;
