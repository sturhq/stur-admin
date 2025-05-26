import {Card} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {MultipleFileUploader} from '@/components/organisms/MultipleFileUploader';
import {useCloudinaryUpload} from '@/services/fileupload.service';
import {toast} from '@/hooks/use-toast';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
// import AddCategoryModal from './AddCategoryModal';
import {useUser} from '@/hooks/useUser';

import {Spinner} from '@/components/ui/spinner';
import {NumericFormat} from 'react-number-format';
import {UnitsOptions} from './Units';
import {CustomFileUploader} from '@/components/organisms/CustomFileUploader';
import clsx from 'clsx';
import AddOption from './AddOption';
import {ChevronRightIcon} from '@heroicons/react/24/solid';
import AddCategoryModal from './AddCategoryModal';

type PRICINGTYPES = {
  price: number;
  discountAmount?: number;
  stockQuantity: number;
  unit: string;
};

interface DetailsProps {
  setPreviewMedia: (url: string | null) => void;
  setDetails: (details) => void;
  details: {
    subCategory: string;
    category: string;
    description: string;
    title: string;
    media: string[];
    options: Array<{
      name: string;
      required: boolean;
      // Add other option properties as needed
    }>;
  };
  setPricing: (pricing: PRICINGTYPES) => void;
  pricing: {
    price: number;
    discountAmount?: number;
    stockQuantity: number;
    unit: string;
  };
  isOnboarding?: boolean;
  mainClass?: string;
}

