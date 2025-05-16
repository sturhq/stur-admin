// SingleFileUploader.tsx
import {useState} from 'react';
import {FileTrigger, Button} from 'react-aria-components';
import {X} from 'lucide-react';
import React from 'react';
import {cn, ellipsizeText, fileSizeConverter} from '@/lib/utils';
import {Spinner} from '../ui/spinner';
import storeIcon from '@/assets/icons/store.svg';
import {AddImage, GreenCheck} from '@/assets/svgs/Icons';
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
}

export const CustomFileUploader: React.FC<SingleFileUploaderProps> = ({
  acceptedFileTypes,
  onFileSelect,
  maxSize,
  imagePreviewClassName,
  isUploading,
  onFileRemove,
  isOnboarding,
  customButton,
  isCustomUpdating,
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
    <div className="w-full relative">
      <div
        className={clsx(
          isOnboarding ? 'items-start' : 'items-center',
          'relative flex flex-col'
        )}
      >
        {!isOnboarding && (
          <div>
            {!file ? (
              <div className="flex flex-col items-center space-y-4 w-full px-6 justify-center h-full">
                <div className="h-24 w-24 bg-white shadow-lg rounded-full flex items-center justify-center">
                  <img src={storeIcon} className="w-14 h-14" alt="Store" />
                </div>
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
                  className="h-24 w-24 object-cover rounded-full"
                />
                <button
                  onClick={removeFile}
                  className="absolute top-0 right-7 p-1 bg-black/70 rounded-full hover:bg-black/70"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : null}
            {isUploading && (
              <div className="absolute max-w-24 max-h-24 rounded-full inset-0 transform -translate-x-1/2 left-1/2 flex items-center justify-center bg-black/50">
                <Spinner className="text-white" />
              </div>
            )}
          </div>
        )}
        <FileTrigger
          onSelect={handleSelect}
          acceptedFileTypes={acceptedFileTypes}
        >
          {isOnboarding ? (
            customButton ? (
              <Button className="px-3 h-7 flex items-center justify-center gap-1.5 bg-white text-xs font-semibold text-main border border-[#D5DBE1] rounded-xl focus-visible:outline-none flex-shrink-0">
                {isCustomUpdating ? (
                  <Spinner className="text-black" />
                ) : (
                  'Upload Banner'
                )}
              </Button>
            ) : (
              <Button className="px-3 h-11 flex items-center justify-center gap-1.5 bg-white text-xs font-semibold text-main border border-[#D5DBE1] rounded-xl focus-visible:outline-none flex-shrink-0">
                {file ? <GreenCheck /> : <AddImage />}
                {file ? ellipsizeText(file.name, 15) : 'Add Product'}
              </Button>
            )
          ) : (
            <Button className="px-3 !mt-[1.125rem] py-0.5 bg-[#CFF5F6] text-xs font-semibold text-[#0055BC] border border-[#A2E5EF] rounded-[2.438rem] focus-visible:outline-none flex-shrink-0">
              {file ? 'Change Logo' : 'Upload'}
            </Button>
          )}
        </FileTrigger>
      </div>
      {file && !isImageFile(file) && (
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <div className="flex items-center space-x-2">
            <span className="text-sm">{ellipsizeText(file.name, 40)}</span>
            <span className="text-xs text-gray-500">
              {fileSizeConverter(file.size)}
            </span>
          </div>
          <button
            onClick={removeFile}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
