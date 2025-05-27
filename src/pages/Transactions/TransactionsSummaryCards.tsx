import IconComponent from '@/components/organisms/CircleIcon';
import {Card} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {useUser} from '@/hooks/useUser';
import {nigerianCurrencyFormat} from '@/lib/utils';
import {useGetTransactionStatistics} from '@/services/transactions.service';
// import {useGetTransactionStatistics} from '@/services/transactions.service';
// import MobileTransactionsSummaryCards from './Mobile/MobileTransactionSummaryCard';
import {
  CubeIcon,
  CurrencyDollarIcon,
  GlobeAsiaAustraliaIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/solid';

const TransactionsSummaryCards = () => {
  const {userData} = useUser();
  const {data, isLoading} = useGetTransactionStatistics(
    userData?.store?._id
  );
  const transactionStatistics = data?.data.data;

  return (
    <div>
      <div className="flex gap-4 items-center justify-between w-full max-lg:hidden">
        <Card className="p-4 w-full  transition-all duration-500 ease-in-out flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Pending settlement
            </h1>
            {!isLoading && transactionStatistics ? (
              <p className="text-xl font-bold">
                {nigerianCurrencyFormat(
                  transactionStatistics?.pendingSettlement
                )}
              </p>
            ) : (
              <Skeleton className="w-20 h-7" />
            )}
          </div>
        </Card>
        <Card className="p-4 w-full  transition-all duration-500 ease-in-out flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Total online transaction
            </h1>
            {!isLoading && transactionStatistics ? (
              <p className="text-xl font-bold">
                {nigerianCurrencyFormat(
                  transactionStatistics?.totalOnline
                )}
              </p>
            ) : (
              <Skeleton className="w-20 h-7" />
            )}
          </div>
        </Card>
        <Card className="p-4 w-full  transition-all duration-500 ease-in-out flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Total offline transaction
            </h1>
            {!isLoading && transactionStatistics ? (
              <p className="text-xl font-bold">
                {nigerianCurrencyFormat(
                  transactionStatistics?.totalOffline
                )}
              </p>
            ) : (
              <Skeleton className="w-20 h-7" />
            )}
          </div>
        </Card>
      </div>
      <div className="hidden max-lg:block ">
        {/* <MobileTransactionsSummaryCards /> */}
      </div>
    </div>
  );
};

export default TransactionsSummaryCards;
