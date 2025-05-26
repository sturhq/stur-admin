import {Card} from '@/components/ui/card';
import {ArrowLeft, CircleHelp} from 'lucide-react';
import successTick from '@/assets/icons/success.svg';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import {nigerianCurrencyFormat} from '@/lib/utils';
import moment from 'moment';

const SuccessScreen = ({successResponse}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center gap-5 mb-6 py-[1.25rem] px-[1.875rem] max-lg:px-[0.625rem] max-lg:py-[0.9375rem]  border-b">
        <div className="border rounded-xl p-2">
          <ArrowLeft
            onClick={() => navigate('/orders')}
            className=" cursor-pointer"
          />
        </div>
        <h1 className="text-2xl font-bold max-lg:text-lg">
          Order summary
        </h1>
      </div>
      <div className="mx-auto max-w-[46.375rem] px-4">
        <div className="flex flex-col items-center  justify-center gap-1">
          <img src={successTick} alt="success" className="w-12 h-12" />
          <p className="text-[1.75rem] text-center font-bold">
            Order Updated Successfully
          </p>
          <p className="text-sm text-center max-w-[400px] mx-auto">
            Your order has been placed successfully, you can send an
            invoice and record the payment later
          </p>
        </div>
        <div className="flex flex-col gap-[0.9375rem]">
          <Card className="p-4 w-full flex flex-col gap-4 border rounded-[0.75rem] mt-[2.125rem]">
            <div>
              <div className="flex gap-[0.6875rem] flex-col">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6A7383]">
                    Items ({successResponse?.items.length})
                  </span>
                  <span className="font-semibold">
                    {nigerianCurrencyFormat(successResponse?.totalAmount)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <div className="flex gap-[0.4375rem] items-center">
                    <div className="text-[#6A7383]">Charges</div>
                    <CircleHelp size={14} stroke="#6A7383" />
                  </div>
                  <span className="font-semibold">
                    {nigerianCurrencyFormat(successResponse?.charge)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <div className="flex gap-[0.4375rem] items-center">
                    <div className="text-[#6A7383]">Delivery Fee</div>
                    <CircleHelp size={14} stroke="#6A7383" />
                  </div>
                  <span className="font-semibold">
                    {nigerianCurrencyFormat(successResponse?.deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#6A7383]">Subtotal</span>
                  <span className=" font-semibold">
                    {nigerianCurrencyFormat(successResponse?.subtotal)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-4 w-full flex flex-col gap-4 border rounded-[0.75rem] mb-[1.875rem]">
            <div>
              <div className="flex gap-[0.6875rem] flex-col">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6A7383]">Order ID</span>
                  <span className="font-semibold">
                    #{successResponse?.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex gap-[0.4375rem] items-center">
                    <div className="text-[#6A7383]">Placed on</div>
                    <CircleHelp size={14} stroke="#6A7383" />
                  </div>
                  <span className="font-semibold">
                    {moment(successResponse?.createdAt).format(
                      'MMMM Do YYYY, h:mm a'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex gap-[0.4375rem] items-center">
                    <div className="text-[#6A7383]">Order item(s):</div>
                    <CircleHelp size={14} stroke="#6A7383" />
                  </div>
                  <span className="font-semibold">
                    {successResponse?.items.length}
                  </span>
                </div>
              </div>
            </div>
          </Card>
          <div className="flex flex-col gap-4">
            <Button
              className="w-full"
              onClick={() =>
                navigate(`/order/summary/${successResponse?._id}`)
              }
            >
              Order details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
