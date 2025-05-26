import React, {useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {DottedButton} from '@/components/ui/DottedButton.tsx';
import {Switch} from '@/components/ui/switch.tsx';
import {useUser} from '@/hooks/useUser.tsx';
import {useAddCategory} from '@/services/products.service.ts';

const AddCategoryModal = () => {
  const [open, setOpen] = useState(false);
  const {userData} = useUser();
  const [categoryName, setCategoryName] = useState('');
  const [showCategory, setShowCategory] = useState<boolean>(true);

  const {mutateAsync, isPending} = useAddCategory(userData?.store._id);

  const handleSave = async () => {
    try {
      await mutateAsync({
        name: categoryName,
        status: showCategory ? 'visible' : 'hidden',
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <DottedButton>Add Category</DottedButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Provide information about your category to start selling
          </DialogDescription>
        </DialogHeader>
        <div className="max-lg:space-y-4 max-lg:mb-[25rem]">
          <Input
            label="Category Name*"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
          />
          <div className="hidden max-lg:flex max-lg:flex-col max-lg:gap-[0.75rem]">
            <div className="flex items-center gap-3">
              <Switch
                checked={showCategory}
                onCheckedChange={() => setShowCategory(!showCategory)}
              />
              <p>Show category</p>
            </div>
            <Button
              loading={isPending}
              onClick={handleSave}
              disabled={!categoryName || isPending}
              className="w-full"
            >
              Save
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3 max-lg:hidden">
          <Switch
            checked={showCategory}
            onCheckedChange={() => setShowCategory(!showCategory)}
          />
          <p>Show category</p>
        </div>
        <DialogFooter className="flex max-lg:hidden">
          <Button
            loading={isPending}
            onClick={handleSave}
            disabled={!categoryName || isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
