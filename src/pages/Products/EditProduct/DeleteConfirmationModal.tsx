import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {CubeIcon} from '@heroicons/react/24/solid';
import {ReactNode} from 'react';

interface DeleteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  icon?: ReactNode;
  confirmText?: string;
  cancelText?: string;
}

export function DeleteConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  title = 'Delete option',
  description = 'Are you sure you want to delete this option? This action will permanently remove the option and all associated choices.',
  icon = (
    <CubeIcon className="w-[1.6rem] h-[1.7419rem] text-[#228403] mb-[0.8125rem]" />
  ),
  confirmText = 'Yes Continue',
  cancelText = 'Cancel',
}: DeleteConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="[&>button]:hidden w-[600px] p-6 rounded-[1.25rem] max-lg:w-full max-lg:h-full max-lg:rounded-none max-lg:gap-0 max-lg:flex max-lg:justify-center max-lg:items-center max-lg:flex-col ">
        <DialogHeader>
          <DialogTitle className="font-bold text-[1.75rem]">
            <div className="max-lg:flex max-lg:justify-center ">
              {icon}
            </div>
            {title}
          </DialogTitle>
          <DialogDescription className="pr-[4.625rem] max-lg:pr-0">
            {description}
          </DialogDescription>
          <div className="hidden max-lg:block  max-lg:!mt-[1.5625rem]">
            <div className="flex items-center flex-col gap-3 w-full">
              <Button
                variant="default"
                onClick={onConfirm}
                className=" w-full"
              >
                {confirmText}
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className=" w-full"
              >
                {cancelText}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 max-lg:hidden">
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {cancelText}
            </Button>
            <Button variant="default" onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
