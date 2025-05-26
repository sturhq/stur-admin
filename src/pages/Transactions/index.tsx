import PageHeader from '@/common/PageHeader';
import PageHelmet from '@/common/PageHelmet';
import React, {useEffect} from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import {useSearchParams} from 'react-router-dom';

import SettlementHistory from './Tabs/SettlementHistoryTable';
import AllTransactions from './Tabs/AllTransactionTable';
// import {gaRecordEvent} from '@/analytics';

const Transactions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = React.useState(searchParams.get('tab') || 'all');

  useEffect(() => {
    setSearchParams({tab});
  }, [tab, setSearchParams]);

  return (
    <React.Fragment>
      <PageHelmet title="Transactions" />
      <PageHeader title="Transactions" />
      <Tabs
        defaultValue="all"
        className="w-full mt-4"
        onValueChange={setTab}
        value={tab}
      >
        <TabsList className="w-full">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger
            value="settlement"
            // onClick={() => {
            //   gaRecordEvent(
            //     'Transactions',
            //     'user_check_settlement_history'
            //   );
            // }}
          >
            Settlement History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AllTransactions />
        </TabsContent>

        <TabsContent value="settlement">
          <SettlementHistory />
        </TabsContent>
      </Tabs>
    </React.Fragment>
  );
};

export default Transactions;
