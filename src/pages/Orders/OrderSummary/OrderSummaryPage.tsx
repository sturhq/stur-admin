import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {ArrowLeft, Copy, CopyIcon} from 'lucide-react';
import DeliveryAddressSummary from './DeliveryAddressSummary';
import CustomerInfoSummary from './CustomerInfoSummary';
import InvoiceSummary from './InvoiceSummary';
import {useNavigate, useParams} from 'react-router-dom';
// import {
//   useGetOrderById,
//   useUpdateDeliveryStatus,
//   useUpdateOrderPaymentStatus,
//   useUpdateOrderStatus,
// } from '@/services/orders.service';
import {CopyToClipboard, nigerianCurrencyFormat} from '@/lib/utils';
import {toast} from '@/hooks/use-toast';
import {useUser} from '@/hooks/useUser';
import {Edit} from '@/pages/Products/ProductDetails/Details';
import {Share} from '@/assets/svgs/Icons';
import {ConfirmActionModal} from './Modal/ConfirmActionModal';
import {
  CubeIcon,
  TruckIcon,
  CreditCardIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import ReportTransaction from './ReportTransaction';
// import {gaRecordEvent} from '@/analytics';
import {
  useGetOrderById,
  useUpdateDeliveryStatus,
  useUpdateOrderPaymentStatus,
  useUpdateOrderStatus,
} from '@/services/orders.service';
import {
  Avatar,
  // AvatarFallback,
  // AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

const statusOptions = [
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'confirmed',
    label: 'Confirmed',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
  },
];

const paymentOptions = [
  {
    value: 'paid',
    label: 'Paid',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'refunded',
    label: 'Refunded',
  },
];

const deliveryOptions = [
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'out_for_delivery',
    label: 'Out for delivery',
  },
  {
    value: 'delivered',
    label: 'Delivered',
  },
];

