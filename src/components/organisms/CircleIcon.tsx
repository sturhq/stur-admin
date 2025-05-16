import {cn} from '@/lib/utils';
import {ComponentType, SVGProps} from 'react';
type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type IconComponentProps = {
  Icon: IconType;
  size?: number;
  className?: string;
  bgColor?: string;
  borderRadius?: string;
};

const CircleIcon = ({
  Icon,
  size = 17,
  className,
  bgColor = 'bg-[#F6F8FA]',
  borderRadius = 'rounded-3xl',
}: IconComponentProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center border w-[2.25rem] h-[2.25rem]',
        bgColor,
        borderRadius,
        className
      )}
    >
      <Icon
        width={size}
        height={size}
        className={cn('text-white', className)}
      />
    </div>
  );
};

export default CircleIcon;
