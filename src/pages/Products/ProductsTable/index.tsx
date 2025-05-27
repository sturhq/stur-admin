import React, {useEffect, useState} from 'react';
import {columns} from './columns';
import {GenericTable} from '@/components/organisms/GenericTable';
import {TableToolbar} from './table-toolbar';
import {useNavigate} from 'react-router-dom';
import {useUser} from '@/hooks/useUser';
import {useGetProducts} from '@/services/products.service';

type ProductData = {
  _id: string;
  previewMedia: string;
  title: string;
  category: string;
  menu: string;
  stockQuantity: number;
  status: 'published' | 'draft' | 'out-of-stock' | 'unpublished';
  price: number;
};

interface TableProps {
  tableData: ProductData[];
  isLoading: boolean;
  pagination: {
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  page: number;
  setPage: (page: number) => void;
  limit: number;
}

const ProductsTable = ({
  tableData,
  isLoading,
  pagination,
  page,
  setPage,
  limit,
}: TableProps) => {
  const navigate = useNavigate();
  const {totalPages, hasNextPage, hasPrevPage} = pagination;
  const products = tableData || [];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowClick = (row: ProductData) => {
    navigate(`/products/product-detail/${row._id}`);
  };
  return (
    <GenericTable
      data={products || []}
      columns={columns}
      pageSize={limit}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      onRowClick={handleRowClick}
      showPagination
      isLoading={isLoading}
      customToolbar={<TableToolbar />}
      emptyState={{
        title: 'No Products Found',
        description: 'There are no products available at the moment.',
      }}
    />
  );
};

export default ProductsTable;
