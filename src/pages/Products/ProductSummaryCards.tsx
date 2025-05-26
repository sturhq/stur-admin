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

const ProductSummaryCard = () => {
  const {userData} = useUser();
  // const {data, isPending} = useGetProductStatitics(userData?.store?._id);
  // const statistics = data?.data.data;

  return (
    <div>
      {' '}
      <div className="flex gap-4 items-center justify-between w-full max-lg:hidden">
        <Card className="p-4 w-full   transition-all duration-500 ease-in-out flex gap-[0.9375rem] items-center">
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Total Products
            </h1>
            {/* {isPending ? (
              <Skeleton className="w-20 h-7" />
            ) : (
              <p className="text-xl font-bold">
                {statistics?.inventoryValue &&
                  nigerianCurrencyFormat(statistics?.inventoryValue)}
              </p>
            )} */}
            <div className="text-xl font-bold">67,292</div>
          </div>
        </Card>
        <Card className="p-4 w-full  transition-all duration-500 ease-in-out  flex gap-[0.9375rem] items-center">
          {/* <IconComponent
            Icon={CubeIcon}
            bgColor="bg-[#FF9000]"
            className=""
          /> */}
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Total Drafts
            </h1>
            <p className="text-xl font-bold">892</p>
          </div>
        </Card>
        {/* <Card className="p-4 w-full  transition-all duration-500 ease-in-out flex gap-[0.9375rem] items-center">
          <IconComponent
            Icon={ShoppingCartIcon}
            bgColor="bg-[#DF1B41]"
            className=""
          />
          <div>
            <h1 className="text-base font-semibold leading-5 mb-1 text-[#6A7383]">
              Out of stock
            </h1>
            <p className="text-xl font-bold">
              {isPending ? (
                <Skeleton className="w-20 h-7" />
              ) : (
                statistics?.outOfStock
              )}
            </p>
          </div>
        </Card> */}
      </div>
      {/* <div className="hidden max-lg:block">
        <MobileProductSummaryCard />
      </div> */}
    </div>
  );
};

export default ProductSummaryCard;
