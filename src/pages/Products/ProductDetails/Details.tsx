import {
  Bin,
  EditPen,
  MiniCopy,
  Options,
  ProductIcon,
  PurpleDollar,
  Share,
} from '@/assets/svgs/Icons';
import {toast} from '@/hooks/use-toast';
import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Switch} from '@/components/ui/switch';
import {Button} from '@/components/ui/button';
import {cn, ellipsizeText, nigerianCurrencyFormat} from '@/lib/utils';
import {useUser} from '@/hooks/useUser';
import {dateTimeSemiColon} from '@/lib/dateTimeFormat';
import {Spinner} from '@/components/ui/spinner';
import {useIsMobile} from '@/hooks/use-mobile';
import clsx from 'clsx';
import placeholder from '@/assets/images/placeholderImage.svg';
import {Card} from '@/components/ui/card';
import {ChevronRightIcon} from 'lucide-react';
import {gaRecordEvent} from '@/analytics';

interface DetailsProps {
  details: {
    _id: string;
    subCategory: string;
    category: string;
    description: string;
    title: string;
    media: string[];
    createdAt: string;
    status: string;
    options?: Array<{
      name: string;
      required: boolean;
    }>;
  };
  pricing: {
    price: number;
    stockQuantity: number;
    unit: string;
  };
  isDeleting?: boolean;
  onDelete: () => void;
  isUnpublishing?: boolean;
  onUnpublish: () => void;
  onPublish: () => void;
  isPublishing?: boolean;
}

