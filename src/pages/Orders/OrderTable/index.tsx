import React, {useEffect, useState} from 'react';
import {columns} from './columns';
import {GenericTable} from '@/components/organisms/GenericTable';
import {TableToolbar} from './table-toolbar';
import {useNavigate} from 'react-router-dom';
import {useGetOrders} from '@/services/orders.service';

const OrderTable = () => {
  const navigate = useNavigate();
  const limit = 20;
  const [page, setPage] = useState(1);

  const {data, isLoading, refetch} = useGetOrders(page, limit);
  const orders = data?.data || [];
  const pagination = data?.pagination || {
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };
  const {totalPages, hasNextPage, hasPrevPage} = pagination;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);
  return (
    <GenericTable
      data={orders || []}
      columns={columns}
      pageSize={limit}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      showPagination
      isLoading={isLoading}
      className="!mt-0"
      emptyState={{
        title: 'No orders yet',
        description: 'All orders will be displayed here',
      }}
      customToolbar={<TableToolbar />}
      onRowClick={row => {
        navigate(`/order/summary/${row?._id}`);
      }}
    />
  );
};

export default OrderTable;
