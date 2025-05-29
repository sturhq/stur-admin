import ImageComponent from '@/components/organisms/ImageComponent';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';
import {Skeleton} from '@/components/ui/skeleton';
import {ellipsizeText, nigerianCurrencyFormat} from '@/lib/utils';
import {BoxIcon, CircleHelp, Truck} from 'lucide-react';
import moment from 'moment';

const renderStatusBadge = status => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'confirmed':
      return 'info';
    case 'completed':
      return 'positive';
    case 'cancelled':
      return 'negative';
    default:
      return 'info';
  }
};

const renderDeliveryStatusBadge = status => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'out_for_delivery':
      return 'warning';
    case 'delivered':
      return 'positive';
    default:
      return 'info';
  }
};

const InvoiceSummary = ({orderData, isLoading}) => {
  return (
    <div className="flex flex-col gap-[0.3125rem]">
      <div className="flex justify-between">
        <div className="flex gap-[1rem]">
          {isLoading ? (
            <Skeleton className="w-20 h-7" />
          ) : (
            orderData?.status && (
              <Badge
                variant={renderStatusBadge(orderData?.status)}
                className="flex gap-[0.25rem]"
              >
                <p>
                  {orderData?.status.charAt(0).toUpperCase() +
                    orderData?.status.slice(1)}
                </p>
                <BoxIcon size={13} />
              </Badge>
            )
          )}

          {isLoading ? (
            <Skeleton className="w-20 h-7" />
          ) : (
            orderData?.deliveryStatus && (
              <Badge
                variant={renderDeliveryStatusBadge(
                  orderData?.deliveryStatus
                )}
                className="flex gap-[0.25rem]"
              >
                <p>
                  {orderData?.deliveryStatus === 'out_for_delivery'
                    ? 'Out For Delivery'
                    : orderData?.deliveryStatus
                        .split('_')
                        .map(
                          word =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')}
                </p>
                <Truck size={13} />
              </Badge>
            )
          )}
        </div>
      </div>
      <div className="mb-[1.0625rem] mt-[1.0625rem]">
        <div className="flex gap-[1.125rem] items-baseline">
          <p className="text-[#6A7383]"> Order Id</p>
          {isLoading ? (
            <Skeleton className="w-16 h-4" />
          ) : (
            <p className="font-semibold">#{orderData?.orderNumber}</p>
          )}
        </div>
        <div className="flex gap-[1.125rem] items-baseline">
          <p className="text-[#6A7383]">Order date</p>
          {isLoading ? (
            <Skeleton className="w-32 h-4" />
          ) : (
            <p className="font-semibold">
              {moment(orderData?.createdAt).format('MMMM Do YYYY, h:mm a')}
            </p>
          )}
        </div>
      </div>

      <Separator />
      <div className="flex flex-col gap-[0.3125rem] mt-[1.0625rem] mb-[1.375rem]">
        <h2 className="text-sm font-semibold mb-5">
          {isLoading ? (
            <Skeleton className="w-24 h-6" />
          ) : orderData?.items.length > 1 ? (
            'Items'
          ) : (
            'Item'
          )}
        </h2>
        {isLoading
          ? [...Array(2)].map((_, index) => (
              <Skeleton key={index} className="w-full h-6" />
            ))
          : orderData?.items.map((item, index) => (
              <div className="space-y-2" key={index}>
                <div className="flex justify-between">
                  <div>
                    <div
                      className={`flex gap-[0.6875rem] ${!item?.product?.description ? 'items-center' : 'items-start'}`}
                    >
                      <ImageComponent
                        src={item?.product?.previewMedia}
                        alt="Item"
                        className="w-[3rem] h-[3rem] rounded-md"
                        imageClass="w-[3rem] h-[3rem] !rounded-md"
                        placeholderClass="w-[1.6rem] h-[1.6rem]"
                      />
                      <div>
                        <p className="font-semibold">
                          {item?.product?.title}
                        </p>
                        <p className="text-[#6A7383] text-[0.875rem] font-normal mt-1">
                          {ellipsizeText(item?.product?.description, 40)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium">
                    {nigerianCurrencyFormat(item.price)}
                  </p>
                </div>
              </div>
            ))}
      </div>
      <Separator />
      <div className="space-y-2 mt-[1.0625rem]">
        <div className="flex gap-[0.6875rem] flex-col mb-[1.0313rem] ">
          <div className="flex justify-between text-sm">
            <span className="text-[#6A7383] font-normal">
              Items ({orderData?.items?.length})
            </span>

            {isLoading ? (
              <Skeleton className="w-20 h-6" />
            ) : (
              <span className="font-semibold">
                {nigerianCurrencyFormat(orderData?.totalAmount)}
              </span>
            )}
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6A7383] font-normal">Subtotal</span>
            {isLoading ? (
              <Skeleton className="w-20 h-6" />
            ) : (
              <span className="font-semibold">
                {nigerianCurrencyFormat(orderData?.subtotal)}
              </span>
            )}
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex gap-[0.4375rem] items-center">
              <div className="text-[#6A7383] font-normal">
                Delivery Fee
              </div>
              <CircleHelp size={14} stroke="#6A7383" />
            </div>

            {isLoading ? (
              <Skeleton className="w-20 h-6" />
            ) : (
              <span className="font-semibold">
                {nigerianCurrencyFormat(orderData?.deliveryFee)}
              </span>
            )}
          </div>
          <div className="flex justify-between text-sm ">
            <div className="flex gap-[0.4375rem] items-center">
              <div className="text-[#6A7383] font-normal">Charges</div>
              <CircleHelp size={14} stroke="#6A7383" />
            </div>

            {isLoading ? (
              <Skeleton className="w-20 h-6" />
            ) : (
              <span className="font-semibold">
                {nigerianCurrencyFormat(orderData?.charge)}
              </span>
            )}
          </div>
        </div>
        <Separator />
        <div className="flex justify-between items-center mt-[0.9375rem]">
          <p className="font-bold">Total</p>
          {isLoading ? (
            <Skeleton className="w-24 h-6" />
          ) : (
            <p className="font-bold">
              {nigerianCurrencyFormat(orderData?.totalAmount)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummary;
