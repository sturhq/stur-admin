import {Card} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';

import {nigerianCurrencyFormat} from '@/lib/utils';

interface stats {
  pendingSettlement: number;
  totalOnline: number;
  totalOffline: number;
  isLoading?: boolean;
}

const TransactionsSummaryCards = ({
  stats,
  isLoading,
}: {
  stats: stats | null;
  isLoading: boolean;
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center justify-between w-full max-lg:hidden">
        <Card className="p-4 w-full  transition-all duration-500 ease-in-out flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Pending settlement
            </h1>
            {!isLoading && stats ? (
              <p className="text-xl font-bold">
                {nigerianCurrencyFormat(stats?.pendingSettlement)}
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
            {!isLoading && stats ? (
              <p className="text-xl font-bold">
                {nigerianCurrencyFormat(stats?.totalOnline)}
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
            {!isLoading && stats ? (
              <p className="text-xl font-bold">
                {nigerianCurrencyFormat(stats?.totalOffline)}
              </p>
            ) : (
              <Skeleton className="w-20 h-7" />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TransactionsSummaryCards;
