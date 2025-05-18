import React from 'react';
import PageHeader from '@/common/PageHeader';
import PageHelmet from '@/common/PageHelmet';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import StoreSummaryCards from './StoreSummaryCards';
import StoreTable from './StoresTable';

const Stores = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <PageHelmet title="Stores" />
      <div className="flex flex-col gap-5 w-full">
        <PageHeader
          title="Stores"
          button={
            <Button onClick={() => navigate('/store/create')}>
              Create Store
            </Button>
          }
        />
        <StoreSummaryCards />
        <StoreTable />
      </div>
    </React.Fragment>
  );
};

export default Stores;
