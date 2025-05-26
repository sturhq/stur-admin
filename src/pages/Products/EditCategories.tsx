import React from 'react';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
interface EditProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (boolean) => void;
  setCategoryName: (value: React.SetStateAction<string>) => void;
  handleSaveCategory: () => Promise<void>;
  categoryName: string;
  isEditing: boolean;
}

const EditCategories = ({
  isEditModalOpen,
  setIsEditModalOpen,
  setCategoryName,
  categoryName,
  handleSaveCategory,
  isEditing,
}: EditProps) => {
  return (
    <div>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] max-lg:[&>button]:hidden max-lg:flex max-lg:justify-center max-lg:items-center max-lg:flex-col">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="mb-[25rem] w-full">
            <Input
              type="text"
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
              className="w-full"
            />
            <div className="hidden max-lg:flex max-lg:flex-col max-lg:gap-[0.75rem] max-lg:mt-[1.5625rem]">
              <Button
                onClick={handleSaveCategory}
                loading={isEditing}
                className="w-full"
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEditModalOpen(false)}
                variant="secondary"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>

          <DialogFooter className="flex max-lg:hidden">
            <Button
              onClick={() => setIsEditModalOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleSaveCategory} loading={isEditing}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCategories;
