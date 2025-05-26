import {Button} from '@/components/ui/button.tsx';
import Preview from './Preview.tsx';
// import Pricing from './Pricing.tsx';
import Details from './Details.tsx';
import {useGetPresignedUrl} from '@/services/fileupload.service.ts';
import {useEffect, useState} from 'react';
import {
  useAddProductToDraft,
  useDeleteProduct,
  useGetProductById,
  usePublishProduct,
} from '@/services/products.service.ts';
import {ArrowLeft, CircleCheckBig} from 'lucide-react';
import {toast} from '@/hooks/use-toast.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {gaRecordEvent} from '@/analytics.ts';

type PRICINGTYPES = {
  price: number;
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

const EditDraftPage = () => {
  const {productId} = useParams();
  const navigate = useNavigate();
  const {data: product} = useGetProductById(productId);
  const [previewMedia, setPreviewMedia] = useState<string | null>(
    product?.previewMedia || null
  );

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
    stockQuantity: null,
    unit: '',
  });

  useGetPresignedUrl(1);
  const {mutateAsync, isPending} = usePublishProduct(product?._id);

  const {mutateAsync: deleteProduct, isPending: isDeleting} =
    useDeleteProduct(product?._id);

  const {
    mutateAsync: addToDraft,
    isPending: addingDraftPending,
    isSuccess,
  } = useAddProductToDraft(product?._id);

  const onSubmit = async () => {
    await mutateAsync();
    gaRecordEvent('PRODUCT', 'product_published');
    navigate('/products');
  };

  const onDraftSubmit = async () => {
    try {
      const payload = {
        ...details,
        price: pricing.price,
        stockQuantity: pricing.stockQuantity,
        unit: pricing.unit,
        previewMedia,
      };
      await addToDraft(payload);
      toast({
        title: 'Product added to draft!',
        description: 'Product added to draft successfully',
        variant: 'success',
      });
      gaRecordEvent('PRODUCT', 'product_draft_saved');
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = async () => {
    await deleteProduct();
    gaRecordEvent('PRODUCT', 'product_deleted');
    navigate('/products');
  };
  useEffect(() => {
    if (product) {
      setDetails({
        subCategory: product?.subCategory,
        category: product?.category,
        description: product?.description,
        title: product?.title,
        media: [...product.media],
        options: product?.options,
      });

      setPricing({
        price: product?.price,
        stockQuantity: product?.stockQuantity,
        unit: product?.unit,
      });

      setPreviewMedia(product?.previewMedia || null);
    }
  }, [product]);

  // save draft when anything changes
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  useEffect(() => {
    if (product) {
      setDetails({
        subCategory: product?.subCategory,
        category: product?.category,
        description: product?.description,
        title: product?.title,
        media: [...product.media],
        options: product?.options,
      });

      setPricing({
        price: product?.price,
        stockQuantity: product?.stockQuantity,
        unit: product?.unit,
      });

      setPreviewMedia(product?.previewMedia || null);
      setInitialDataLoaded(true);
    }
  }, [product]);

  useEffect(() => {
    if (initialDataLoaded && product) {
      const payload = {
        ...details,
        price: pricing?.price,
        stockQuantity: pricing?.stockQuantity,
        unit: pricing?.unit,
        previewMedia,
      };
      addToDraft(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details, pricing, previewMedia, initialDataLoaded]);

  return (
    <div className="pb-28">
      <div className="flex items-center gap-5 mb-6 py-[1.25rem] px-[1.875rem] max-lg:px-[0.625rem] max-lg:py-[0.9375rem] border-b">
        <div className="border rounded-xl p-2">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className=" cursor-pointer"
          />
        </div>
        <h1 className="text-2xl font-bold max-lg:text-lg">Edit Draft</h1>
        {addingDraftPending ? (
          <p className="text-xs text-gray-500">Saving draft...</p>
        ) : (
          isSuccess && (
            <div className="flex items-center gap-2 text-green-500">
              <p className="text-xs">Draft saved</p>
              <CircleCheckBig height={12} width={12} />
            </div>
          )
        )}
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 max-lg:px-4">
            <Details
              setDetails={setDetails}
              details={details}
              setPreviewMedia={setPreviewMedia}
              setPricing={setPricing}
              pricing={pricing}
              mainClass="bg-transparent border-none max-lg:p-0 lg:p-0"
            />
          </div>

          <div className="hidden md:block">
            <Preview details={details} pricing={pricing} />
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row lg:justify-end gap-4 lg:mt-6 lg:fixed lg:bottom-0 lg:bg-[#F6F8FA] p-4 lg:border-t w-full">
        <div className="flex md:flex-row-reverse gap-4 max-lg:gap-3 justify-between">
          <Button
            variant="outline"
            onClick={onDraftSubmit}
            loading={addingDraftPending}
            disabled={!details.title || !pricing.price}
            className="max-lg:w-full"
          >
            Save as Draft
          </Button>
          <Button
            variant="outline"
            disabled={!details.title || !pricing.price}
            className="text-[#DF1B41] w-full"
            onClick={onDelete}
            loading={isDeleting}
          >
            Delete
          </Button>
        </div>
        <Button
          onClick={onSubmit}
          loading={isPending}
          disabled={!details.title || !pricing.price}
        >
          Save & Publish
        </Button>
      </div>
    </div>
  );
};

export default EditDraftPage;
