import {useState} from 'react';
import type {DropEvent} from '@react-types/shared';
import {FileTrigger, isFileDropItem, Button} from 'react-aria-components';
import {DropZone} from '../ui/drop-zone';
import {FolderOpen, X} from 'lucide-react';
import React from 'react';
import {cn, ellipsizeText, fileSizeConverter} from '@/lib/utils';

interface DragAndDropProps {
  acceptedFileTypes: string[];
  allowsMultiple?: boolean;
  description?: string;
  acceptDirectory?: boolean;
  onFileSelect?: (files: File[]) => void;
  maxSize?: number;
  className?: string;
  imagePreviewClassName?: string;
  showPreview?: boolean;
}

export const DragAndDrop: React.FC<DragAndDropProps> = ({
  acceptedFileTypes,
  allowsMultiple = false,
  description = 'Choose a file',
  acceptDirectory = false,
  onFileSelect,
  maxSize,
  className,
  showPreview = false,
  imagePreviewClassName,
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

    const newFiles = allowsMultiple
      ? [...files, ...selectedFiles]
      : [selectedFiles[0]];
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
    onFileSelect?.(newFiles);
  };

  const renderFilePreview = () => {
    if (!showPreview) {
      return renderFileList();
    }

    const imageFiles = files.filter(isImageFile);
    const nonImageFiles = files.filter(file => !isImageFile(file));

    return (
      <div className="mt-4">
        {/* Image Previews */}
        {imageFiles.length > 0 && (
          <div
            className={cn(
              'relative',
              allowsMultiple
                ? 'flex flex-wrap gap-4'
                : 'w-full absolute top-0 left-0',
              imagePreviewClassName
            )}
          >
            {imageFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className={cn(
                  'relative',
                  allowsMultiple ? 'w-[150px] h-[150px]' : 'w-full h-full'
                )}
              >
                <img
                  src={previews[index]}
                  alt={file.name}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Non-image Files List */}
        {nonImageFiles.length > 0 && renderFileList(nonImageFiles)}
      </div>
    );
  };

  const renderFileList = (filesToRender = files) => (
    <div className="mt-4 space-y-2">
      {filesToRender.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="flex items-center justify-between p-2 bg-gray-50 rounded"
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm">{ellipsizeText(file.name, 40)}</span>
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
      ))}
    </div>
  );

  return (
    <div className="w-full relative">
      <DropZone
        getDropOperation={() => 'copy'}
        onDrop={handleDrop}
        className={cn(
          'min-h-[200px] w-full border-[1px] border-dashed hover:bg-transparent !bg-[#F6F8FA] shadow-none',
          className
        )}
      >
        <div className="flex flex-col items-center space-y-4">
          <FolderOpen className="h-12 w-12 text-gray-400" />
          <FileTrigger
            onSelect={handleSelect}
            acceptedFileTypes={acceptedFileTypes}
            allowsMultiple={allowsMultiple}
            acceptDirectory={acceptDirectory}
          >
            <Button
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
              isDisabled={!allowsMultiple && files.length > 0}
            >
              {description}
            </Button>
          </FileTrigger>
          <p className="text-sm text-gray-500">
            or drag and drop {allowsMultiple ? 'files' : 'a file'} here
          </p>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </DropZone>

      {files.length > 0 && renderFilePreview()}
    </div>
  );
};
