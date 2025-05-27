import React, {useEffect, useState} from 'react';
import {columns} from './columns';
import {GenericTable} from '@/components/organisms/GenericTable';
import {TableToolbar} from './table-toolbar';
import {useNavigate} from 'react-router-dom';
import {useUser} from '@/hooks/useUser';
import {useGetProducts} from '@/services/products.service';

const data = {
  data: [
    {
      _id: '1',
      previewMedia: 'jollof-rice.jpg',
      title: 'Jollof rice',
      category: 'Food',
      menu: 'Main dishes',
      stockQuantity: 1,
      status: 'published',
      price: 67000,
    },
    {
      _id: '2',
      previewMedia: 'shoes.jpg',
      title: 'Shoes',
      category: 'Footwear',
      menu: 'Men',
      stockQuantity: 23,
      status: 'published',
      price: 67000,
    },
    {
      _id: '3',
      previewMedia: 'shoes.jpg',
      title: 'Shoes',
      category: 'Footwear',
      menu: 'Women',
      stockQuantity: 23,
      status: 'out-of-stock',
      price: 67000,
    },
    {
      _id: '4',
      previewMedia: 'makeup-kit.jpg',
      title: 'Make up kit',
      category: 'Fashion',
      menu: 'Beauty',
      stockQuantity: 23,
      status: 'unpublished',
      price: 67000,
    },
    {
      _id: '5',
      previewMedia: 'flower-plant.jpg',
      title: 'Flower Plant',
      category: 'Home Deco',
      menu: 'Gardening',
      stockQuantity: 1,
      status: 'draft',
      price: 7000,
    },
  ],
  pagination: {
    total: 5,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

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
      emptyState={{
        title: 'No Products Found',
        description: 'There are no products available at the moment.',
      }}
    />
  );
};

export default ProductsTable;
