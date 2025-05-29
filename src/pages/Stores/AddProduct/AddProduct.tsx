import {Button} from '@/components/ui/button';
import Details from './Details';
import {useGetPresignedUrl} from '@/services/fileupload.service';
import {useState} from 'react';

import {toast} from '@/hooks/use-toast';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';

export type PRICINGTYPES = {
  price: number;
  discountAmount?: number;
  stockQuantity: number;
  unit: string;
};

export interface OptionChoice {
  name: string;
  price: number;
  stockQuantity: number;
}

export interface ProductOption {
  name: string;
  required: boolean;
  choices: OptionChoice[];
}

export type DETAILSTYPES = {
  subCategory: string;
  category: string;
  description: string;
  title: string;
  media: string[];
  options: ProductOption[];
};

const AddProductPage = () => {
  const [previewMedia, setPreviewMedia] = useState<string | null>(null);
  const [details, setDetails] = useState<DETAILSTYPES>({
    subCategory: '',
    category: '',
    description: '',
    title: '',
    media: [],
    options: [],
  });
  const [pricing, setPricing] = useState<PRICINGTYPES>({
    price: null,
    discountAmount: undefined,
    stockQuantity: null,
    unit: '',
  });
  const navigate = useNavigate();
  useGetPresignedUrl(1);

  return (
    <div className="pb-28">
      <div className="flex items-center gap-5 mb-6 py-[1.25rem] px-[1.875rem] max-lg:px-[0.625rem] max-lg:py-[0.9375rem]  border-b">
        <div className="border rounded-xl p-2">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className=" cursor-pointer"
          />
        </div>
        <h1 className="text-2xl font-bold max-lg:text-lg">Add Product</h1>
      </div>
      <div className="mx-auto max-w-3xl">
        <div className="grid gap-4 max-lg:grid-cols-1">
          <div className="col-span-2 max-lg:px-4">
            <Details
              setDetails={setDetails}
              details={details}
              setPreviewMedia={setPreviewMedia}
              setPricing={setPricing}
              pricing={pricing}
              mainClass="bg-transparent border-none max-lg:p-0 lg:p-0"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-end gap-4 lg:mt-6 lg:fixed lg:bottom-0 lg:bg-transparent p-4 lg:border-none w-full">
        <Button
          // onClick={onSubmit}
          // loading={isPending}
          // disabled={!details.title || !pricing.price}
          className="bg-[#30313D]"
        >
          Save and publish
        </Button>
      </div>
    </div>
  );
};

export default AddProductPage;
