import {Button} from '@/components/ui/button';
import Details from './DetailedOrder';
import React, {useEffect, useState} from 'react';
import {useEditOrder, useGetOrderById} from '@/services/orders.service';

import {useUser} from '@/hooks/useUser';
import {ArrowLeft} from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';
import SuccessScreen from './SuccessScreen';
import {gaRecordEvent} from '@/analytics';

const EditOrderPage = () => {
  const navigate = useNavigate();
  const {orderId} = useParams();
  const [successResponse, setSuccessResponse] = useState(null);
  const {userData} = useUser();
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [lga, setLga] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const {data} = useGetOrderById(orderId);

  const order = data?.data?.data;

  const {mutateAsync, isPending, isSuccess} = useEditOrder(orderId);

  const postOrder = async () => {
    const deliveryOrder = {
      storeId: userData?.store?._id,
      phoneNumber,

      deliveryAddress: address,
      deliveryAreaId: deliveryArea,
      deliveryOption: address
        ? ('home_delivery' as const)
        : ('in_store' as const),
      items: selectedProducts.map(item => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      lga,
      state,
    };

    try {
      const response = await mutateAsync(deliveryOrder);
      gaRecordEvent('ORDER', 'order_updated');
      setSuccessResponse(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  // update the state with the order details
  useEffect(() => {
    if (order) {
      setCustomerName(order?.customer.firstName);
      setPhoneNumber(order?.phoneNumber);
      setEmail(order?.email);
      setLga(order.lga);
      setState(order.state);
      setAddress(order.deliveryAddress);
      setDeliveryArea(order.deliveryAreaId);
      setSelectedProducts(order.items);
    }
  }, [order]);

  return (
    <React.Fragment>
      {isSuccess ? (
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
              Edit Order
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
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </div>

          <div className="flex justify-end gap-4 mt-6 fixed bottom-0 bg-white p-4 border-t w-full">
            <Button
              onClick={postOrder}
              loading={isPending}
              disabled={selectedProducts.length === 0}
            >
              Update Order
            </Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditOrderPage;
