import {cn} from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-[#F4F4F5]', className)}
      {...props}
    />
  );
}

export {Skeleton};
