import truck from '@/assets/images/shopping-bag.svg';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent} from '@/components/ui/dialog';
import {useBlockUser} from '@/services/stores.services';
import queryString from 'query-string';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  isPending?: boolean;
  handleDelete?: () => Promise<void>;
  store: {
    claimedStatus: string;
  };
}

export const BlockModal = ({open, setOpen, store}: Props) => {
  const queryParams = queryString.parse(window.location.search);
  const userId = queryParams.userId as string;

  const {mutateAsync, isPending} = useBlockUser(userId);

  const handleBlock = async () => {
    try {
      await mutateAsync();
      setOpen(false);
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

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
            {store?.claimedStatus === 'Claimed'
              ? 'Block User'
              : 'Unblock User'}
          </h4>
          <p className="text-sm text-[#6A7383] mt-1">
            {store?.claimedStatus === 'Claimed'
              ? ' Are you sure you want to block this users? This user will loss access to his account when you block them.'
              : 'Are you sure you want to unblock this user?'}
          </p>
        </div>
        <div className="border-t border-t-[#EBEEF1] px-6 pt-6 flex items-center justify-end gap-3">
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button
            loading={isPending}
            onClick={handleBlock}
            variant={
              store?.claimedStatus === 'Claimed'
                ? 'destructive'
                : 'default'
            }
          >
            Yes, continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
