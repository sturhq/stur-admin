import {GenericTable} from '@/components/organisms/GenericTable';
import {useUser} from '@/hooks/useUser';
import {useGetProducts} from '@/services/products.service';
import React, {useEffect, useState} from 'react';
import {TableToolbar} from './table-toolbar';
import {columns} from './columns';
import {useNavigate} from 'react-router-dom';

const ProductsTable = () => {
  const navigate = useNavigate();
  const {userData} = useUser();
  const limit = 20;
  const [page, setPage] = useState(1);
  const {data, isLoading, refetch} = useGetProducts(
    page,
    limit,
    userData?.store?._id
  );
  const products = data?.data || [];
  const hasNextPage = data?.pagination.hasNextPage;
  const hasPrevPage = data?.pagination.hasPrevPage;
  const totalPages = data?.pagination.totalPages;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const handleRowClick = row => {
    navigate(`/products/product-detail/${row._id}`);
  };

  return (
    <GenericTable
      columns={columns}
      data={products || []}
      isLoading={isLoading}
      currentPage={page}
      totalPages={totalPages}
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      onPageChange={handlePageChange}
      onRowClick={handleRowClick}
      customToolbar={<TableToolbar />}
    />
  );
};

export default ProductsTable;
