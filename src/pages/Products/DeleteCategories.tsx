import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

import React from 'react';
type CategoryType = {
  _id: string;
  name: string;
  productCount: number;
  status: 'hidden' | 'visible';
};
interface DeleteProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (boolean) => void;
  selectedCategory: CategoryType;
  handleDeleteCategory: () => Promise<void>;
}

const DeleteCategories = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedCategory,
  handleDeleteCategory,
}: DeleteProps) => {
  return (
    <div>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[400px] max-lg:[&>button]:hidden max-lg:flex max-lg:justify-center max-lg:items-center max-lg:flex-col">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <div className="w-full mb-[25rem]">
            <p className="text-sm text-gray-600 flex justify-center gap-1">
              Are you sure you want to delete{' '}
              <strong> {selectedCategory?.name}?</strong>
            </p>
            <div className="hidden  max-lg:flex max-lg:flex-col max-lg:gap-[0.75rem]  max-lg:mt-[1.5625rem]">
              <Button onClick={handleDeleteCategory} variant="destructive">
                Delete
              </Button>
              <Button
                onClick={() => setIsDeleteModalOpen(false)}
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </div>

          <DialogFooter className="flex max-lg:hidden">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteCategory} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteCategories;
