import {Card} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {nigerianCurrencyFormat} from '@/lib/utils';

interface ProductSummaryCardsProps {
  statistics?: {
    inventoryValue?: number;
    inventoryVolume?: number;
    outOfStock?: number;
  };
  settlementSummary?: {
    pendingTotal?: number;
    completedTotal?: number;
  };
  isLoading?: boolean;
}

const ProductSummaryCard = ({
  statistics,
  settlementSummary,
  isLoading,
}: ProductSummaryCardsProps) => {
  return (
    <div>
      {' '}
      <div className="flex gap-4 items-center justify-between w-full max-lg:hidden">
        <Card className="p-4 w-full   transition-all duration-500 ease-in-out flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Pending settlement
            </h1>
            {isLoading ? (
              <Skeleton className="w-20 h-7" />
            ) : (
              <div className="text-xl font-bold">
                {nigerianCurrencyFormat(settlementSummary.pendingTotal)}
              </div>
            )}
          </div>
        </Card>
        <Card className="p-4 w-full  transition-all duration-500 ease-in-out  flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Total settlement
            </h1>
            {isLoading ? (
              <Skeleton className="w-20 h-7" />
            ) : (
              <p className="text-xl font-bold">
                {nigerianCurrencyFormat(settlementSummary.completedTotal)}
              </p>
            )}
          </div>
        </Card>
        <Card className="p-4 w-full  transition-all duration-500 ease-in-out  flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Number of Products
            </h1>
            {isLoading ? (
              <Skeleton className="w-20 h-7" />
            ) : (
              <p className="text-xl font-bold">
                {statistics.inventoryVolume}
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductSummaryCard;
