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
import {DottedButton} from '@/components/ui/DottedButton.tsx';
import {useAddSubCategory} from '@/services/products.service.ts';
import {Input} from '@/components/ui/input.tsx';
import {Switch} from '@/components/ui/switch.tsx';
import {Button} from '@/components/ui/button.tsx';

interface AddSubcategoryModalProps {
  categoryId: string;
}

const AddSubcategoryModal = ({categoryId}: AddSubcategoryModalProps) => {
  const [open, setOpen] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [showSubcategory, setShowSubcategory] = useState<boolean>(true);

  const {mutateAsync, isPending} = useAddSubCategory();
  const handleSave = async () => {
    try {
      await mutateAsync({
        name: subcategoryName,
        status: showSubcategory ? 'visible' : 'hidden',
        categoryId,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <DottedButton>Add Subcategory</DottedButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>Add Subcategory</DialogTitle>
          <DialogDescription>
            Provide information about your subcategory to start selling
          </DialogDescription>
        </DialogHeader>
        <Input
          label="Sub-category Name*"
          value={subcategoryName}
          onChange={e => setSubcategoryName(e.target.value)}
        />

        <div className="flex items-center gap-3">
          <Switch
            checked={showSubcategory}
            onCheckedChange={() => setShowSubcategory(!showSubcategory)}
          />
          <p>Show sub-category</p>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} loading={isPending}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubcategoryModal;
