import {useGetPresignedUrl} from '@/services/fileupload.service.ts';
import {useEffect, useState} from 'react';
import {
  useDeleteProduct,
  useGetProductById,
  // usePublishProduct,
  // useUnpublishProduct,
} from '@/services/products.service.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import {Details} from './Details';
// import {gaRecordEvent} from '@/analytics';

type DETAILSTYPES = {
  _id: string;
  subCategory: string;
  category: string;
  description: string;
  title: string;
  media: string[];
  createdAt: string;
  status;
  options?: {
    name: string;
    required: boolean;
    choices: {
      name: string;
      price: number;
      stockQuantity: number;
    }[];
  }[];
};

type PRICINGTYPES = {
  price: number;
  stockQuantity: number;
  unit: string;
};

const ProductDetailsPage = () => {
  const {productId} = useParams();
  const navigate = useNavigate();
  const {data: product} = useGetProductById(productId || '');

  const [details, setDetails] = useState<DETAILSTYPES>({
    _id: '',
    subCategory: '',
    category: '',
    description: '',
    title: '',
    media: [],
    createdAt: '',
    status: '',
    options: [],
  });

  const [pricing, setPricing] = useState<PRICINGTYPES>({
    price: null,
    stockQuantity: null,
    unit: '',
  });

  useGetPresignedUrl(1);

  const {mutateAsync: deleteProduct, isPending: isDeleting} =
    useDeleteProduct(product?._id);
  // const {mutateAsync: unpublishProduct, isPending: isUnpublishing} =
  //   useUnpublishProduct(product?._id);
  // const {mutateAsync: publishProduct, isPending: isPublishing} =
  //   usePublishProduct(product?._id);

  const onDelete = async () => {
    await deleteProduct();
    // gaRecordEvent('PRODUCT', 'product_deleted_from_details');
    navigate('/products');
  };

  useEffect(() => {
    if (product) {
      setDetails({
        _id: product._id,
        subCategory: product.subCategory,
        category: product.category,
        description: product.description,
        title: product.title,
        media: [...product.media],
        createdAt: product.createdAt,
        status: product.status,
        options: product.options,
      });

      setPricing({
        price: product.price,
        stockQuantity: product.stockQuantity,
        unit: product.unit,
      });
    }
  }, [product]);

  const onUnpublish = async () => {
    // await unpublishProduct();
    // gaRecordEvent('PRODUCT', 'product_unpublished_toggled');
    navigate('/products');
  };
  const onPublish = async () => {
    // await publishProduct();
    // gaRecordEvent('PRODUCT', 'product_published_toggled');
    navigate('/products');
  };
  return (
    <div>
      <div className="flex items-center gap-5 mb-6 py-[1.25rem] px-[1.875rem] max-lg:px-[0.625rem] max-lg:py-[0.9375rem]  border-b">
        <div className="border rounded-xl p-2">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className=" cursor-pointer"
          />
        </div>
        <h1 className="text-2xl font-bold max-lg:text-lg">
          Product details
        </h1>
      </div>
      <div className="mx-auto max-w-5xl">
        <div className="">
          <div className="col-span-2 px-4 max-lg:pb-16">
            <Details
              onDelete={onDelete}
              isDeleting={isDeleting}
              details={details}
              pricing={pricing}
              // isUnpublishing={isUnpublishing}
              onUnpublish={onUnpublish}
              onPublish={onPublish}
              // isPublishing={isPublishing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
