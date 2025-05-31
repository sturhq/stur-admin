import React, {useEffect, useState} from 'react';
import PageHeader from '@/common/PageHeader';
import PageHelmet from '@/common/PageHelmet';
import {Button} from '@/components/ui/button';
import {Copy, Plus} from 'lucide-react';
import {toast} from '@/hooks/use-toast';
import {Badge} from '@/components/ui/badge';
import ProductSummaryCard from './ProductSummaryCards';
import {BlockModal} from './BlockModal.tsx';
import {useGetStoreById} from '@/services/stores.services.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {useGetProducts} from '@/services/products.service.ts';
import ProductsTable from '@/pages/Products/ProductsTable/index.tsx';

const StoreDetails = () => {
  const limit = 20;

  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const {storeId} = useParams();
  const [open, setOpen] = useState(false);
  const {data: storeInfo, error} = useGetStoreById(storeId);
  const claimed = storeInfo?.data;
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProducts(page, limit, storeId);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (error) {
    toast({
      description:
        // @ts-expect-error - error is not typed
        error?.response?.data?.message || 'Failed to fetch store details',
      variant: 'destructive',
    });
    return null;
  }

  const store = storeInfo?.data.data;
  const statistics = products?.statistics || {};
  const tableData = products?.data || [];
  const pagination = products?.pagination || {
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const planMap = {
    Premium: 'Premium',
    Standard: 'Standard',
  };
  type PlanType = keyof typeof planMap;
  const variantMap: Record<
    PlanType,
    | 'positive'
    | 'negative'
    | 'destructive'
    | 'info'
    | 'outline'
    | 'default'
    | 'warning'
  > = {
    Premium: 'info',
    Standard: 'outline',
  };

  const statusMap = {
    Active: 'Active',
    Pending: 'Pending',
    Blocked: 'Blocked',
    Inactive: 'Inactive',
  };

  const statusVariantMap: Record<
    typeof status,
    | 'positive'
    | 'negative'
    | 'destructive'
    | 'info'
    | 'outline'
    | 'default'
    | 'warning'
  > = {
    Active: 'positive',
    Pending: 'negative',
    Blocked: 'destructive',
    Inactive: 'default',
  };

  return (
    <React.Fragment>
      <PageHelmet title="Store Details" />
      <div className="flex flex-col gap-5 w-full">
        <div>
          <PageHeader
            title={store?.storeName || ''}
            button={
              <div className="flex gap-2">
                <Button
                  className="bg-[#30313D] p-[0.5rem]"
                  // onClick={() => {
                  //   setOpen(true);
                  // }}
                  disabled={!claimed?.isClaimable}
                >
                  <Plus size={15} />
                  <div
                    onClick={() =>
                      navigate(`/products/add-product?storeId=${storeId}`)
                    }
                  >
                    Add product
                  </div>
                </Button>
                <Button
                  variant={
                    store?.status === 'Blocked' ? 'outline' : 'destructive'
                  }
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {store?.status === 'Blocked'
                    ? 'Unblock Store'
                    : 'Block Store'}
                </Button>
              </div>
            }
          />
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText('www.stur.ng/thelinkstore');
              toast({
                description: 'Store link copied to clipboard',
                variant: 'success',
              });
            }}
          >
            <a
              className="text-[#6A7383]"
              href="https://www.stur.ng/thelinkstore"
              target="_blank"
              rel="noopener noreferrer"
            >
              {store?.storeUrl || ''}
            </a>
            <span
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(store?.storeUrl || '');
                toast({
                  description: 'Store link copied to clipboard',
                  variant: 'default',
                });
              }}
            >
              <Copy className="w-4 h-4 text-[#5433EB]" />
            </span>
          </div>
          <div className="flex col gap-2 mt-4">
            <Badge variant={statusVariantMap[store?.status || '']}>
              {statusMap[store?.status || '']}
            </Badge>
            <Badge variant={variantMap[store?.plan || '']}>
              {planMap[store?.plan || '']}
            </Badge>
          </div>
        </div>
        <ProductSummaryCard
          statistics={statistics}
          isLoading={isLoading}
        />
        <ProductsTable
          tableData={tableData}
          isLoading={isLoading}
          pagination={pagination}
          page={page}
          setPage={setPage}
          limit={limit}
        />
      </div>
      <BlockModal open={open} setOpen={setOpen} store={store} />
    </React.Fragment>
  );
};

export default StoreDetails;
