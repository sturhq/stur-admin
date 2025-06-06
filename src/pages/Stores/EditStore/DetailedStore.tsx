import {useState, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import {CustomFileUploader} from '@/components/organisms/CustomFileUploader';
import {Card} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {SettingsLogoUploader} from '@/components/organisms/SettingsLogoUploader';
import {useEditStore, useGetStoreById} from '@/services/stores.services';
import banner from '../../../assets/images/banner.png';
import {useCloudinaryUpload} from '@/services/fileupload.service';
import {toast} from '@/hooks/use-toast';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigate, useParams} from 'react-router-dom';

export type StoreFormData = {
  _id?: string;
  storeName: string;
  storeDescription: string;
  phoneNumber: string;
  email: string;
  businessType: string;
  storeLogoUrl: string;
  bannerUrl: string;
};

const businessTypes = {
  'Food & Beverages': 'FOOD_AND_BEVERAGES',
  'Fashion & Beauty': 'FASHION_AND_BEAUTY',
  Grocery: 'GROCERY',
  Retail: 'RETAIL',
  B2B: 'B2B',
  'Digital Creators': 'DIGITAL_CREATORS',
  Service: 'SERVICE',
  Others: 'OTHERS',
};

const DetailedStore = () => {
  const {storeId} = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [type, setType] = useState<'banner' | 'logo' | null>(null);
  const cachedQuery = queryClient.getQueryData(['presigned-url', 1]);
  // @ts-expect-error - data is not defined
  const presigned = cachedQuery?.data?.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [returnedData, setReturnedData] = useState(null);

  // Fetch store data
  const {data: storeData} = useGetStoreById(storeId || '');
  const store = storeData?.data?.data;
  console.log(store);
  // Cloudinary upload mutation
  const {mutateAsync: uploadFile, isPending: isUploading} =
    useCloudinaryUpload(
      presigned?.url,
      presigned?.apiKey,
      presigned?.timestamp,
      presigned?.signature
    );
  const {mutateAsync: editStore, isPending} = useEditStore(storeId || '');

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: {isValid, isDirty},
  } = useForm<StoreFormData>({
    defaultValues: {
      storeName: '',
      storeDescription: '',
      phoneNumber: '',
      email: '',
      businessType: '',
      storeLogoUrl: '',
      bannerUrl: '',
    },
  });

  useEffect(() => {
    if (store) {
      reset({
        storeName: store.storeName,
        storeDescription: store.storeDescription,
        phoneNumber: store.phoneNumber,
        email: store.email,
        businessType: store.business_type,
        storeLogoUrl: store.storeLogoUrl,
        bannerUrl: store.bannerUrl,
      });
    }
  }, [store, reset]);

  const formValues = watch();

  const handleFileUpload = async (file: File, type: 'logo' | 'banner') => {
    if (!file) {
      setValue(type === 'logo' ? 'storeLogoUrl' : 'bannerUrl', '');
      return;
    }
    setType(type);

    try {
      const response = await uploadFile(file);
      const url = response.secure_url;

      if (type === 'logo') {
        setValue('storeLogoUrl', url);
      } else {
        setValue('bannerUrl', url);
      }

      toast({
        title: 'Upload Successful',
        description: 'Image uploaded successfully',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description:
          error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = async (data: StoreFormData) => {
    const {businessType, ...filteredData} = data;
    const storeData = {
      ...filteredData,
      business_type: businessType,
      storeLogoUrl: data.storeLogoUrl || null,
      bannerUrl: data.bannerUrl || null,
    };
    try {
      const response = await editStore(storeData);
      setReturnedData(response?.data?.data);
      navigate('/stores');
    } catch (error) {
      console.error('Error creating store:', error);
    }
  };

  return (
    <div className="p-[1.07rem] max-lg:py-[1.07rem] max-w-[46.437rem] max-lg:w-full flex flex-col gap-[1.56rem] mx-auto pb-24">
      {/* Banner & Logo Section */}
      <div className="relative h-[15.625rem] max-lg:h-[8.3rem] w-full bg-[#F6F8FA] rounded-[15px]">
        <div className="absolute top-0 left-0 h-full w-full rounded-[15px]">
          {formValues.bannerUrl ? (
            <img
              src={formValues.bannerUrl}
              alt="banner"
              className="absolute h-full w-full object-cover rounded-[15px]"
            />
          ) : (
            <img
              src={banner}
              alt="default banner"
              className="absolute h-full w-full object-cover rounded-[15px]"
            />
          )}
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
          onFileSelect={file => handleFileUpload(file, 'logo')}
          isUploading={type === 'logo' && (isUploading || isPending)}
          maxSize={10 * 1024 * 1024}
          logoUrl={formValues.storeLogoUrl}
        />

        <div className="absolute right-3 md:right-7 max-md:top-3 md:bottom-7">
          <CustomFileUploader
            acceptedFileTypes={[
              'image/png',
              'image/jpeg',
              'image/jpg',
              'image/webp',
            ]}
            onFileSelect={file => handleFileUpload(file, 'banner')}
            isUploading={type === 'banner' && (isUploading || isPending)}
            maxSize={10 * 1024 * 1024}
            isOnboarding
            customButton
            isCustomUpdating={
              type === 'banner' && (isUploading || isPending)
            }
          />
        </div>
      </div>

      {/* Form Section */}
      <Card className="p-4 w-full flex flex-col gap-[1.25rem] border text-sm rounded-[15px]">
        <div className="flex flex-col space-y-1.5">
          <Label
            htmlFor="storeName"
            className="text-[#30313D] font-semibold text-[0.875rem]"
          >
            Store Name*
          </Label>
          <Controller
            name="storeName"
            control={control}
            render={({field}) => (
              <Input
                id="storeName"
                {...field}
                required
                className="rounded-[10px]"
              />
            )}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label
            htmlFor="businessType"
            className="text-[#30313D] font-semibold text-[0.875rem]"
          >
            What type of business do you operate?
          </Label>
          <Controller
            name="businessType"
            control={control}
            render={({field}) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id="businessType"
                  className="rounded-[10px]"
                >
                  <SelectValue placeholder="Select business type">
                    {Object.keys(businessTypes).find(
                      key =>
                        businessTypes[
                          key as keyof typeof businessTypes
                        ] === field.value
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="p-4 rounded-[10px]"
                >
                  {Object.entries(businessTypes).map(([label, value]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label
            htmlFor="email"
            className="text-[#30313D] font-semibold text-[0.875rem]"
          >
            Email Address*
          </Label>
          <Controller
            name="email"
            control={control}
            render={({field}) => (
              <Input
                id="email"
                type="email"
                {...field}
                required
                className="rounded-[10px]"
              />
            )}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label
            htmlFor="phoneNumber"
            className="text-[#30313D] font-semibold text-[0.875rem]"
          >
            WhatsApp Number*
          </Label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({field}) => (
              <Input
                id="phoneNumber"
                {...field}
                required
                className="rounded-[10px]"
              />
            )}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label
            htmlFor="storeDescription"
            className="text-[#30313D] font-semibold text-[0.875rem]"
          >
            Store Description*
          </Label>
          <Controller
            name="storeDescription"
            control={control}
            render={({field}) => (
              <Textarea
                id="storeDescription"
                className="h-24 rounded-[10px]"
                {...field}
                required
              />
            )}
          />
        </div>
      </Card>

      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid || !isDirty || isPending}
        className="w-full bg-[#30313D] py-[0.5625rem] px-[1rem] rounded-[0.75rem] h-[2.625rem] text-[1rem] font-semibold hover:bg-[#30313D]/90"
      >
        {isPending ? 'Saving...' : 'Save changes'}
      </Button>
    </div>
  );
};

export default DetailedStore;
