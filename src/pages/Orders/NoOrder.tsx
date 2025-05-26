import {Button} from '@/components/ui/button';
import React from 'react';

const NoOrder = () => {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="flex flex-col items-center gap-1">
        <p className="text-[1.25rem] font-bold">No order Yet</p>
        <p className="text-sm text-center">
          All orders will be displayed here
        </p>
        <Button className="mt-4">Create Order</Button>
      </div>
    </div>
  );
};

export default NoOrder;
