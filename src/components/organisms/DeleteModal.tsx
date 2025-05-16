import {useDeleteDeliveryArea} from '@/services/store.service';
import {Button} from '../ui/button';
import {Dialog, DialogContent} from '../ui/dialog';
import truck from '@/assets/images/truck.svg';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  isPending: boolean;
  handleDelete: () => Promise<void>;
}

export const DeleteModal = ({
  open,
  setOpen,
  isPending,
  handleDelete,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="w-full !max-w-[29rem] !px-0"
      >
        <div className="px-6">
          <img src={truck} alt="truck" className="w-[2rem]" />
        </div>
        <div className="px-6">
          <h4 className="text-[#30313D] font-bold text-[1.75rem]">
            Delete Delivery Area
          </h4>
          <p className="text-sm text-[#6A7383] mt-1">
            Are you sure you want to delete delivery area? This action is
            irreversible.
          </p>
        </div>
        <div className="border-t border-t-[#EBEEF1] px-6 pt-6 flex items-center justify-end gap-3">
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button
            loading={isPending}
            onClick={handleDelete}
            variant="destructive"
          >
            Yes Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
