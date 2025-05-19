import React, {useState} from 'react';
import PageHeader from '@/common/PageHeader';
import PageHelmet from '@/common/PageHelmet';
import {Button} from '@/components/ui/button';
import {Copy} from 'lucide-react';
import {toast} from '@/hooks/use-toast';
import {Badge} from '@/components/ui/badge';
import ProductSummaryCard from './ProductSummaryCards';
import ProductsTable from './ProductTable.tsx';
import {BlockModal} from './BlockModal.tsx';

const StoreDetails = () => {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <PageHelmet title="Store Details" />
      <div className="flex flex-col gap-5 w-full">
        <div>
          <PageHeader
            title="The Links International"
            button={
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Block user
                </Button>
              </div>
            }
          />
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText('www.stur.ng/thelinkstore');
              toast({
                description: 'Store link copied to clipboard',
                variant: 'success',
              });
            }}
          >
            <a
              className="text-[#6A7383]"
              href="https://www.stur.ng/thelinkstore"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.stur.ng/thelinkstore
            </a>
            <Copy className="w-4 h-4" />
          </div>
          <div className="flex col gap-2 mt-4">
            <Badge variant="positive">Complete</Badge>
            <Badge variant="default">Standard</Badge>
          </div>
        </div>
        <ProductSummaryCard />
        <ProductsTable />
      </div>
      <BlockModal open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};

export default StoreDetails;
