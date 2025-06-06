import {ArrowLeft} from '@/assets/svgs/Icons';

import {ChevronRight} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';

export const BreadCrumb = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-8">
      <div className="hidden md:flex items-center gap-1.5">
        <p
          className="font-semibold text-sm text-[#6A7383] hover:text-[#5433EB] cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Stores
        </p>
        <ChevronRight className="w-3.5 h-3.5" />
        <p className="font-semibold text-sm capitalize text-[#5433EB]">
          Products
        </p>
      </div>
      <Link to={'/stores'} className="flex md:hidden w-fit">
        <span className="flex items-center gap-2 font-bold text-base text-[#30313D]">
          <ArrowLeft />
          Stores
        </span>
      </Link>
    </div>
  );
};
