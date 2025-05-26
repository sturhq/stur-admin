import {Button} from '@/components/ui/button';
// import Details from './DetailedOrder';
import React, {useState} from 'react';
// import {usePostOrder} from '@/services/orders.service';
// import {useSelectedOrderProducts} from '@/zustand/orders';
import {useUser} from '@/hooks/useUser';
import {ArrowLeft} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import SuccessScreen from './SuccessScreen';
import DetailedStore from './DetailedStore';
// import SuccessScreen from './SuccessScreen';
// import {gaRecordEvent} from '@/analytics';

const CreateStorePage = () => {
  const navigate = useNavigate();
  const [successResponse, setSuccessResponse] = useState(null);
  const {userData} = useUser();
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [lga, setLga] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('');
  //   const selectedProducts = useSelectedOrderProducts(
  //     state => state.selectedItems
  //   );
  //   const clearSelectedItems = useSelectedOrderProducts(
  //     state => state.clearSelectedItems
  //   );

  //   const {mutateAsync, isPending, isSuccess} = usePostOrder();

  //   const postOrder = async () => {
  //     const deliveryOrder = {
  //       storeId: userData?.store?._id,
  //       nickname: customerName,
  //       phoneNumber,
  //       paymentOption: 'pay_on_delivery',
  //       deliveryAddress: address,
  //       deliveryAreaId: deliveryArea,
  //       deliveryOption: address
  //         ? ('home_delivery' as const)
  //         : ('in_store' as const),
  //     //   items: selectedProducts.map(item => ({
  //     //     productId: item._id,
  //     //     quantity: item.quantity,
  //     //   })),
  //       lga,
  //       state,
  //       email,
  //     };

  //     try {
  //       const response = await mutateAsync(deliveryOrder);
  //     //   gaRecordEvent('ORDER', 'order_created');
  //       setSuccessResponse(response?.data?.data);
  //     //   clearSelectedItems();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <React.Fragment>
      {/* {isSuccess ? (
        <SuccessScreen successResponse={successResponse} />
      ) : (
        <div>
          <div className="flex items-center gap-5 mb-6 py-[1.25rem] px-[1.875rem] max-lg:px-[0.625rem] max-lg:py-[0.9375rem]  border-b">
            <div className="border rounded-xl p-2">
              <ArrowLeft
                onClick={() => navigate(-1)}
                className=" cursor-pointer"
              />
            </div>
            <h1 className="text-2xl font-bold max-lg:text-lg">
              Create Order
            </h1>
          </div>

          <div className="mx-auto w-full">
            <Details
              customerName={customerName}
              setCustomerName={setCustomerName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              email={email}
              setEmail={setEmail}
              lga={lga}
              setLga={setLga}
              state={state}
              setState={setState}
              address={address}
              setAddress={setAddress}
              deliveryArea={deliveryArea}
              setDeliveryArea={setDeliveryArea}
            />
          </div>

          <div className="flex justify-end gap-4 mt-6 fixed bottom-0 bg-white p-4 border-t w-full">
            <Button
              onClick={postOrder}
              loading={isPending}
              disabled={
                selectedProducts.length === 0 ||
                !customerName ||
                !phoneNumber
              }
            >
              Place Order
            </Button>
          </div>
        </div>
      )} */}
      <div>
        <div className="flex items-center gap-5 mb-6 py-[1.25rem] px-[1.875rem] max-lg:px-[0.625rem] max-lg:py-[0.9375rem]  border-b">
          <div className="border rounded-xl p-2">
            <ArrowLeft
              onClick={() => navigate(-1)}
              className=" cursor-pointer"
            />
          </div>
          <h1 className="text-2xl font-bold max-lg:text-lg">
            Create stores
          </h1>
        </div>

        <div className="mx-auto w-full">
          {/* <Details
            customerName={customerName}
            setCustomerName={setCustomerName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            email={email}
            setEmail={setEmail}
            lga={lga}
            setLga={setLga}
            state={state}
            setState={setState}
            address={address}
            setAddress={setAddress}
            deliveryArea={deliveryArea}
            setDeliveryArea={setDeliveryArea}
          /> */}
          <DetailedStore />
        </div>

    
      </div>
    </React.Fragment>
  );
};

export default CreateStorePage;
