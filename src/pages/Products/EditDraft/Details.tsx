import {Card} from '@/components/ui/card.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import {Label} from '@/components/ui/label.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Textarea} from '@/components/ui/textarea.tsx';
import {MultipleFileUploader} from '@/components/organisms/MultipleFileUploader.tsx';
import {useCloudinaryUpload} from '@/services/fileupload.service.ts';
import {toast} from '@/hooks/use-toast.ts';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import AddCategoryModal from './AddCategoryModal.tsx';
import {useUser} from '@/hooks/useUser.tsx';
import {useGetCategories} from '@/services/products.service.ts';
import {Spinner} from '@/components/ui/spinner.tsx';

import {ChevronRightIcon, X} from 'lucide-react';
import {UnitsOptions} from './Units.ts';
import {NumericFormat} from 'react-number-format';
import clsx from 'clsx';
import AddOption from './AddOption.tsx';

type PRICINGTYPES = {
  price: number;
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
  };
  setPricing: (pricing: PRICINGTYPES) => void;
  pricing: {
    price: number;
    stockQuantity: number;
    unit: string;
  };
  mainClass?: string;
}

const Details = ({
  details,
  setDetails,
  setPreviewMedia,
  setPricing,
  pricing,
  mainClass,
}: DetailsProps) => {
  const {userData} = useUser();
  const queryClient = useQueryClient();
  const [returnedUrls, setReturnedUrls] = useState<string[]>(
    details.media ?? []
  );
  const [unitType, setUnitType] = useState<string>(pricing.unit ?? '');
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | null
  >(null);
  const [editingOption, setEditingOption] = useState(null);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [triggerOptionModal, setTriggerOptionModal] = useState(false);

  const cloudData = queryClient.getQueryData(['presigned-url', 1]);

  // Get category
  const {
    data: categoriesData,
    error,
    isLoading,
    refetch,
  } = useGetCategories(userData?.store._id);

  const categories = categoriesData?.data?.data;

  // Cloudinary upload mutation
  const {mutateAsync, isPending} = useCloudinaryUpload(
    // @ts-expect-error - data is not defined
    cloudData?.data.data.url,
    // @ts-expect-error - data is not defined
    cloudData?.data.data.apiKey,
    // @ts-expect-error - data is not defined
    cloudData?.data.data.timestamp,
    // @ts-expect-error - data is not defined
    cloudData?.data.data.signature
  );

  // get selected category id and set it to state
  useEffect(() => {
    if (categories) {
      const selectedCategory = categories.find(
        category => category.name === details.category
      );
      setSelectedCategoryId(selectedCategory?._id);
    }
  }, [categories, details.category]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'An error occurred',
        description: 'Failed to get categories',
        variant: 'destructive',
      });
    }
  }, [error]);

  useEffect(() => {
    if (selectedCategoryId) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);

  // Update the combined unit value whenever unitValue or unitType changes
  useEffect(() => {
    if (unitType) {
      setPricing({...pricing, unit: unitType});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitType]);

  useEffect(() => {
    if (pricing.unit) {
      setUnitType(pricing.unit);
    }
  }, [pricing.unit]);

  const handleReturnedUrls = (urls: string[]) => {
    setDetails(prev => ({...prev, media: urls}));
    setPreviewMedia(urls[0]);
  };

  // File upload handler
  const uploadFile = async (file: File) => {
    if (!file) return;

    try {
      const response = await mutateAsync(file);
      const newUrls = [...returnedUrls, response.secure_url];
      setReturnedUrls(newUrls);
      handleReturnedUrls(newUrls);
      toast({
        title: 'Upload Successful',
        description: 'Preview image uploaded',
        variant: 'success',
      });

      return response;
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description:
          error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
      console.error(error);
    }
  };

  // update returnedUrls when details.media initially
  useEffect(() => {
    if (details.media.length > 0) {
      setReturnedUrls(details.media);
    }
  }, [details.media]);

  // Handlers

  const handleStockQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPricing({...pricing, stockQuantity: Number(e.target.value)});
  };

  const handleCategoryChange = (category: string) => {
    setDetails(prev => ({...prev, category}));
  };

  const handleNameChange = (title: string) => {
    setDetails(prev => ({...prev, title}));
  };

  const handleDescriptionChange = (description: string) => {
    setDetails(prev => ({...prev, description}));
  };

  const handleFileRemove = (removedIndex: number) => {
    const newUrls = returnedUrls.filter(
      (_, index) => index !== removedIndex
    );
    setReturnedUrls(newUrls);
    handleReturnedUrls(newUrls);
  };

  const handleFileSelect = (files: File[]) => {
    const lastFile = files[files.length - 1]; // Get the last added file
    if (lastFile) {
      uploadFile(lastFile);
    }
  };

  // Reset editing state
  const handleEditComplete = () => {
    setEditingOption(null);
    setEditingIndex(-1);
    setTriggerOptionModal(false);
  };

  // Handle clicking on an existing option
  const handleOptionClick = (option, index) => {
    setEditingOption(option);
    setEditingIndex(index);
    setTriggerOptionModal(true);
  };

  return (
    <Card
      className={clsx(
        mainClass,
        'p-[1.07rem] max-lg:py-[1.07rem] w-full flex flex-col gap-4 md:border border-0'
      )}
    >
      <div className="flex flex-col gap-4 bg-white p-4 rounded-[15px] border border-[#EBEEF1]">
        <div className="flex gap-4 items-center">
          <Label>Media (Optional)</Label>
          {isPending && <Spinner />}
        </div>

        <div className="lg:w-full max-lg:max-w-5xl overflow-x-auto hidden-scrollbar">
          <div className="flex items-center lg:grid lg:grid-cols-5 gap-4 max-lg:min-w-fit">
            {details.media.length > 0 &&
              details.media.map((media, index) => (
                <div
                  key={`${media}-${index}`}
                  className="relative w-[7.063rem] h-[7.063rem] lg:col-span-1"
                >
                  <img
                    src={media}
                    alt={media}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    onClick={() => handleFileRemove(index)}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            {details?.media?.length < 5 && (
              <MultipleFileUploader
                description="Upload"
                acceptedFileTypes={[
                  'image/png',
                  'image/jpeg',
                  'image/jpg',
                  'image/webp',
                ]}
                isUploading={isPending}
                onFileSelect={handleFileSelect}
                // onFileRemove={handleFileRemove}
                showPreview={false}
                // 2mb
                maxSize={10 * 1024 * 1024}
                externalScroll
                // initialFiles={details.media}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 bg-white border border-[#EBEEF1] p-4 rounded-[15px]">
        <Input
          label="Item"
          placeholder="Enter item name"
          onChange={e => handleNameChange(e.target.value)}
          value={details.title}
        />

        <div className="flex flex-col gap-2 w-full">
          <Label>Category *</Label>
          <Select
            onValueChange={handleCategoryChange}
            value={details.category}
            disabled={isLoading}
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
              {categories?.map(category => (
                <SelectItem key={category._id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
              <div className="flex justify-center py-3 bg-[#F6F8FA]">
                <AddCategoryModal />
              </div>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white border border-[#EBEEF1] p-4 rounded-[15px]">
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="price">Price *</Label>
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
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <Input
            label="Stock Quantity *"
            placeholder="Enter stock quantity"
            onChange={handleStockQuantityChange}
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
      </div>

      <Textarea
        label="Product description (Optional)"
        placeholder="Enter product description"
        className="h-24"
        onChange={e => handleDescriptionChange(e.target.value)}
        value={details.description}
        mainClass="bg-white border border-[#EBEEF1] p-4 rounded-[15px]"
      />
      <div>
        <div className="font-semibold text-[#30313D]">
          Options{' '}
          <span className="text-[#6A7383] font-normal">
            (Does this product have variations like Colours, Sizes, etc?)
          </span>
        </div>
        <Card className="rounded-[0.75rem] w-full mt-[0.9375rem]">
          <div className="flex flex-col border-b">
            {/* @ts-expect-error - details.options might not be defined in the interface */}
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
              // @ts-expect-error - details.options might not be defined in the interface
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
    </Card>
  );
};

export default Details;
