import {Card} from '@/components/ui/card';
import {nigerianCurrencyFormat} from '@/lib/utils';
import {Skeleton} from '@/components/ui/skeleton';

type SettlementSummaryCardsProps = {
  summary: {
    pendingTotal: number;
    completedTotal: number;
  };
  isLoading: boolean;
};

const SettlementSummaryCards = ({
  summary,
  isLoading,
}: SettlementSummaryCardsProps) => {
  return (
    <div className="flex gap-4 items-center justify-between w-full max-lg:gap-0">
      <Card className="p-4 w-full transition-all duration-500 ease-in-out flex gap-[0.9375rem] items-center max-lg:flex-col max-lg:items-start  max-lg:rounded-br-none max-lg:rounded-tr-none">
        <div>
          <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
            Pending settlement
          </h1>
          {!isLoading && summary ? (
            <p className="text-xl font-bold">
              {nigerianCurrencyFormat(summary?.pendingTotal)}
            </p>
          ) : (
            <Skeleton className="w-20 h-7" />
          )}
        </div>
      </Card>
      <Card className="p-4 w-full transition-all duration-500 ease-in-out flex gap-[0.9375rem] items-center max-lg:flex-col max-lg:items-start max-lg:rounded-tl-none  max-lg:rounded-bl-none">
        <div>
          <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
            Total settlement
          </h1>
          {!isLoading && summary ? (
            <p className="text-xl font-bold">
              {nigerianCurrencyFormat(summary?.completedTotal)}
            </p>
          ) : (
            <Skeleton className="w-20 h-7" />
          )}
        </div>
      </Card>
    </div>
  );
};

export default SettlementSummaryCards;
