import {Card} from '@/components/ui/card';
import {useUser} from '@/hooks/useUser';
import {nigerianCurrencyFormat} from '@/lib/utils';
// import {useGetProductStatitics} from '@/services/products.service';
import {Skeleton} from '@/components/ui/skeleton';
import IconComponent from '@/components/organisms/CircleIcon';
// import MobileProductSummaryCard from './Mobile/MobileProductSummaryCard';
import {
  CubeIcon,
  CurrencyDollarIcon,
  GlobeAsiaAustraliaIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/solid';
interface StoreSummaryCardsProps {
  statistics?: {
    totalProducts?: number;
    totalDrafts?: number;
  };
  isLoading?: boolean;
}

const ProductSummaryCard = ({
  statistics,
  isLoading,
}: StoreSummaryCardsProps) => {
  return (
    <div>
      {' '}
      <div className="flex gap-4 items-center justify-between w-full max-lg:hidden">
        <Card className="p-4 w-full   transition-all duration-500 ease-in-out flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Total Products
            </h1>
            {isLoading ? (
              <Skeleton className="w-20 h-7" />
            ) : (
              <div className="text-xl font-bold">
                {statistics.totalProducts}
              </div>
            )}
          </div>
        </Card>
        <Card className="p-4 w-full  transition-all duration-500 ease-in-out  flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Total Drafts
            </h1>
            {isLoading ? (
              <Skeleton className="w-20 h-7" />
            ) : (
              <p className="text-xl font-bold">{statistics.totalDrafts}</p>
            )}
          </div>
        </Card>
      </div>
      {/* <div className="hidden max-lg:block">
        <MobileProductSummaryCard />
      </div> */}
    </div>
  );
};

export default ProductSummaryCard;