const OrderSummary = () => {
  const navigate = useNavigate();
  const {orderId} = useParams();
  const {userData} = useUser();
  const {data, isLoading} = useGetOrderById(orderId);
  console.log(userData);

  const order = data?.data?.data;

  const [orderStatus, setOrderStatus] = useState(data?.data?.data?.status);
  const [paymentStatus, setPaymentStatus] = useState(
    data?.data?.data?.paymentStatus
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState('');
  const [pendingStatus, setPendingStatus] = useState('');
  const [modalConfig, setModalConfig] = useState({
    title: '',
    description: '',
    icon: null,
  });
  const [deliveryStatus, setDeliveryStatus] = useState(
    data?.data?.data?.deliveryStatus
  );
  const storeSlug = userData?.store?.storeSlug;
  const {mutateAsync: updateOrderStatus} = useUpdateOrderStatus(orderId);
  const {mutateAsync: updatePaymentStatus} =
    useUpdateOrderPaymentStatus(orderId);
  const {mutateAsync: updateDeliveryStatus} =
    useUpdateDeliveryStatus(orderId);

  const updateStatus = async status => {
    try {
      await updateOrderStatus({
        status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updatePayment = async status => {
    try {
      await updatePaymentStatus({
        paymentStatus: status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateDelivery = async status => {
    try {
      await updateDeliveryStatus({
        deliveryStatus: status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = (status, type) => {
    if (
      (type === 'order' &&
        (status === 'completed' || status === 'cancelled')) ||
      (type === 'payment' && status === 'paid') ||
      (type === 'delivery' && status === 'delivered')
    ) {
      setPendingStatus(status);
      setPendingAction(type);

      if (type === 'order') {
        if (status === 'completed') {
          setModalConfig({
            title: 'Complete Order',
            description:
              'Marking the order as complete will send a confirmation to the customer and cannot be undone.',
            icon: (
              <CubeIcon className="w-[1.6rem] h-[1.7419rem] text-[#228403] mb-[0.8125rem] max-lg:w-[2.8988rem] max-lg:h-[2.2775rem]" />
            ),
          });
        } else if (status === 'cancelled') {
          setModalConfig({
            title: 'Cancel Order',
            description:
              'Cancelling this order will notify the customer. This action cannot be undone.',
            icon: (
              <XCircleIcon className="w-[1.6rem] h-[1.7419rem] text-[#E53535] mb-[0.8125rem]" />
            ),
          });
        }
      } else if (type === 'payment') {
        setModalConfig({
          title: 'Confirm Payment',
          description:
            'Marking the payment as paid will send a receipt to the customer and cannot be undone.',
          icon: (
            <CreditCardIcon className="w-[1.6rem] h-[1.7419rem] text-[#228403] mb-[0.8125rem] max-lg:w-[2.8988rem] max-lg:h-[2.2775rem]" />
          ),
        });
      } else if (type === 'delivery') {
        setModalConfig({
          title: 'Confirm Delivery',
          description:
            'Marking the order as delivered will notify the customer and cannot be undone.',
          icon: (
            <TruckIcon className="w-[1.6rem] h-[1.7419rem] text-[#5433EB] mb-[0.8125rem] max-lg:w-[2.8988rem] max-lg:h-[2.2775rem]" />
          ),
        });
      }

      setShowConfirmModal(true);
    } else {
      if (type === 'order') {
        setOrderStatus(status);
        updateStatus(status);
      } else if (type === 'payment') {
        setPaymentStatus(status);
        updatePayment(status);
      } else if (type === 'delivery') {
        setDeliveryStatus(status);
        updateDelivery(status);
      }
    }
  };

  const handleConfirmAction = () => {
    if (pendingAction === 'order') {
      setOrderStatus(pendingStatus);
      updateStatus(pendingStatus);
    } else if (pendingAction === 'payment') {
      setPaymentStatus(pendingStatus);
      updatePayment(pendingStatus);
    } else if (pendingAction === 'delivery') {
      setDeliveryStatus(pendingStatus);
      updateDelivery(pendingStatus);
    }
    setShowConfirmModal(false);
  };

  useEffect(() => {
    setOrderStatus(data?.data?.data?.status);
    setPaymentStatus(data?.data?.data?.paymentStatus);
    setDeliveryStatus(data?.data?.data?.deliveryStatus);
  }, [data]);

  const shareToWhatsApp = () => {
    const {
      orderNumber,
      items,
      totalAmount,
      phoneNumber,
      deliveryOption,
      deliveryFee,
      customer,
    } = order;
    const customerName =
      `${customer?.firstName || ''} ${customer?.lastName || ''}`.trim();
    const customerPhone = customer?.phone || phoneNumber;
    const customerAddress =
      customer?.addresses?.[0]?.address || 'No address provided';
    const itemDetails = items
      .map(
        item =>
          `📦 ${item.product.title.toLocaleString()} - ${item.quantity.toLocaleString()} x - NGN ${item.price.toLocaleString()}\n`
      )
      .join('\n');

    const message =
      paymentStatus === 'paid'
        ? `Hi ${customerName.toLocaleUpperCase()},\n\n` +
          `Please find the invoice for your order attached. Thank you for shopping with us, we appreciate your business!\n\n` +
          `🛍️ See invoice: ${import.meta.env.VITE_CUSTOMER_URL}/invoice/${order._id}\n\n` +
          `_Sent from Stur App_ : https://shop.stur.africa/${storeSlug}`
        : `Hi, here is the invoice of your order. Click the link to complete your payment:\n\n` +
          `${itemDetails}\n\n` +
          `${deliveryOption !== 'in_store' ? '*CUSTOMER INFO:*\n' : ''}` +
          `👤 *Customer Name:* ${customerName.toLocaleUpperCase()}\n` +
          `📞 *Phone:* ${customerPhone}\n\n` +
          `${
            deliveryOption !== 'in_store'
              ? `🏠 *Address:* ${customerAddress}\n`
              : ''
          }` +
          `🚚 *Delivery Fee:* NGN ${nigerianCurrencyFormat(deliveryFee)}\n` +
          `💰 *Total Price:* NGN ${totalAmount.toLocaleString()}\n\n` +
          `🛍️ See invoice: ${import.meta.env.VITE_CUSTOMER_URL}/invoice/${order._id}\n\n` +
          `Order ID: ${orderNumber}\n\n` +
          `_Sent from Stur App_ : https://shop.stur.africa/${storeSlug}`;

    const formattedNumber = (customer?.phone || phoneNumber).replace(
      /\D/g,
      ''
    );
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedNumber}&text=${encodeURIComponent(
      message
    )}`;
    // gaRecordEvent('ORDER', 'share_invoice');
    window.open(whatsappUrl, '_blank');
  };

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
          Order Details
        </h1>
      </div>

      <div className="p-1.2 md:p-[1.8rem]   overflow-y-auto ">
        <div className="p-1.2 md:p-[1.8rem]  w-[70%] max-2xl:w-[90%] mx-auto  transition-all duration-500 ease-in-out flex flex-col md:flex-row justify-between md:gap-[0.9375rem] md:items-center max-md:col-span-6 max-md:border-transparent max-md:rounded-lg">
          <div className="flex gap-[1.0625rem] items-center">
            <Avatar className="w-[3.4375rem] h-[3.4375rem]">
              {/* <AvatarImage src={userData?.store.storeLogoUrl} /> */}
            </Avatar>
            <div>
              <div>
                <p className="text-[#414552] text-[1.75rem] font-bold">
                  {/* {userData?.store?.storeName} */}
                </p>
              </div>
              <div className="flex gap-[0.75rem] items-center">
                <p className="text-[#6A7383] text-[0.875rem] font-normal">
                  {/* {userData?.store?.storeUrl} */}
                </p>
                <CopyIcon size={15} color="#5433EB" />
              </div>
            </div>
          </div>
          <Button className="w-[8.1875rem] h-[2.25rem] bg-[#30313D] rounded-[0.75rem] py-[0.5rem] px-[0.75rem]">
            Contact vendor
          </Button>
        </div>
        <div className="p-1.2 md:p-[1.8rem] grid grid-cols-3 max-lg:grid-cols-1 gap-4 w-[70%] max-2xl:w-[90%]  m-auto overflow-y-auto ">
          <div className="max-lg:col-span-3 col-span-2 w-full place-items-center mb-[7.6875rem] max-lg:mb-[1rem]">
            <Card className="p-4 space-y-4 w-full mb-[1.25rem]">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-[0.375rem]">
                  <Label className="text-sm font-semibold">
                    Order status
                  </Label>
                  <Select
                    value={orderStatus}
                    onValueChange={(status: string) =>
                      handleStatusChange(status, 'order')
                    }
                    disabled={
                      orderStatus === 'completed' ||
                      orderStatus === 'cancelled'
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {
                          statusOptions.find(
                            option => option.value === orderStatus
                          )?.label
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-[0.375rem]">
                  <Label className="text-sm font-semibold">
                    Delivery status
                  </Label>
                  <Select
                    value={deliveryStatus}
                    onValueChange={(status: string) =>
                      handleStatusChange(status, 'delivery')
                    }
                    disabled={
                      deliveryStatus === 'delivered' ||
                      orderStatus === 'cancelled'
                    }
                  >
                    <SelectTrigger className="w-full data-[disabled]:opacity-75 data-[disabled]:cursor-not-allowed">
                      <SelectValue>
                        {
                          deliveryOptions.find(
                            option => option.value === deliveryStatus
                          )?.label
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryOptions.map(option => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
            <Card className="p-6 w-full border rounded-[0.75rem] ">
              <InvoiceSummary orderData={order} isLoading={isLoading} />
            </Card>
          </div>
          <div className="space-y-6 w-full place-items-center max-lg:col-span-3 max-lg:mb-20">
            <Card className="p-4 w-full">
              <CustomerInfoSummary
                orderData={order}
                isLoading={isLoading}
              />
            </Card>
            <Card className="w-full p-4">
              <DeliveryAddressSummary
                orderData={order}
                isLoading={isLoading}
              />
            </Card>
          </div>
        </div>
      </div>

      <ConfirmActionModal
        open={showConfirmModal}
        onOpenChange={setShowConfirmModal}
        onConfirm={handleConfirmAction}
        title={modalConfig.title}
        description={modalConfig.description}
        icon={modalConfig.icon}
      />
    </div>
  );
};

export default OrderSummary;

const BankCard = () => {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.75 1.875C1.92157 1.875 1.25 2.54657 1.25 3.375V3.75H11.75V3.375C11.75 2.54657 11.0784 1.875 10.25 1.875H2.75Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.75 4.875H1.25V8.625C1.25 9.45343 1.92157 10.125 2.75 10.125H10.25C11.0784 10.125 11.75 9.45343 11.75 8.625V4.875ZM2.75 6.75C2.75 6.54289 2.91789 6.375 3.125 6.375H6.125C6.33211 6.375 6.5 6.54289 6.5 6.75C6.5 6.95711 6.33211 7.125 6.125 7.125H3.125C2.91789 7.125 2.75 6.95711 2.75 6.75ZM3.125 7.875C2.91789 7.875 2.75 8.04289 2.75 8.25C2.75 8.45711 2.91789 8.625 3.125 8.625H4.625C4.83211 8.625 5 8.45711 5 8.25C5 8.04289 4.83211 7.875 4.625 7.875H3.125Z"
        fill="white"
      />
    </svg>
  );
};
