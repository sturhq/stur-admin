import {Card} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {Trash2} from 'lucide-react';

import ImageComponent from '@/components/organisms/ImageComponent';
import {nigerianCurrencyFormat} from '@/lib/utils';
import googleicon from '@/assets/images/googleicon.svg';
import {StandaloneSearchBox} from '@react-google-maps/api';
import {useRef, useState} from 'react';
import {LoadScript} from '@react-google-maps/api';
import {Spinner} from '@/components/ui/spinner';
import {PhoneNumberInput} from '@/components/ui/phone-number-input';
import {Label} from '@/components/ui/label';
import {useUser} from '@/hooks/useUser';
import banner from '../../../assets/images/banner.png';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {CustomFileUploader} from '@/components/organisms/CustomFileUploader';
import {SettingsLogoUploader} from '@/components/organisms/SettingsLogoUploader';
import {Textarea} from '@/components/ui/textarea';
import SuccessScreen from './SuccessScreen';
import React from 'react';
import {useNavigate} from 'react-router-dom';

interface OrderProps {
  customerName: string;
  setCustomerName: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  email: string;
  setEmail: (email: string) => void;
  lga: string;
  setLga: (lga: string) => void;
  state: string;
  setState: (state: string) => void;
  address: string;
  setAddress: (address: string) => void;
  deliveryArea: string;
  setDeliveryArea: (area: string) => void;
}

const DetailedStore = () => {
  const [isSuccess, setIsSuccess] = useState(true);
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {isSuccess ? (
        <SuccessScreen />
      ) : (
        <div className="p-[1.07rem] max-lg:py-[1.07rem] max-w-[46.437rem] max-lg:w-full flex flex-col gap-[1.56rem] mx-auto pb-24">
          <div className="text-center">
            <p className="text-[1.75rem] font-bold text-[#30313D]">
              Provide stur information
            </p>
            <p className=" mx-[9.8125rem] text-[0.875rem] font-normal text-[#6A7383]">
              Share key details about your store to help potential
              customers find and shop with you easily.
            </p>
          </div>
          <div className="relative h-[15.625rem] max-lg:h-[8.3rem] w-full bg-[#F6F8FA] ">
            <div className="absolute top-0 left-0 h-full w-full rounded-[15px]">
              <img
                src={banner}
                alt="sample"
                className="absolute h-[15.625rem] max-lg:h-[8.3rem] w-full object-cover rounded-[15px]"
              />
            </div>
            <SettingsLogoUploader
              acceptedFileTypes={[
                'image/png',
                'image/jpeg',
                'image/jpg',
                'image/webp',
              ]}
              className="md:w-[10rem] h-16 min-h-16 md:h-24 md:min-h-24"
              imagePreviewClassName="md:w-[10rem] h-16 min-h-16 md:h-24 md:min-h-24"
              //   onFileSelect={val => handleSelectedFile(val, 'logo')}
              //   isUploading={type === 'logo' && (isPending || isUpdatingStore)}
              maxSize={10 * 1024 * 1024}
              logoUrl={''}
            />
            <div className="absolute right-3 md:right-7 max-md:top-3 md:bottom-[11.75rem]">
              <CustomFileUploader
                acceptedFileTypes={[
                  'image/png',
                  'image/jpeg',
                  'image/jpg',
                  'image/webp',
                ]}
                className="w-[10rem] h-24 min-h-24"
                imagePreviewClassName="w-[10rem] h-24 min-h-24"
                // onFileSelect={val => handleSelectedFile(val, 'banner')}
                // isUploading={isPending}
                maxSize={10 * 1024 * 1024}
                isOnboarding
                customButton
                // isCustomUpdating={
                //   type === 'banner' && (isPending || isUpdatingStore)
                // }
              />
            </div>
          </div>
          <Card className="p-4 w-full flex flex-col gap-[1.25rem] border  text-sm">
            {/* <Input
          label="Name"
          placeholder="Enter name"
          //   value={customerName}
          //   onChange={e => setCustomerName(e.target.value)}
        />
        <div className="flex flex-col gap-4">
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <div className="w-full">
              <Label>Phone Number</Label>
              <PhoneNumberInput
                placeholder="Whatsapp number"
                defaultCountry="NG"
                international
                // value={phoneNumber}
                // onChange={value => setPhoneNumber(value)}
                maxLength={17}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Input
                label="Email address (optional)"
                // value={email}
                // onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div> */}
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="name"
                className="text-[#30313D] font-semibold text-[0.875rem]"
              >
                Store Name*
              </Label>
              <Input id="name" placeholder="" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="framework"
                className="text-[#30313D] font-semibold text-[0.875rem]"
              >
                What type of business do you operate?
              </Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="FOOD_AND_BEVERAGES">
                    Food & Beverages (Cafes, Restaurants, Bars)
                  </SelectItem>
                  <SelectItem value="FASHION_AND_BEAUTY">
                    Fashion & Beauty (Makeup, hair, bags)
                  </SelectItem>
                  <SelectItem value="GROCERY">
                    Grocery (Fruits & Vegetables, Butchery)
                  </SelectItem>
                  <SelectItem value="RETAIL">
                    Retail (Ecommerce, Home & Living, etc.)
                  </SelectItem>
                  <SelectItem value="B2B">
                    B2B (Wholesale, Supplier, etc.)
                  </SelectItem>
                  <SelectItem value="DIGITAL_CREATORS">
                    Digital Creators (Events, Tickets, Courses)
                  </SelectItem>
                  <SelectItem value="SERVICE">
                    Service (Spa, Salon, etc.)
                  </SelectItem>
                  <SelectItem value="OTHERS">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="name"
                className="text-[#30313D] font-semibold text-[0.875rem]"
              >
                Email address*
              </Label>
              <Input id="name" placeholder="" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="name"
                className="text-[#30313D] font-semibold text-[0.875rem]"
              >
                Whatsapp Number*
              </Label>
              <Input id="name" placeholder="" />
            </div>
            <Textarea
              label="Store Description*"
              placeholder="Tell us about your stur"
              className="h-24 text-[#30313D] font-semibold text-[0.875rem] "
              //   onChange={e => handleDescriptionChange(e.target.value)}
              value={''}
              mainClass=""
            />
          </Card>
          <Button
            className="w-full bg-[#30313D] py-[0.5625rem] px-[1rem] rounded-[0.75rem] h-[2.625rem] text-[1rem] font-semibold"
            // onClick={() => navigate('products/add-product')}
          >
            Create stur
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default DetailedStore;
