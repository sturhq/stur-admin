import {ArrowLeft} from '@/assets/svgs/Icons';
import {deHyphenateText} from '@/lib/utils';
import {ChevronRight} from 'lucide-react';
import {Link} from 'react-router-dom';

export const SettingsBreadCrumbs = ({crumbs}: {crumbs: string}) => {
  return (
    <div>
      <div className="hidden md:flex items-center gap-1.5">
        <Link
          className="font-semibold text-sm text-[#6A7383] hover:text-[#5433EB]"
          to={'/settings'}
        >
          Settings
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <p className="font-semibold text-sm capitalize text-[#5433EB]">
          {deHyphenateText(crumbs)}
        </p>
      </div>
      <Link to={'/settings'} className="flex md:hidden w-fit">
        <span className="flex items-center gap-2 font-bold text-base text-[#30313D]">
          <ArrowLeft />
          Settings
        </span>
      </Link>
    </div>
  );
};