const Details = ({
  details,
  setDetails,
  setPreviewMedia,
  setPricing,
  pricing,
  isOnboarding,
  mainClass,
}: DetailsProps) => {
  const {userData} = useUser();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [returnedUrls, setReturnedUrls] = useState<string[]>([]);
  const [unitType, setUnitType] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | null
  >(null);
  const [editingOption, setEditingOption] = useState(null);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [triggerOptionModal, setTriggerOptionModal] = useState(false);

  // Handle clicking on an existing option
  const handleOptionClick = (option, index) => {
    setEditingOption(option);
    setEditingIndex(index);
    setTriggerOptionModal(true);
  };

  // Reset editing state
  const handleEditComplete = () => {
    setEditingOption(null);
    setEditingIndex(-1);
    setTriggerOptionModal(false);
  };

  // Get category

  //   const categories = categoriesData?.data?.data;

  // Cloudinary upload mutation

  const cloudData = queryClient.getQueryData(['presigned-url', 1]);

  return (
    <Card
      className={clsx(
        mainClass,
        'max-lg:p-0  p-[1.07rem] max-lg:py-[1.07rem] w-full flex flex-col gap-4 md:border border-0'
      )}
    >
      {!isOnboarding && (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-[15px] border border-[#EBEEF1] overflow-x-hidden">
          <Label>Media</Label>
          <MultipleFileUploader
            innerClass="!mt-0"
            description="Upload"
            acceptedFileTypes={[
              'image/png',
              'image/jpeg',
              'image/jpg',
              'image/webp',
            ]}
            // isUploading={isPending}
            maxSize={10 * 1024 * 1024}
            // onFileSelect={(files: File[]) => {
            //   const lastFile = files[files.length - 1]; // Get the last added file
            //   if (lastFile) {
            //     uploadFile(lastFile);
            //   }
            // }}
            onFileRemove={(removedIndex: number) => {
              setReturnedUrls(prev =>
                prev.filter((_, index) => index !== removedIndex)
              );
            }}
          />
        </div>
      )}
      <div
        className={clsx(
          !isOnboarding &&
            'flex flex-col gap-y-4 bg-white border border-[#EBEEF1] p-4 rounded-[15px]'
        )}
      >
        <Input
          label={isOnboarding ? '' : 'Item *'}
          placeholder="Enter item name"
          //   onChange={e => handleNameChange(e.target.value)}
          value={details.title}
        />

        {!isOnboarding && (
          <div className="flex flex-col gap-2 w-full">
            <Label>Category (Optional)</Label>
            <Select
              //   onValueChange={handleCategoryChange}
              value={details.category}
              //   disabled={isLoading}
            >
              <SelectTrigger>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <SelectValue>
                    {details.category
                      ? details.category.charAt(0).toUpperCase() +
                        details.category.slice(1)
                      : 'Category'}
                  </SelectValue>
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>Select Category</SelectItem>
                {/* {categories?.map(category => (
                  <SelectItem key={category._id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))} */}
                <SelectItem value="FASHION_AND_BEAUTY">
                  Fashion & Beauty (Makeup, hair, bags)
                </SelectItem>
                <div className="flex justify-center py-3 bg-[#F6F8FA]">
                  <AddCategoryModal />
                </div>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div
        className={clsx(
          'flex flex-col gap-4',
          !isOnboarding &&
            'bg-white border border-[#EBEEF1] p-4 rounded-[15px]'
        )}
      >
        <div className=" flex gap-4 flex-row">
          <div className="w-full">
            {!isOnboarding && <Label htmlFor="price">Price *</Label>}
            <NumericFormat
              placeholder="NGN"
              onValueChange={values => {
                setPricing({...pricing, price: values.floatValue});
              }}
              value={pricing.price}
              type="text"
              className="w-full"
              prefix="₦"
              thousandSeparator={true}
              decimalScale={2}
              allowNegative={false}
              customInput={Input}
            />
          </div>
          <div className="w-full">
            {!isOnboarding && (
              <Label htmlFor="price">Discount Amount (Optional)</Label>
            )}
            <NumericFormat
              placeholder="NGN"
              // onValueChange={values => {
              //   if (
              //     values.floatValue === undefined ||
              //     (pricing.price && values.floatValue <= pricing.price)
              //   ) {
              //     setPricing({
              //       ...pricing,
              //       discountAmount: values.floatValue,
              //     });
              //   }
              // }}
              onValueChange={values => {
                if (values.floatValue === undefined) {
                  setPricing({...pricing, discountAmount: undefined});
                  return;
                }

                if (pricing.price && values.floatValue > pricing.price) {
                  return;
                }

                setPricing({
                  ...pricing,
                  discountAmount: values.floatValue,
                });
              }}
              isAllowed={values => {
                return (
                  values.floatValue === undefined ||
                  !pricing.price ||
                  values.floatValue < pricing.price
                );
              }}
              value={pricing.discountAmount}
              type="text"
              className="w-full"
              prefix="₦"
              thousandSeparator={true}
              decimalScale={2}
              allowNegative={false}
              customInput={Input}
            />
          </div>
        </div>
        {!isOnboarding && (
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <Input
              label="Stock Quantity *"
              placeholder="Enter stock quantity"
              //   onChange={handleStockQuantityChange}
              value={pricing.stockQuantity}
              type="number"
              inputMode="numeric"
            />

            <div className="flex flex-col gap-2 w-full">
              <Label>Unit (Optional)</Label>
              <Select onValueChange={setUnitType} value={unitType}>
                <SelectTrigger>
                  <SelectValue>
                    {unitType ? unitType : 'Select unit'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {UnitsOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {!isOnboarding && (
        <Textarea
          label="Product description (Optional)"
          placeholder=""
          className="h-24"
          //   onChange={e => handleDescriptionChange(e.target.value)}
          value={details.description}
          mainClass="bg-white border border-[#EBEEF1] p-4 rounded-[15px]"
        />
      )}
      {!isOnboarding && (
        <div>
          <div className="font-semibold text-[#30313D]">
            Options{' '}
            <span className="text-[#6A7383] font-normal">
              (Does this product have variations like Colours, Sizes, etc?)
            </span>
          </div>
          <Card className="rounded-[0.75rem] w-full mt-[0.9375rem]">
            <div className="flex flex-col border-b">
              {details.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b p-4 last:border-b-0 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleOptionClick(option, index)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{option.name}</span>
                    {option.required && (
                      <span className="text-xs text-gray-500">
                        (Required)
                      </span>
                    )}
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-[#6A7383]" />
                </div>
              ))}
            </div>
            <div className="p-4">
              <AddOption
                // @ts-expect-error - details is not defined
                details={details}
                setDetails={setDetails}
                editingOption={editingOption}
                editingIndex={editingIndex}
                triggerOpen={triggerOptionModal}
                onEditComplete={handleEditComplete}
              />
            </div>
          </Card>
        </div>
      )}
      {isOnboarding && (
        <div className="flex gap-4">
          <CustomFileUploader
            acceptedFileTypes={[
              'image/png',
              'image/jpeg',
              'image/jpg',
              'image/webp',
            ]}
            className="w-[10rem] h-24 min-h-24"
            imagePreviewClassName="w-[10rem] h-24 min-h-24"
            // onFileSelect={handleSelectedFile}
            // isUploading={isPending}
            maxSize={10 * 1024 * 1024}
            isOnboarding
          />
        </div>
      )}
    </Card>
  );
};

export default Details;
