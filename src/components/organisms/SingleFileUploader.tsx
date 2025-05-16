// SingleFileUploader.tsx
import {useState} from 'react';
import type {DropEvent} from '@react-types/shared';
import {FileTrigger, isFileDropItem, Button} from 'react-aria-components';
import {DropZone} from '../ui/drop-zone';
import {X} from 'lucide-react';
import React from 'react';
import {cn, ellipsizeText, fileSizeConverter} from '@/lib/utils';
import {Spinner} from '../ui/spinner';

interface SingleFileUploaderProps {
  acceptedFileTypes: string[];
  description?: string;
  onFileSelect?: (file: File | null) => void;
  maxSize?: number;
  className?: string;
  imagePreviewClassName?: string;
  isUploading?: boolean;
  meta?: string;
  onFileRemove?: (index: number) => void;
}

export const SingleFileUploader: React.FC<SingleFileUploaderProps> = ({
  acceptedFileTypes,
  description = 'Select a file or drag and drop here',
  onFileSelect,
  maxSize,
  className,
  imagePreviewClassName,
  isUploading,
  meta,
  onFileRemove,
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

  const handleDrop = async (e: DropEvent) => {
    const fileItems = e.items.filter(isFileDropItem);
    if (fileItems.length > 0) {
      const droppedFile = await fileItems[0].getFile();
      handleFileSelection(droppedFile);
    }
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
      <DropZone
        getDropOperation={() => 'copy'}
        onDrop={handleDrop}
        className={cn(
          'min-h-[200px] w-full border-[1px] border-dashed hover:bg-transparent !bg-[#F6F8FA] shadow-none !p-0',
          className
        )}
      >
        {!file ? (
          <div className="flex flex-col items-center space-y-4 w-full px-6 justify-center h-full">
            <FileTrigger
              onSelect={handleSelect}
              acceptedFileTypes={acceptedFileTypes}
            >
              <Button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 flex-shrink-0">
                Upload
              </Button>
            </FileTrigger>
            <div className="max-w-[90%]">
              <p className="text-sm text-gray-500 text-center inline-block">
                {description}
              </p>
              {meta && (
                <p className="text-sm text-gray-500 text-center inline-block">
                  {meta}
                </p>
              )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        ) : isImageFile(file) ? (
          <div
            className={cn('relative w-full h-full', imagePreviewClassName)}
          >
            <img
              src={preview!}
              alt={file.name}
              className="w-full h-full object-cover rounded-md"
            />
            <button
              onClick={removeFile}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : null}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
            <Spinner />
          </div>
        )}
      </DropZone>
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
    </div>
  );
};
