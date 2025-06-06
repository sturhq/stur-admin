import {Card} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {nigerianCurrencyFormat} from '@/lib/utils';

interface OrderSummaryCardsProps {
  statisticsData?: {
    totalOrderValue?: number;
    unpaidOrders?: number;
    completedOrders?: number;
  };
  isLoading?: boolean;
}
const OrderSummaryCards = ({
  statisticsData,
  isLoading,
}: OrderSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-12 md:flex md:gap-4 items-center justify-between w-full max-lg:flex-col max-md:border max-md:rounded-lg">
      <Card className="p-4 w-full  transition-all duration-500 ease-in-out flex flex-col md:flex-row gap-2.5 md:gap-[0.9375rem] md:items-center max-md:col-span-6 max-md:border-transparent max-md:border-l-[#EBEEF1] max-md:rounded-none max-md:rounded-tr-lg">
        <div>
          <h1 className="text-sm font-semibold leading-5 mb-1 text-[#6A7383]">
            Total Order value
          </h1>
          {isLoading ? (
            <Skeleton className="w-1/2 h-6" />
          ) : (
            <p className="text-xl font-bold">
              {nigerianCurrencyFormat(
                statisticsData?.totalOrderValue ?? 0
              )}
            </p>
          )}
        </div>
      </Card>

      <Card className="p-4 w-full  transition-all duration-500 ease-in-out flex flex-col md:flex-row gap-2.5 md:gap-[0.9375rem] md:items-center max-md:col-span-6 max-md:border-transparent max-md:border-t-[#EBEEF1] max-md:border-l-[#EBEEF1] max-md:rounded-none max-md:rounded-br-lg">
        <div>
          <h1 className="text-sm font-semibold leading-5 mb-1 text-[#6A7383]">
            Total orders
          </h1>
          {isLoading ? (
            <Skeleton className="w-1/2 h-6" />
          ) : (
            <p className="text-xl font-bold">
              {statisticsData?.unpaidOrders ?? 0}
            </p>
          )}
        </div>
      </Card>
      <Card className="p-4 w-full  transition-all duration-500 ease-in-out flex flex-col md:flex-row gap-2.5 md:gap-[0.9375rem] md:items-center max-md:col-span-6 max-md:border-transparent max-md:border-t-[#EBEEF1] max-md:border-l-[#EBEEF1] max-md:rounded-none max-md:rounded-br-lg">
        <div>
          <h1 className="text-sm font-semibold leading-5 mb-1 text-[#6A7383]">
            Pending delivery
          </h1>
          {isLoading ? (
            <Skeleton className="w-1/2 h-6" />
          ) : (
            <p className="text-xl font-bold">
              {statisticsData?.unpaidOrders ?? 0}
            </p>
          )}
        </div>
      </Card>
      <Card className="p-4 w-full  transition-all duration-500 ease-in-out flex flex-col md:flex-row gap-2.5 md:gap-[0.9375rem] md:items-center max-md:col-span-6 max-md:border-transparent max-md:rounded-b-lg max-md:border-t-[#EBEEF1] max-md:rounded-t-none">
        <div>
          <h1 className="text-sm font-semibold leading-5 mb-1 text-[#6A7383]">
            Completed orders
          </h1>
          {isLoading ? (
            <Skeleton className="w-1/2 h-6" />
          ) : (
            <p className="text-xl font-bold">
              {statisticsData?.completedOrders ?? 0}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default OrderSummaryCards;
