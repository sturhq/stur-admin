import {Card} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';

interface StoreSummaryCardsProps {
  statistics?: {
    totalUsers?: number;
    pendingKYB?: number;
    subscribedUsers?: number;
  };
  isLoading?: boolean;
}

const StoreSummaryCards = ({
  statistics,
  isLoading,
}: StoreSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-12 md:flex md:gap-4 items-center justify-between w-full max-lg:flex-col max-md:border max-md:rounded-lg">
      <Card className="p-4 w-full  transition-all duration-500 ease-in-out flex flex-col md:flex-row gap-2.5 md:gap-[0.9375rem] md:items-center max-md:col-span-6 max-md:border-transparent max-md:rounded-lg">
        <div>
          <h1 className="text-sm font-semibold leading-5 mb-1 text-[#6A7383]">
            No. of users
          </h1>
          {isLoading ? (
            <Skeleton className="w-20 h-7" />
          ) : (
            <p className="text-xl font-bold">
              {statistics?.totalUsers ?? 0}
            </p>
          )}
        </div>
      </Card>
      <Card className="p-4 w-full  transition-all duration-500 ease-in-out flex flex-col md:flex-row gap-2.5 md:gap-[0.9375rem] md:items-center max-md:col-span-6 max-md:border-transparent max-md:rounded-lg">
        <div>
          <h1 className="text-sm font-semibold leading-5 mb-1 text-[#6A7383]">
            Pending KYB
          </h1>
          {isLoading ? (
            <Skeleton className="w-20 h-7" />
          ) : (
            <p className="text-xl font-bold">
              {statistics?.pendingKYB ?? 0}
            </p>
          )}
        </div>
      </Card>
      <Card className="p-4 w-full  transition-all duration-500 ease-in-out flex flex-col md:flex-row gap-2.5 md:gap-[0.9375rem] md:items-center max-md:col-span-6 max-md:border-transparent max-md:rounded-lg">
        <div>
          <h1 className="text-sm font-semibold leading-5 mb-1 text-[#6A7383]">
            Subscribed users
          </h1>
          {isLoading ? (
            <Skeleton className="w-20 h-7" />
          ) : (
            <p className="text-xl font-bold">
              {statistics?.subscribedUsers ?? 0}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StoreSummaryCards;
