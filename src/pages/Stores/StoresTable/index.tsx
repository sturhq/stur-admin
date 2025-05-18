import React from 'react';
import {columns} from './columns';
import {GenericTable} from '@/components/organisms/GenericTable';
import {TableToolbar} from './table-toolbar';

const data = {
  data: [
    {
      storeName: 'Fashion Haven',
      category: 'Clothing',
      phone: '07034567890',
      sturLink: 'www.stur.ng/fashionhaven',
      status: 'completed',
      plan: 'premium',
    },
    {
      storeName: 'Gadget World',
      category: 'Electronics',
      phone: '08012345678',
      sturLink: 'www.stur.ng/gadgetworld',
      status: 'pending',
      plan: 'standard',
    },
    {
      storeName: 'Fresh Foods',
      category: 'Grocery',
      phone: '09087654321',
      sturLink: 'www.stur.ng/freshfoods',
      status: 'completed',
      plan: 'standard',
    },
    {
      storeName: 'Beauty Palace',
      category: 'Cosmetics',
      phone: '07056781234',
      sturLink: 'www.stur.ng/beautypalace',
      status: 'blocked',
      plan: 'premium',
    },
    {
      storeName: 'Book Corner',
      category: 'Books',
      phone: '08023456789',
      sturLink: 'www.stur.ng/bookcorner',
      status: 'pending',
      plan: 'standard',
    },
    {
      storeName: 'Fitness Hub',
      category: 'Sports',
      phone: '09076543210',
      sturLink: 'www.stur.ng/fitnesshub',
      status: 'completed',
      plan: 'premium',
    },
  ],
  pagination: {
    total: 6,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

const StoreTable = () => {
  const {
    data: storeData,
    pagination: {page, limit, totalPages, hasNextPage, hasPrevPage},
  } = data;

  return (
    <GenericTable
      data={storeData}
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
        title: 'No Stores Found',
        description: 'There are no stores available at the moment.',
        action: <button>Add Store</button>,
      }}
      customToolbar={<TableToolbar />}
    />
  );
};

export default StoreTable;
