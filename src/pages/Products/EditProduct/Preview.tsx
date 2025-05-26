import {Card} from '@/components/ui/card.tsx';
import {nigerianCurrencyFormat} from '@/lib/utils.ts';
import Picture from '@/assets/images/picture.svg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel.tsx';
import {useEffect, useState} from 'react';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';

interface DetailsProps {
  details: {
    subCategory: string;
    category: string;
    description: string;
    title: string;
    media: string[];
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
        <Card className="bg-[#F6F8FA] w-[19.3125rem] h-[17.5rem] flex items-center justify-center rounded-lg">
          {previewMedia ? (
            <img
              src={previewMedia}
              alt="preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <img
              src={Picture}
              alt="picture"
              className="opacity-35 w-1/2 rounded-lg"
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
          <p className="text-sm mt-0.5 font-normal text-[#6A7383]">
            {details?.description ? details.description : 'Description'}
          </p>
          <p className="text-base font-bold mt-2.5">
            {pricing?.price
              ? `${nigerianCurrencyFormat(pricing.price)}`
              : 'Price'}
          </p>
        </div>
        {details.options && details.options.length > 0 && (
          <div className="mt-2">
            {details.options.map((option, index) => (
              <div key={index} className="border-b py-5 last:border-b-0">
                <h4 className="text-base font-bold">
                  {option.name}{' '}
                  {option.required && (
                    <span className="text-sm font-normal">(Required)</span>
                  )}
                </h4>

                <RadioGroup className="mt-2 space-y-2">
                  {option.choices.map((choice, choiceIndex) => (
                    <div
                      key={choiceIndex}
                      className="flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={undefined}
                          checked={false}
                          disabled
                          className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 hover:bg-transparent"
                        />
                        <div className="font-semibold">{choice.name}</div>
                      </div>
                      {choice.price !== pricing.price &&
                        choice.price !== 0 && (
                          <div className="font-semibold">
                            {nigerianCurrencyFormat(choice.price)}
                          </div>
                        )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Preview;
