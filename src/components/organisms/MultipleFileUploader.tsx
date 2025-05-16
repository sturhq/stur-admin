// MultipleFileUploader.tsx
import {useState} from 'react';
import type {DropEvent} from '@react-types/shared';
import {FileTrigger, isFileDropItem, Button} from 'react-aria-components';
import {DropZone} from '../ui/drop-zone';
import {Plus, X} from 'lucide-react';
import React from 'react';
import {cn, ellipsizeText, fileSizeConverter} from '@/lib/utils';
import {Spinner} from '../ui/spinner';
import clsx from 'clsx';

interface MultipleFileUploaderProps {
  acceptedFileTypes: string[];
  description?: string;
  onFileSelect?: (files: File[]) => void;
  maxSize?: number;
  className?: string;
  imagePreviewClassName?: string;
  isUploading?: boolean;
  onFileRemove?: (index: number) => void;
  showPreview?: boolean;
  innerClass?: string;
  externalScroll?: boolean;
}

export const MultipleFileUploader: React.FC<MultipleFileUploaderProps> = ({
  acceptedFileTypes,
  onFileSelect,
  maxSize,
  className,
  isUploading,
  onFileRemove,
  showPreview = true,
  innerClass,
  externalScroll,
  //   imagePreviewClassName, TODO: Implement image preview class for size
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const isImageFile = (file: File) => {
    return file.type.startsWith('image/');
  };

  const generatePreview = (file: File) => {
    if (isImageFile(file)) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const handleFileSelection = (selectedFiles: File[]) => {
    setError(null);

    if (maxSize) {
      const oversizedFiles = selectedFiles.filter(
        file => file.size > maxSize
      );
      if (oversizedFiles.length > 0) {
        setError(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
        return;
      }
    }

    const newFiles = [...files, ...selectedFiles];
    const newPreviews = newFiles.map(generatePreview);

    setFiles(newFiles);
    setPreviews(newPreviews.filter(Boolean) as string[]);
    onFileSelect?.(newFiles);
  };

  const handleDrop = async (e: DropEvent) => {
    const fileItems = e.items.filter(isFileDropItem);
    const droppedFiles: File[] = [];

    for (const item of fileItems) {
      const file = await item.getFile();
      droppedFiles.push(file);
    }

    handleFileSelection(droppedFiles);
  };

  const handleSelect = (selectedItems: FileList | null) => {
    if (!selectedItems) return;
    const selectedFiles = Array.from(selectedItems);
    handleFileSelection(selectedFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviews(newPreviews);
    // Remove onFileSelect call from here
    onFileRemove?.(index);
  };

  const renderUploadCard = () => (
    <DropZone
      getDropOperation={() => 'copy'}
      onDrop={handleDrop}
      className={cn(
        'h-[7.063rem] relative w-[7.063rem] lg:w-full border-[1px] border-dashed hover:bg-transparent !bg-[#fff] shadow-none !p-0',
        className,
        files.length === 5 && 'hidden',
        files.length === 0 && 'col-span-5'
      )}
    >
      <div className="flex flex-col items-center space-y-2 p-2">
        <FileTrigger
          onSelect={handleSelect}
          acceptedFileTypes={acceptedFileTypes}
          allowsMultiple
        >
          <Button className="px-3 py-3 text-sm bg-white text-secondary-foreground rounded-full hover:bg-secondary/80">
            <Plus className="text-[#A3ACBA]" />
          </Button>
        </FileTrigger>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </DropZone>
  );

  return (
    <div
      className={clsx(
        externalScroll ? '' : 'overflow-x-auto hidden-scrollbar',
        'lg:w-full max-lg:max-w-5xl'
      )}
    >
      <div
        className={clsx(
          externalScroll
            ? ''
            : 'flex items-center lg:grid lg:grid-cols-5 gap-4 max-lg:min-w-fit'
        )}
      >
        {files.map((file, index) =>
          isImageFile(file) && showPreview ? (
            <div
              key={`${file.name}-${index}`}
              className="relative w-[7.063rem] h-[7.063rem] lg:col-span-1"
            >
              <img
                src={previews[index]}
                alt={file.name}
                className="w-[7.063rem] h-[7.063rem] object-cover rounded-md"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                  <Spinner />
                </div>
              )}
            </div>
          ) : null
        )}
        {renderUploadCard()}
      </div>
      {files.length > 0 && (
        <div className={clsx(innerClass, 'mt-4 space-y-2')}>
          {files.map(
            (file, index) =>
              !isImageFile(file) && (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">
                      {ellipsizeText(file.name, 40)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {fileSizeConverter(file.size)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};
