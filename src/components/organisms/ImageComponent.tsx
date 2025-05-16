import React from 'react';
import placeholder from '@/assets/images/picture.svg';
import {cn} from '@/lib/utils.ts';

type ImageComponentProps = {
  src: string;
  alt: string;
  className?: string;
  placeholderClass?: string;
  imageClass?: string;
};

const ImageComponent = ({
  src,
  alt,
  className,
  placeholderClass,
  imageClass,
}: ImageComponentProps) => {
  return (
    <div
      className={cn(
        'bg-[#F6F8FA] border rounded-2xl flex items-center justify-center',
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            'max-lg:w-[5rem] rounded-2xl object-cover',
            imageClass
          )}
        />
      ) : (
        <img
          src={placeholder}
          alt={alt}
          className={cn('max-lg:w-[5rem]', placeholderClass)}
        />
      )}
    </div>
  );
};

export default ImageComponent;
