// SingleFileUploader.tsx
import {ReactNode, useState} from 'react';
import {FileTrigger, Button} from 'react-aria-components';
import {X} from 'lucide-react';
import React from 'react';
import {cn, ellipsizeText, fileSizeConverter} from '@/lib/utils';
import {Spinner} from '../ui/spinner';
import storeIcon from '@/assets/icons/store.svg';
import {AddImage, GreenCheck, ImageEdit} from '@/assets/svgs/Icons';
import clsx from 'clsx';

interface SingleFileUploaderProps {
  acceptedFileTypes: string[];
  onFileSelect?: (file: File | null) => void;
  maxSize?: number;
  className?: string;
  imagePreviewClassName?: string;
  isUploading?: boolean;
  onFileRemove?: (index: number) => void;
  isOnboarding?: boolean;
  customButton?: boolean;
  isCustomUpdating?: boolean;
  logoUrl?: string;
}

export const SettingsLogoUploader: React.FC<SingleFileUploaderProps> = ({
  acceptedFileTypes,
  onFileSelect,
  maxSize,
  className,
  imagePreviewClassName,
  isUploading,
  onFileRemove,
  isOnboarding,
  customButton,
  isCustomUpdating,
  logoUrl,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const isImageFile = (file: File) => {
    return file.type.startsWith('image/');
  };

  const generatePreview = (file: File) => {
    if (isImageFile(file)) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const handleFileSelection = (selectedFile: File) => {
    setError(null);

    if (maxSize && selectedFile.size > maxSize) {
      setError(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
      return;
    }

    const newPreview = generatePreview(selectedFile);
    setFile(selectedFile);
    setPreview(newPreview);
    onFileSelect?.(selectedFile);
  };

  const handleSelect = (selectedItems: FileList | null) => {
    if (!selectedItems || selectedItems.length === 0) return;
    handleFileSelection(selectedItems[0]);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onFileSelect?.(null);
    onFileRemove?.(0);
  };

  return (
    <div className="w-fit absolute bottom-3.5 left-3.5 md:bottom-7 md:left-7">
      <FileTrigger
        onSelect={handleSelect}
        acceptedFileTypes={acceptedFileTypes}
      >
        <Button className="h-16 w-16 md:h-24 md:w-24 rounded-full flex items-center justify-center gap-1.5 bg-transparent text-xs font-semibold text-main border border-[#D5DBE1] focus-visible:outline-none flex-shrink-0">
          <div>
            {logoUrl ? (
              <div
                className={cn(
                  'relative h-16 w-16 md:h-24 md:w-24 flex justify-center',
                  imagePreviewClassName
                )}
              >
                <img
                  src={logoUrl}
                  alt={'logo'}
                  className="h-16 w-16 md:h-24 md:w-24 rounded-full"
                />
                <span className="absolute -bottom-1 right-0 md:right-5 cursor-pointer">
                  <ImageEdit className="max-md:w-6 max-md:h-6" />
                </span>
              </div>
            ) : !file ? (
              <div className="relative h-16 w-16 md:h-24 md:w-24 bg-white shadow-lg rounded-full flex items-center justify-center">
                <img
                  src={storeIcon}
                  className="w-10 h-10 md:w-14 md:h-14"
                  alt="Store"
                />
                <span className="absolute -bottom-1 right-0 cursor-pointer">
                  <ImageEdit className="max-md:w-6 max-md:h-6" />
                </span>
              </div>
            ) : isImageFile(file) ? (
              <div
                className={cn(
                  'relative w-full h-full flex justify-center',
                  imagePreviewClassName
                )}
              >
                <img
                  src={preview!}
                  alt={file.name}
                  className="h-16 w-16 md:h-24 md:w-24 rounded-full"
                />
                <span className="absolute -bottom-1 right-0 md:right-5 cursor-pointer">
                  <ImageEdit className="max-md:w-6 max-md:h-6" />
                </span>
              </div>
            ) : null}
            {isUploading && (
              <div className="absolute max-w-24 max-h-24 rounded-full inset-0 flex items-center justify-center">
                <Spinner className="text-black" />
              </div>
            )}
          </div>
        </Button>
      </FileTrigger>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
