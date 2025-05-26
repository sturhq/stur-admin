import {Card} from '@/components/ui/card.tsx';
import {nigerianCurrencyFormat} from '@/lib/utils.ts';
import Picture from '@/assets/images/picture.svg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel.tsx';
import {useEffect, useState} from 'react';

interface DetailsProps {
  details: {
    subCategory: string;
    category: string;
    description: string;
    title: string;
    media: string[];
  };
  pricing: {
    price: number;
  };
}

const Preview = ({details, pricing}: DetailsProps) => {
  const [previewMedia, setPreviewMedia] = useState<string | null>(
    details?.media?.[0] ?? null
  );

  useEffect(() => {
    // More robust media setting
    if (details?.media && details.media.length > 0) {
      setPreviewMedia(details.media[0]);
    } else {
      setPreviewMedia(null);
    }
  }, [details]);

  const handleSelect = (url: string) => {
    setPreviewMedia(url);
  };

  return (
    <Card className="p-[1.0625rem] w-[21.4rem]">
      <p className="text-base font-bold">Preview</p>
      <div className="mt-[1.56rem] flex flex-col gap-4">
        <Card className="bg-[#F6F8FA] w-[19.3125rem] h-[17.5rem] flex items-center justify-center  rounded-sm">
          {previewMedia ? (
            <img
              src={previewMedia}
              alt="preview"
              className="w-full h-full object-cover rounded-sm"
            />
          ) : (
            <img
              src={Picture}
              alt="picture"
              className="opacity-35 w-1/2"
            />
          )}
        </Card>
        {/* display media here */}
        {details?.media.length > 0 && (
          <Carousel className="my-4">
            <CarouselContent className="ml-0">
              {details?.media?.map((media, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[22%] pl-0"
                  onClick={() => handleSelect(media)}
                >
                  <img
                    src={media}
                    alt="preview"
                    className="w-[3.125rem] h-[3.125rem] object-cover rounded-sm"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        <div>
          <p className="text-base font-bold">
            {details?.title ? details.title : 'Title'}
          </p>
          <p className="text-sm font-normal text-[#6A7383]">
            {details?.description ? details.description : 'Description'}
          </p>
        </div>
        <div>
          <p className="text-base font-bold">
            {pricing?.price
              ? `${nigerianCurrencyFormat(pricing.price)}`
              : 'Price'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Preview;
