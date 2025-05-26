import {Skeleton} from '@/components/ui/skeleton';

const DeliveryAddressSummary = ({orderData, isLoading}) => {
  return (
    <div className="flex flex-col gap-[1.25rem] w-full">
      <h2 className="text-sm font-bold">Delivery Address</h2>
      <div className="flex flex-col gap-[0.625rem]">
        <div className="flex flex-col">
          <p className="text-[#6A7383] font-normal">Address</p>
          {isLoading ? (
            <Skeleton className="w-3/4 h-6" />
          ) : (
            <p className="font-semibold">{orderData?.deliveryAddress}</p>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-[#6A7383] font-normal">L.G.A</p>
          {isLoading ? (
            <Skeleton className="w-1/2 h-6" />
          ) : (
            <p className="font-semibold">{orderData?.lga}</p>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-[#6A7383] font-normal">City/State</p>
          {isLoading ? (
            <Skeleton className="w-1/2 h-6" />
          ) : (
            <p className="font-semibold">{orderData?.state}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressSummary;
