import PageHeader from '@/common/PageHeader';
import PageHelmet from '@/common/PageHelmet';


import React, {useEffect, useState} from 'react';
import ProductSummaryCard from './ProductSummaryCards';

import {Alert} from '@/components/ui/alert';
import {useUser} from '@/hooks/useUser';
// import {userStatus} from '@/helpers/verification';
import {Plus, TriangleAlert} from 'lucide-react';
import {useGetProducts} from '@/services/products.service';

import NoProducts from './NoProducts';

import {useSearchParams} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import ProductTable from './ProductsTable';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get('tab') || 'all');
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialLimit = parseInt(searchParams.get('limit') || '10', 10);
  const [page, setPage] = useState(initialPage);
  const limit = initialLimit;
  const {userData} = useUser();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Use the page and limit from state (which comes from URL) for API call
  const {data, isLoading, refetch} = useGetProducts(
    page,
    limit,
    userData?.store?._id
  );

  const hasNextPage = data?.data?.pagination?.hasNextPage;
  const hasPrevPage = data?.data?.pagination?.hasPrevPage;
  const totalPages = data?.data?.pagination?.totalPages;

  // Update page state and URL when pagination changes
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Update URL while preserving other parameters
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    newParams.set('limit', String(limit));
    setSearchParams(newParams);
  };

  // Effect to handle URL parameter changes from outside this component
  useEffect(() => {
    const urlPage = parseInt(searchParams.get('page') || '1', 10);
    // Update local state if URL parameters change from external sources
    if (urlPage !== page) {
      setPage(urlPage);
    }
    // Update tab state from URL
    const urlTab = searchParams.get('tab');
    if (urlTab && urlTab !== tab) {
      setTab(urlTab);
    }
    // @eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const products = data?.data?.data;

  // Handle tab changes while preserving pagination parameters
  const handleTabChange = newTab => {
    // If we're changing tabs, reset page to 1
    if (newTab !== tab) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('tab', newTab);
      newParams.set('page', '1'); // Reset to page 1 on tab change
      newParams.set('limit', String(limit));
      setSearchParams(newParams);
      setTab(newTab);
      setPage(1); // Reset local state too
    }
  };

  // Effect to handle URL parameter changes from outside this component
  useEffect(() => {
    const urlPage = parseInt(searchParams.get('page') || '1', 10);
    // Update local state if URL parameters change from external sources
    if (urlPage !== page) {
      setPage(urlPage);
    }

    // Update tab state from URL
    const urlTab = searchParams.get('tab');
    if (urlTab && urlTab !== tab) {
      setTab(urlTab);
    }
  }, [searchParams, tab, page]);

  useEffect(() => {
    refetch();
  }, [page, limit, refetch]);

  return (
    <React.Fragment>
      <PageHelmet title="Products" />
 
      {products?.length === 0 ? (
        <div>
          <PageHeader title="Products" />
          <Alert variant="warning" className="mb-4">
            <TriangleAlert size={18} />
            You have no products yet.
          </Alert>

          <NoProducts />
        </div>
      ) : (
        <div>
          <PageHeader
            title="Products"
      
          />
          <div className="mt-[1.5625rem]">
            <ProductSummaryCard />
         
            <ProductTable />
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
      )}
    </React.Fragment>
  );
};

export default Products;
