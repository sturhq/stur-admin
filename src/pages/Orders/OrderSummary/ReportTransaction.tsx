import {Button} from '@/components/ui/button';

const ReportTransaction = ({orderData}) => {
  const message = `Payment Confirmation Issue – Order ID: ${orderData?.orderNumber || 'N/A'}

Hello Stur Support,

I'm currently experiencing an issue confirming a customer's payment. Kindly review the order details below and advise on the next steps.

Store Name: ${orderData?.store?.storeName || 'N/A'}
Order ID: ${orderData?.orderNumber || 'N/A'}
Amount: NGN ${orderData?.totalAmount?.toLocaleString() || 'N/A'}

You can view the invoice here:
${import.meta.env.VITE_CUSTOMER_URL}/invoice/${orderData?._id || ''}

Thank you for your assistance.`;
  const formattedNumber = '+234 903 629 0986';
  const cleanNumber = formattedNumber.replace(/\D/g, '');
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;

  return (
    <div className="flex flex-col gap-[1.0625rem] w-full">
      <div className="flex gap-[0.5rem] flex-col">
        <h2 className="text-sm font-bold">Report Transaction</h2>
        <p className="text-[#6A7383] font-normal">
          Having trouble with a pending transaction? Our support team is
          here to help
        </p>
      </div>
      <div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open(whatsappUrl, '_blank')}
        >
          Contact support
        </Button>
      </div>
    </div>
  );
};

export default ReportTransaction;
