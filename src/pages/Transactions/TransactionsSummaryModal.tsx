import {Dialog, DialogContent, DialogTitle} from '@/components/ui/dialog';
// import {TRANSACTIONTYPE} from './Tabs/AllTransactions';
import {nigerianCurrencyFormat} from '@/lib/utils';
import {dateTimeSemiColon} from '@/lib/dateTimeFormat';
import {Badge} from '@/components/ui/badge';
import {TRANSACTIONTYPE} from './Tabs/AllTransactionTable';

interface TransactionsSummaryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  transaction: TRANSACTIONTYPE;
}

export const TransactionsSummaryModal = ({
  open,
  setOpen,
  transaction,
}: TransactionsSummaryProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-[40.9rem]">
        <div>
          <DialogTitle>Transactions Summary</DialogTitle>
          <div className="flex flex-col gap-2 my-6">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-normal">Amount</p>
              <p className="text-xl font-bold">
                {nigerianCurrencyFormat(transaction?.amount)}
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-normal">
                Transaction Date & Time
              </p>
              <p className="text-sm font-semibold">
                {dateTimeSemiColon(transaction?.createdAt)}
              </p>
            </div>

            {transaction?.authorization?.senderBank && (
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-normal">Sender bank</p>
                <p className="text-sm font-semibold">
                  {transaction.authorization.senderBank}
                </p>
              </div>
            )}

            {transaction?.authorization?.senderAccount && (
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-normal">Account Number</p>
                <p className="text-sm font-semibold">
                  {transaction.authorization.senderAccount}
                </p>
              </div>
            )}

            <div className="flex flex-col space-y-1">
              <p className="text-sm font-normal">Transaction type</p>
              <p className="text-sm font-semibold">
                {transaction?.type.charAt(0).toUpperCase() +
                  transaction?.type.slice(1)}
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-normal">Transaction ID</p>
              <p className="text-sm font-semibold">
                {transaction?.transactionId}
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-normal">Status</p>
              <Badge
                variant={
                  transaction?.status === 'success'
                    ? 'positive'
                    : 'negative'
                }
              >
                {transaction?.status.charAt(0).toUpperCase() +
                  transaction?.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
