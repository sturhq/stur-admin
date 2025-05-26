import PageHeader from '@/common/PageHeader';
import PageHelmet from '@/common/PageHelmet';
// import {Button} from '@/components/ui/button';
import React from 'react';
import OrderSummaryCards from './OrderSummaryCards';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import {Plus} from 'lucide-react';
import OrderTable from './OrderTable';
// import NoOrder from './NoOrder';

const Orders = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <PageHelmet title="Orders" />
      <div className="relative flex flex-col gap-5 w-full">
        <PageHeader title="Orders" />
        <OrderSummaryCards />
        {/* <OrdersTable /> */}
        <OrderTable />
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
