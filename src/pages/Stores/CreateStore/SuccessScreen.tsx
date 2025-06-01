import {Card} from '@/components/ui/card';
import React from 'react';
import confetti from '@/assets/images/confetti.png';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
// import {useUser} from '@/hooks/useUser';
import {
  ArrowTopRightOnSquareIcon,
  LinkIcon,
} from '@heroicons/react/24/solid';
import whatsapp from '@/assets/images/whatsapp.svg';
import facebook from '@/assets/images/facebook.svg';
import instagram from '@/assets/images/instagram.svg';
import twitter from '@/assets/images/twitter.svg';
import {Copy} from 'lucide-react';
import {StoreFormData} from './DetailedStore';
// import {useSendToWhatsapp} from '@/services/orders.service';
type SuccessScreenProps = {
  storeData: StoreFormData;
  returnedData?: StoreFormData;
};

const SuccessScreen = ({storeData, returnedData}: SuccessScreenProps) => {
  const generateStoreSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '') // remove spaces
      .replace(/[^a-z0-9]/g, ''); // remove non-alphanumeric
  };

  const storeSlug = generateStoreSlug(storeData.storeName);
  const storeUrl = `${import.meta.env.VITE_CUSTOMER_URL}/${storeSlug}`;
  // const {userData} = useUser();

  const navigate = useNavigate();
  // const whatsappPhoneNumber = userData?.store?.phoneNumber;
  // const storeSlug = userData?.store?.storeSlug;

  return (
    <div>
      <div className="mx-auto max-w-[46.375rem] px-4">
        <div className="flex flex-col items-center  justify-center gap-1">
          <img src={confetti} alt="success" className="w-12 h-12" />
          <p className="text-[1.75rem] text-center font-bold">
            Store created successfully
          </p>
          <p className="text-sm text-center max-w-[400px] mx-auto text-[#6A7383]">
            Make your store visible on your social media and website
          </p>
        </div>
        <div className="flex flex-col gap-[1.0625rem]">
          <Card className="p-4 w-full flex justify-between items-center border rounded-[0.9375rem] mt-[2.125rem]">
            <div className="flex gap-[0.875rem]">
              <LinkIcon className="w-[1.375rem] h-[1.375rem]" />
              <div className="font-semibold text-[0.875rem] text-[#30313D]">
                {/* https://stur.africa/lasolasHQ */}
                {storeUrl}
              </div>
            </div>
            <div>
              <Copy size={20} />
            </div>
          </Card>
          <Card className="p-4 w-full flex justify-between items-center border rounded-[0.9375rem]">
            <div className="flex gap-[0.875rem]">
              <img src={whatsapp} alt="" />
              <div className="font-normal text-[0.875rem] text-[#30313D]">
                Share on whatsapp
              </div>
            </div>
            <div>
              <ArrowTopRightOnSquareIcon className="w-[1.375rem] h-[1.375rem]" />
            </div>
          </Card>
          <Card className="p-4 w-full flex justify-between items-center border rounded-[0.9375rem] ">
            <div className="flex gap-[0.875rem]">
              <img src={facebook} alt="" />
              <div className="font-normal text-[0.875rem] text-[#30313D]">
                Share on Facebook
              </div>
            </div>
            <div>
              <ArrowTopRightOnSquareIcon className="w-[1.375rem] h-[1.375rem]" />
            </div>
          </Card>
          <Card className="p-4 w-full flex justify-between items-center border rounded-[0.9375rem] ">
            <div className="flex gap-[0.875rem]">
              <img src={instagram} alt="" />
              <div className="font-normal text-[0.875rem] text-[#30313D]">
                Share on Instagram
              </div>
            </div>
            <div>
              <ArrowTopRightOnSquareIcon className="w-[1.375rem] h-[1.375rem]" />
            </div>
          </Card>
          <Card className="p-4 w-full flex justify-between items-center border rounded-[0.9375rem] ">
            <div className="flex gap-[0.875rem]">
              <img src={twitter} alt="" />
              <div className="font-normal text-[0.875rem] text-[#30313D]">
                Share on Twitter
              </div>
            </div>
            <div>
              <ArrowTopRightOnSquareIcon className="w-[1.375rem] h-[1.375rem]" />
            </div>
          </Card>
        </div>
        <Button
          className="w-full bg-[#30313D] mt-[1.5625rem] rounded-[0.75rem] font-normal text-[0.875rem] text-[#FFFFFF] mb-[20rem]"
          onClick={() =>
            navigate(`/products/add-product?storeId=${returnedData?._id}`)
          }
        >
          Add product
        </Button>
      </div>
    </div>
  );
};

export default SuccessScreen;
