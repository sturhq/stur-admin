import {Card} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {Trash2} from 'lucide-react';
import SelectProduct from './SelectProduct';
import {useSelectedOrderProducts} from '@/zustand/orders';
import ImageComponent from '@/components/organisms/ImageComponent';
import {nigerianCurrencyFormat} from '@/lib/utils';
import googleicon from '@/assets/images/googleicon.svg';
import {StandaloneSearchBox} from '@react-google-maps/api';
import {useRef} from 'react';
import {LoadScript} from '@react-google-maps/api';
import {Spinner} from '@/components/ui/spinner';
import {PhoneNumberInput} from '@/components/ui/phone-number-input';
import {Label} from '@/components/ui/label';
import {useUser} from '@/hooks/useUser';
import {useGetDeliveryAreas} from '@/services/orders.service';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

const DetailedOrder = ({
  customerName,
  setCustomerName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  setLga,
  setState,
  address,
  setAddress,
  deliveryArea,
  setDeliveryArea,
}: OrderProps) => {
  const {userData} = useUser();
  const inputRef = useRef(null);
  const selectedProducts = useSelectedOrderProducts(
    state => state.selectedItems
  );
  const removeSelectedItem = useSelectedOrderProducts(
    state => state.removeSelectedItem
  );
  const updateQuantity = useSelectedOrderProducts(
    state => state.updateQuantity
  );

  const handleQuantityChange = (itemId: string, increment: boolean) => {
    const item = selectedProducts.find(product => product?._id === itemId);
    if (item) {
      const currentQuantity = item?.quantity || 1;
      const newQuantity = increment
        ? currentQuantity + 1
        : Math.max(1, currentQuantity - 1);
      updateQuantity(itemId, newQuantity);
    }
  };

  const handlePlaceChange = () => {
    const places = inputRef?.current?.getPlaces();
    if (places && places?.length > 0) {
      const place = places[0];
      setAddress(place?.formatted_address || '');
      // set lga with administrative_area_level_2
      const lga = place?.address_components?.find(component =>
        component?.types?.includes('administrative_area_level_2')
      );
      setLga(lga?.long_name || '');
      // set state with administrative_area_level_1
      const state = place?.address_components?.find(component =>
        component?.types?.includes('administrative_area_level_1')
      );

      setState(state?.long_name || '');
    }
  };

  const {data, isPending} = useGetDeliveryAreas(userData?.store?._id);

  const deliveryAreas = data?.data?.data || [];

  return (
    <div className="p-[1.07rem] max-lg:py-[1.07rem] max-w-[46.437rem] max-lg:w-full flex flex-col gap-[1.25rem] mx-auto">
      <Card className="p-4 w-full flex flex-col gap-[1.25rem] border  text-sm">
        <Input
          label="Name"
          placeholder="Enter name"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
        />
        <div className="flex flex-col gap-4">
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <div className="w-full">
              <Label>Phone Number</Label>
              <PhoneNumberInput
                placeholder="Whatsapp number"
                defaultCountry="NG"
                international
                value={phoneNumber}
                onChange={value => setPhoneNumber(value)}
                maxLength={17}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Input
                label="Email address (optional)"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 w-full flex flex-col gap-4 border">
        <h2 className="text-sm font-semibold">Items</h2>
        <div className="pb-4">
          <SelectProduct />
        </div>
        <div className="flex flex-col gap-4">
          {selectedProducts?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-t py-4 pl-1"
            >
              <div className="flex items-center gap-[0.45rem]">
                <div>
                  <ImageComponent
                    src={item?.previewMedia}
                    alt="Item"
                    className="w-12 h-12  rounded-md"
                    placeholderClass="w-8 h-8"
                  />
                </div>
                <div>
                  <div>{item?.title}</div>
                  <div className="flex gap-[0.4338rem]">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#F6F8FA] rounded-[15rem] px-[11.89px] py-[2.97px] w-[1.6106rem] h-[1.6106rem]"
                      onClick={() =>
                        item?._id && handleQuantityChange(item._id, true)
                      }
                    >
                      +
                    </Button>

                    <div className="w-fit h-[1.62rem] rounded-lg border flex items-center justify-between px-2">
                      <span className="font-bold pr-2">
                        {item.quantity || 1}
                      </span>
                      <Separator orientation="vertical" />
                      <span className="font-semibold pl-2">
                        {nigerianCurrencyFormat(
                          item.price * (item.quantity || 1)
                        )}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="default"
                      className="bg-[#F6F8FA] rounded-[15rem] px-[11.89px] py-[2.97px] w-[1.6106rem] h-[1.6106rem]"
                      onClick={() =>
                        item?._id && handleQuantityChange(item._id, false)
                      }
                      disabled={(item.quantity || 1) <= 1}
                    >
                      -
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                className=" bg-white"
                onClick={() => removeSelectedItem(item._id)}
              >
                <Trash2 size={20} stroke="#DF1B41" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 w-full flex flex-col gap-4 border mb-[7.388rem] rounded-[0.75rem]">
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_APIKEY}
          libraries={['places']}
          loadingElement={<Spinner />}
        >
          <div className="flex flex-col gap-1">
            <StandaloneSearchBox
              onLoad={ref => {
                inputRef.current = ref;
              }}
              onPlacesChanged={handlePlaceChange}
            >
              <Input
                type="text"
                value={address}
                label="Delivery Address"
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full"
              />
            </StandaloneSearchBox>
            <div className="flex justify-start items-center gap-2">
              <img src={googleicon} alt="google icon" />
              <p className="text-xs text-gray-500 uppercase">
                Powered by Google Maps
              </p>
            </div>
          </div>
        </LoadScript>
        <Separator orientation="horizontal" />

        {isPending ? (
          <div className="flex items-center justify-center h-10">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Label>
              Delivery Area {deliveryAreas?.length === 0 && ' : Free'}
            </Label>
            {deliveryAreas?.length > 0 && (
              <Select
                onValueChange={value => setDeliveryArea(value)}
                defaultValue={deliveryArea}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select delivery area" />
                </SelectTrigger>
                <SelectContent>
                  {deliveryAreas?.map((area, index) => (
                    <SelectItem
                      key={index}
                      value={area?._id}
                      className="text-sm"
                    >
                      {area?.name} - {nigerianCurrencyFormat(area?.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DetailedOrder;
