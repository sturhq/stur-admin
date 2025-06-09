import React, {useEffect} from 'react';
import PageHeader from '@/common/PageHeader';
import PageHelmet from '@/common/PageHelmet';
import {Button} from '@/components/ui/button';
import {useNavigate, useSearchParams} from 'react-router-dom';
import StoreSummaryCards from './StoreSummaryCards';
import StoreTable from './StoresTable';
import {useGetStores} from '@/services/stores.services';

const Stores = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Initialize page from URL or default to 1
  const initialPage = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string, 10)
    : 1;

  const [page, setPage] = React.useState(initialPage);
  const [claimStatus, setClaimStatus] = React.useState<
    'Claimed' | 'Unclaimed'
  >(
    (searchParams.get('claimStatus') as 'Claimed' | 'Unclaimed') ||
      'Unclaimed'
  );
  const limit = 20; // Define the number of items per page
  const navigate = useNavigate();

  // Update URL when page or claimStatus changes
  useEffect(() => {
    // Preserve both parameters in the URL
    setSearchParams({
      claimStatus,
      page: page.toString(),
    });
  }, [claimStatus, page, setSearchParams]);

  const {data, isLoading} = useGetStores(page, limit, claimStatus);

  const statistics = data?.statistics || {};
  const tableData = data?.data || [];
  const pagination = data?.pagination || {
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };

  return (
    <React.Fragment>
      <PageHelmet title="Stores" />
      <div className="flex flex-col gap-5 w-full">
        <PageHeader
          title="Stores"
          button={
            <Button onClick={() => navigate('/store/create')}>
              Create Stur
            </Button>
          }
        />
        <StoreSummaryCards statistics={statistics} isLoading={isLoading} />
        <StoreTable
          tableData={tableData}
          isLoading={isLoading}
          pagination={pagination}
          page={page}
          setPage={setPage}
          limit={limit}
          claimStatus={claimStatus}
          setClaimStatus={setClaimStatus}
        />
      </div>
    </React.Fragment>
  );
};

export default Stores;
