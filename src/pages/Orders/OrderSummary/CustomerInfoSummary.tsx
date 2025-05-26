import {Email, Message, Whatsapp} from '@/assets/svgs/Icons';
import {Skeleton} from '@/components/ui/skeleton';

const CustomerInfoSummary = ({orderData, isLoading}) => {
  return (
    <div className='className=" flex flex-col gap-[1.25rem] w-full'>
      <h2 className="text-sm font-bold">Customer Info</h2>
      <div className="flex flex-col gap-[0.625rem]">
        <div className="flex flex-col">
          <p className="text-[#6A7383] font-normal">Name</p>
          {isLoading ? (
            <Skeleton className="w-32 h-5" />
          ) : (
            <p className="font-semibold">
              {orderData?.customer?.firstName}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-col">
            <p className="text-[#6A7383] font-normal">Phone</p>
            {isLoading ? (
              <Skeleton className="w-24 h-5" />
            ) : (
              <p className="font-semibold">{orderData?.phoneNumber}</p>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <span
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  `https://wa.me/${orderData?.phoneNumber.replace(
                    /\D/g,
                    ''
                  )}`,
                  '_blank'
                )
              }
            >
              <Whatsapp />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                const formatted = orderData?.phoneNumber.replace(
                  /^\+/,
                  ''
                );

                window.location.href = `sms:${formatted}`;
              }}
            >
              <Message />
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-col">
            <p className="text-[#6A7383] font-normal">Email</p>
            {isLoading ? (
              <Skeleton className="w-40 h-5" />
            ) : (
              <p className="font-semibold">{orderData?.customer?.email}</p>
            )}
          </div>
          <Email />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoSummary;
