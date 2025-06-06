import {Card} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {nigerianCurrencyFormat} from '@/lib/utils';

interface ProductSummaryCardsProps {
  statistics?: {
    inventoryValue?: number;
    inventoryVolume?: number;
    outOfStock?: number;
  };
  isLoading?: boolean;
}

const ProductSummaryCard = ({
  statistics,
  isLoading,
}: ProductSummaryCardsProps) => {
  return (
    <div>
      {' '}
      <div className="flex gap-4 items-center justify-between w-full max-lg:hidden">
        <Card className="p-4 w-full   transition-all duration-500 ease-in-out flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Inventory value
            </h1>
            {isLoading ? (
              <Skeleton className="w-20 h-7" />
            ) : (
              <div className="text-xl font-bold">
                {nigerianCurrencyFormat(statistics.inventoryValue)}
              </div>
            )}
          </div>
        </Card>
        <Card className="p-4 w-full  transition-all duration-500 ease-in-out  flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Total Products
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
        <Card className="p-4 w-full  transition-all duration-500 ease-in-out  flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Out of Stock
            </h1>
            {isLoading ? (
              <Skeleton className="w-20 h-7" />
            ) : (
              <p className="text-xl font-bold">{statistics.outOfStock}</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductSummaryCard;
