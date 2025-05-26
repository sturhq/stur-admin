import React from 'react';
import {columns} from './columns';
import {GenericTable} from '@/components/organisms/GenericTable';
import {TableToolbar} from './table-toolbar';

const data = {
  data: [
    {
      _id: '1',
      customer: 'Solomon Johnson',
      total: 5,
      vendor: 'Mr. Bigs',
      amount: 67000,
      status: 'pending',
      deliveryStatus: 'pending',
    },
    {
      _id: '2',
      customer: 'Jane John',
      total: 1,
      vendor: 'Shoprite',
      amount: 67000,
      status: 'completed',
      deliveryStatus: 'out-for-delivery',
    },
  ],
  pagination: {
    total: 12,
    page: 1,
    limit: 10,
    totalPages: 2,
    hasNextPage: true,
    hasPrevPage: false,
  },
};

const OrderTable = () => {
  const {
    data: orderData,
    pagination: {page, limit, totalPages, hasNextPage, hasPrevPage},
  } = data;

  return (
    <GenericTable
      data={orderData}
      columns={columns}
      pageSize={limit}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={() => {}}
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      showPagination
      isLoading={false}
      className="!mt-0"
      emptyState={{
        title: 'No Products Found',
        description: 'There are no products available at the moment.',
        action: <button>Add Product</button>,
      }}
      customToolbar={<TableToolbar />}
    />
  );
};

export default OrderTable;
