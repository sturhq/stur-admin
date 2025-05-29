import PageHeader from '@/common/PageHeader';
import PageHelmet from '@/common/PageHelmet';
import React, {useEffect, useState} from 'react';
import ProductSummaryCard from './ProductSummaryCards';
import {Alert} from '@/components/ui/alert';
import {useUser} from '@/hooks/useUser';
// import {userStatus} from '@/helpers/verification';
import {Plus} from 'lucide-react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import ProductTable from './ProductsTable';
import {useGetProducts} from '@/services/products.service';

const Products = () => {
  const [page, setPage] = React.useState(1);
  const limit = 20; // Define the number of items per page
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {userData} = useUser();
  const [selectedStoreId, setSelectedStoreId] = useState<
    string | undefined
  >();

  const {data, isLoading} = useGetProducts(page, limit, selectedStoreId);
  const statistics = data?.statistics || {};
  const tableData = data?.data || [];
  const pagination = data?.pagination || {
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };

  return (
    <React.Fragment>
      <PageHelmet title="Products" />

      <div className="flex flex-col gap-5 w-full">
        <PageHeader title="Products" />
        <div className="mt-[1.5625rem]">
          <ProductSummaryCard
            statistics={statistics}
            isLoading={isLoading}
          />

          <ProductTable
            tableData={tableData}
            isLoading={isLoading}
            pagination={pagination}
            page={page}
            setPage={setPage}
            limit={limit}
          />
          <div className="hidden max-lg:block fixed bottom-20 right-6 z-50">
            <Button
              className=" rounded-[6.25rem] w-[4rem] h-[4rem] bg-[#5433EB]"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="!size-7" />
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Products;