export const Details = ({
  details,
  pricing,
  onDelete,
  isDeleting,
  isUnpublishing,
  onUnpublish,
  onPublish,
  isPublishing,
}: DetailsProps) => {
  const [isPublished, setIsPublished] = useState(
    details?.status === 'published'
  );
  useEffect(() => {
    setIsPublished(details?.status === 'published');
  }, [details?.status]);
  const [isOn, setIsOn] = useState(false);
  const {userData} = useUser();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const handleToggle = (checked: boolean) => {
    setIsPublished(checked);
    if (checked) {
      onPublish();
    } else {
      onUnpublish();
    }
  };
  const productUrl = userData?.store?.storeUrl
    ? userData?.store?.storeUrl?.replace(
        userData?.store.storeSlug,
        `checkout?productId=${details._id}`
      )
    : '';

  const payload = [
    {name: 'Added on', value: dateTimeSemiColon(details.createdAt)},
    {name: 'Category', value: details.category ?? '--'},
    {name: 'Stock Quantity', value: pricing.stockQuantity ?? '--'},
    {name: 'Product View', value: '--'},
    {name: 'Unit', value: pricing.unit ?? '--'},
    {name: 'Product Description', value: details.description ?? '--'},
  ];

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOn(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="flex items-center justify-between gap-8 p-5 border-b border-b-[#EBEEF1]">
        <div className="flex items-center gap-2.5">
          <ProductIcon />
          <div>
            <p className="mt-0 font-bold text-[#30313D] text-sm capitalize">
              {details.title}
            </p>
            {productUrl && (
              <p className="mt-0.5 flex items-center gap-1">
                Product link:{' '}
                <Link to={''} className="text-[#5433EB]">
                  {isMobile
                    ? ellipsizeText(productUrl, 15)
                    : ellipsizeText(productUrl, 30)}
                </Link>
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(productUrl);
                    toast({
                      description: 'Product link copied to clipboard',
                      variant: 'success',
                    });
                    gaRecordEvent(
                      'PRODUCT',
                      'product_link_copied_to_clipboard'
                    );
                  }}
                  className="cursor-pointer"
                >
                  <MiniCopy />
                </span>
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isPublishing || isUnpublishing ? (
                <Spinner variant="spin" size="medium" intent="current" />
              ) : (
                <Switch
                  className="text-[#5433EB]"
                  checked={isPublished}
                  onCheckedChange={handleToggle}
                />
              )}
              <p>
                {details?.status === 'published' ? 'Unpublish' : 'Publish'}
              </p>
            </div>
            <Button
              variant="outline"
              className="flex items-center h-9 gap-2 px-2.5"
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: 'Check this out',
                      text: 'Here’s a product you might like:',
                      url: productUrl,
                    });
                    toast({
                      description: 'Product link shared successfully',
                      variant: 'success',
                    });
                  } catch (error) {
                    toast({
                      description: 'Sharing was cancelled or failed',
                      variant: 'destructive',
                    });
                  }
                } else {
                  navigator.clipboard.writeText(productUrl);
                  toast({
                    description:
                      'Product link copied to clipboard (sharing not supported)',
                    variant: 'success',
                  });
                  gaRecordEvent(
                    'PRODUCT',
                    'product_link_copied_to_clipboard'
                  );
                }
              }}
            >
              <Share className="text-[#30313D]" />
              Share
            </Button>
            <Button
              variant="outline"
              className="flex items-center h-9 gap-2 px-2.5"
              onClick={() =>
                navigate(`/products/edit-product/${details._id}`)
              }
            >
              <EditPen />
              Edit
            </Button>
            <Button
              disabled={isDeleting}
              loading={isDeleting}
              onClick={() => onDelete()}
              variant="outline"
              className="flex items-center h-9 gap-2 px-2.5"
            >
              <Bin />
              Delete
            </Button>
          </div>
          <div className="lg:hidden relative">
            <span
              className="cursor-pointer"
              onClick={() => setIsOn(!isOn)}
            >
              <Options />
            </span>
            <div
              ref={dropdownRef}
              className={`delay-400 absolute right-0 top-10 z-10 min-h-20 w-[250px] transform rounded-lg border border-neutral-100 border-opacity-30 bg-white shadow-md transition-all duration-300 ease-in-out ${
                isOn
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-5 opacity-0'
              }`}
            >
              <div
                onClick={() => onDelete()}
                className="flex text-[#30313D] font-semibold text-sm items-center gap-4 px-3 border-b border-gray-200 border-opacity-50 py-3"
              >
                <span className="w-7 flex justify-center">
                  <Bin />
                </span>
                {isDeleting ? (
                  <Spinner variant="spin" size="medium" intent="current" />
                ) : (
                  'Delete'
                )}
              </div>
              <div
                onClick={async () => {
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: 'Check this out',
                        text: 'Here’s a product you might like:',
                        url: productUrl,
                      });
                      toast({
                        description: 'Product link shared successfully',
                        variant: 'success',
                      });
                    } catch (error) {
                      toast({
                        description: 'Sharing was cancelled or failed',
                        variant: 'destructive',
                      });
                    }
                  } else {
                    navigator.clipboard.writeText(productUrl);
                    toast({
                      description:
                        'Product link copied to clipboard (sharing not supported)',
                      variant: 'success',
                    });
                    gaRecordEvent(
                      'PRODUCT',
                      'product_link_copied_to_clipboard'
                    );
                  }
                }}
                className="flex text-[#30313D] font-semibold text-sm items-center gap-4 px-3 border-b border-gray-200 border-opacity-50 py-3"
              >
                <span className="w-7 flex justify-center">
                  <Share className="text-[#30313D]" />
                </span>
                Share
              </div>
              <div
                onClick={() =>
                  navigate(`/products/edit-product/${details._id}`)
                }
                className="flex text-[#30313D] font-semibold text-sm items-center gap-4 px-3 border-b border-gray-200 border-opacity-50 py-3"
              >
                <span className="w-7 flex justify-center">
                  <EditPen />
                </span>
                Edit
              </div>
              <div className="flex text-[#30313D] font-semibold text-sm items-center gap-4 px-3 border-b border-gray-200 border-opacity-50 py-3">
                <div className="w-7 flex justify-center">
                  {isUnpublishing ? (
                    <Spinner
                      variant="spin"
                      size="medium"
                      intent="current"
                    />
                  ) : (
                    <Switch
                      className="text-[#5433EB] w-6 h-3"
                      checked={isPublished}
                      onCheckedChange={checked => {
                        console.warn(checked);
                        onUnpublish();
                      }}
                    />
                  )}
                </div>
                <p>
                  {details?.status === 'published'
                    ? 'Unpublish'
                    : 'Publish'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 border-b border-b-[#EBEEF1]">
        <div className="lg:w-full max-lg:max-w-4xl overflow-x-auto hidden-scrollbar">
          <div className="flex items-center gap-4 max-lg:min-w-fit">
            {details.media.length > 0 ? (
              details.media.map((media, index) => (
                <div
                  key={`${media}-${index}`}
                  className="relative w-[8.063rem] h-[8.063rem] lg:col-span-1"
                >
                  <img
                    src={media}
                    alt={media}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))
            ) : (
              <div className="relative w-[8.063rem] h-[8.063rem] lg:col-span-1">
                <img
                  src={placeholder}
                  alt={'placeholder_image'}
                  className={cn('w-full h-full object-cover rounded-md')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-5 flex items-center gap-2.5 border-b border-b-[#EBEEF1]">
        <PurpleDollar />
        <div>
          <p className="mt-0 text-sm text-[#6A7383]">Product Price</p>
          <p className="mt-0 text-sm font-bold text-[#30313D]">
            {nigerianCurrencyFormat(pricing.price)}
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="mt-0 font-bold text-[#30313D] text-sm capitalize">
          Product Details
        </p>
        <div className="mt-4 flex flex-col gap-4">
          {payload?.map(({name, value}, i) => {
            const isLast = payload.length - 1 === i;
            return (
              <div
                key={i}
                className={clsx(
                  'flex items-center justify-between gap-8',
                  isLast ? 'flex-col !gap-1 !items-start' : ''
                )}
              >
                <p className="text-sm text-[#6A7383] mt-0">{name}</p>
                <p className="text-sm font-semibold text-[#30313D] mt-0">
                  {value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <React.Fragment>
        {details?.options?.length > 0 ? (
          <div className="p-5">
            <div className="font-semibold text-[#30313D]">Options</div>
            <Card className="rounded-[0.75rem]  w-full mt-[0.9375rem]">
              <div className="flex flex-col">
                {details.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b p-4 last:border-b-0 cursor-pointer hover:bg-gray-50"
                    // onClick={() => handleOptionClick(option, index)}
                    onClick={() =>
                      navigate(`/products/edit-product/${details._id}`)
                    }
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
            </Card>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-5">
            <h1 className="text-xl font-bold  text-center">
              No product option
            </h1>
            <p className="text-sm text-[#30313D] text-center">
              You've not added options for this product
            </p>
            <Button
              className="bg-[#5433EB]"
              onClick={() =>
                navigate(`/products/edit-product/${details._id}`)
              }
            >
              Add Options
            </Button>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

export const Edit = ({className}: {className?: string}) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.89053 12.5251L6.02614 9.68608C6.20721 9.23342 6.47833 8.82225 6.82307 8.47751L13.0503 2.25065C13.7959 1.50506 15.0048 1.50506 15.7503 2.25065C16.4959 2.99623 16.4959 4.20506 15.7503 4.95065L9.52308 11.1775C9.17833 11.5222 8.76716 11.7934 8.3145 11.9744L5.47547 13.11C5.10813 13.257 4.7436 12.8924 4.89053 12.5251Z"
        fill="currentColor"
      />
      <path
        d="M3.15078 5.175C3.15078 4.55368 3.65446 4.05 4.27578 4.05H9.00078C9.37357 4.05 9.67578 3.7478 9.67578 3.375C9.67578 3.00221 9.37357 2.7 9.00078 2.7H4.27578C2.90888 2.7 1.80078 3.8081 1.80078 5.175V13.725C1.80078 15.0919 2.90888 16.2 4.27578 16.2H12.8258C14.1927 16.2 15.3008 15.0919 15.3008 13.725V9C15.3008 8.62721 14.9986 8.325 14.6258 8.325C14.253 8.325 13.9508 8.62721 13.9508 9V13.725C13.9508 14.3463 13.4471 14.85 12.8258 14.85H4.27578C3.65446 14.85 3.15078 14.3463 3.15078 13.725V5.175Z"
        fill="currentColor"
      />
    </svg>
  );
};
