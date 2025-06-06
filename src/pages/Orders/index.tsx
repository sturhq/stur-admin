import PageHeader from '@/common/PageHeader';
import PageHelmet from '@/common/PageHelmet';
import React, {useEffect, useState} from 'react';
import OrderSummaryCards from './OrderSummaryCards';
import {Button} from '@/components/ui/button';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Plus} from 'lucide-react';
import OrderTable from './OrderTable';
import {useGetOrders} from '@/services/orders.service';
// import NoOrder from './NoOrder';

const Orders = () => {
  const limit = 20;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [claimStatus, setClaimStatus] = useState<'Claimed' | 'Unclaimed'>(
    (searchParams.get('claimStatus') as 'Claimed' | 'Unclaimed') ||
      'Unclaimed'
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  const {data, isLoading, refetch} = useGetOrders(
    page,
    limit,
    claimStatus
  );
  const statisticsData = data?.statistics;
  const tableData = data?.data || [];
  const pagination = data?.pagination || {
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };

  useEffect(() => {
    setSearchParams({claimStatus});
  }, [claimStatus, setSearchParams]);

  useEffect(() => {
    refetch();
  }, [page, refetch]);
  return (
    <React.Fragment>
      <PageHelmet title="Orders" />
      <div className="relative flex flex-col gap-5 w-full">
        <PageHeader title="Orders" />
        <OrderSummaryCards
          statisticsData={statisticsData}
          isLoading={isLoading}
        />

        <OrderTable
          tableData={tableData}
          isLoading={isLoading}
          pagination={pagination}
          page={page}
          setPage={setPage}
          limit={limit}
          claimStatus={claimStatus}
          setClaimStatus={setClaimStatus}
        />
        <Button
          className="md:hidden fixed bottom-14 right-2 h-[4rem] w-[4rem] rounded-full bg-[#5433EB]"
          onClick={() => navigate('/order/create-order')}
        >
          <Plus className="text-white !w-6 !h-6" />
        </Button>
        {/* <NoOrder /> */}
      </div>
    </React.Fragment>
  );
};

export default Orders;
