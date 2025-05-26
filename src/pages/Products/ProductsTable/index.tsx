import React from 'react';
import {columns} from './columns';
import {GenericTable} from '@/components/organisms/GenericTable';
import {TableToolbar} from './table-toolbar';
import { useNavigate } from 'react-router-dom';

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

const ProductTable = () => {
    const navigate = useNavigate();
  const {
    data: productData,
    pagination: {page, limit, totalPages, hasNextPage, hasPrevPage},
  } = data;
  const handleRowClick = row => {
    navigate(`/products/product-detail/${row._id}`);
  };
  return (
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
      onRowClick={handleRowClick}
      emptyState={{
        title: 'No Products Found',
        description: 'There are no products available at the moment.',
        action: <button>Add Product</button>,
      }}
      customToolbar={<TableToolbar />}
    />
  );
};

export default ProductTable;
