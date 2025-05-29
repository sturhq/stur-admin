import React from 'react';
import {columns} from './columns';
import {GenericTable} from '@/components/organisms/GenericTable';
import {TableToolbar} from './table-toolbar';
import {useNavigate} from 'react-router-dom';

export type StoreData = {
  _id: string;
  userId: string;
  storeName: string;
  category: string;
  phone: string;
  storeUrl: string;
  status: 'completed' | 'pending' | 'blocked';
  plan: 'premium' | 'standard';
};

export interface TableProps {
  tableData: StoreData[];
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

const StoreTable = ({
  tableData,
  isLoading,
  pagination,
  page,
  setPage,
  limit,
}: TableProps) => {
  const navigate = useNavigate();
  const {totalPages, hasNextPage, hasPrevPage} = pagination;
  const storeData = tableData || [];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowClick = (row: StoreData) => {
    navigate(`/stores/${row._id}?userId=${row.userId}`);
  };

  return (
    <GenericTable
      data={storeData || []}
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
      emptyState={{
        title: 'No Stores Found',
        description: 'There are no stores available at the moment.',
      }}
      customToolbar={<TableToolbar />}
    />
  );
};

export default StoreTable;
