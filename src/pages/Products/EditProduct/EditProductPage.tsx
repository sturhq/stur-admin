import {Button} from '@/components/ui/button.tsx';
import Preview from './Preview.tsx';
// import Pricing from './Pricing.tsx';
import Details from './Details.tsx';
import {useGetPresignedUrl} from '@/services/fileupload.service.ts';
import {useEffect, useState} from 'react';
import {
  useDeleteProduct,
  useEditProduct,
  useGetProductById,
  useUnpublishProduct,
} from '@/services/products.service.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';

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

const EditProductPage = () => {
  const {productId} = useParams();
  const navigate = useNavigate();
  const {data: product} = useGetProductById(productId || '');
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
  const {mutateAsync, isPending} = useEditProduct(product?._id);

  const {mutateAsync: deleteProduct, isPending: isDeleting} =
    useDeleteProduct(product?._id);
  const {mutateAsync: unpublishProduct, isPending: isUnpublishing} =
    useUnpublishProduct(product?._id);

  const onSubmit = async () => {
    await mutateAsync({
      ...details,
      price: pricing.price,
      stockQuantity: pricing.stockQuantity,
      unit: pricing.unit,
      previewMedia,
    });

    navigate('/products');
  };

  const onDelete = async () => {
    await deleteProduct();

    navigate('/products');
  };

  useEffect(() => {
    if (product) {
      setDetails({
        subCategory: product.subCategory,
        category: product.category,
        description: product.description,
        title: product.title,
        media: [...product.media],
        options: product.options,
      });

      setPricing({
        price: product.price,
        stockQuantity: product.stockQuantity,
        unit: product.unit,
      });

      setPreviewMedia(product.previewMedia || null);
    }
  }, [product]);

  const onUnpublish = async () => {
    await unpublishProduct();
    navigate('/products');
  };

  return (
    <div className="pb-28">
      <div className="flex items-center gap-5 mb-6 py-[1.25rem] px-[1.875rem] max-lg:px-[0.625rem] max-lg:py-[0.9375rem]  border-b">
        <div className="border rounded-xl p-2">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className=" cursor-pointer"
          />
        </div>
        <h1 className="text-2xl font-bold max-lg:text-lg">Edit Product</h1>
      </div>
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
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

          <div className="hidden lg:block">
            <Preview details={details} pricing={pricing} />
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-end gap-4 lg:mt-6 lg:fixed lg:bg-[#F6F8FA] lg:bottom-0 p-4 lg:border-t w-full">
        <Button
          onClick={onDelete}
          loading={isDeleting}
          variant="outline"
          className="text-[#DF1B41]"
        >
          Delete
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            onUnpublish();
          }}
          loading={isUnpublishing}
        >
          Unpublish
        </Button>
        <Button
          onClick={onSubmit}
          loading={isPending}
          disabled={!details.title || !pricing.price}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditProductPage;
