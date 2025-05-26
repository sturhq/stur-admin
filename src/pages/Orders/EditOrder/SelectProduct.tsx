import {Button} from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {Input} from '@/components/ui/input';
import {ChevronRight} from 'lucide-react';
import {Search} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useGetCategories,
  useGetProducts,
} from '@/services/products.service';
import {useUser} from '@/hooks/useUser';
import {useEffect, useState} from 'react';
import {Separator} from '@/components/ui/separator';
import {Checkbox} from '@/components/ui/checkbox';
import {ScrollArea} from '@/components/ui/scroll-area';
import {nigerianCurrencyFormat} from '@/lib/utils';
import ImageComponent from '@/components/organisms/ImageComponent';
import {Spinner} from '@/components/ui/spinner';

type ORDER_EDIT_TYPE = {
  storeId: string;
  deliveryAddress: string;
  deliveryAreaId: string;
  deliveryOption: 'home_delivery' | 'in_store';
  items: {
    productId: string;
    quantity: number;
  }[];
  lga: string;
  state: string;
};

interface Props {
  selectedProducts: ORDER_EDIT_TYPE[];
  setSelectedProducts: (products: ORDER_EDIT_TYPE[]) => void;
}

const SelectProduct = ({selectedProducts, setSelectedProducts}: Props) => {
  const [open, setOpen] = useState(false);
  const {userData} = useUser();
  const page = 1;
  const limit = 50;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null
  );
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  // Local state for selected items - initialize from the store
  const [localSelectedItems, setLocalSelectedItems] = useState([]);

  // Sync local state with store when sheet opens or store changes
  useEffect(() => {
    if (open) {
      setLocalSelectedItems([...selectedProducts]);
    }
  }, [open, selectedProducts]);

  const {data: categoriesData} = useGetCategories(
    userData?.store._id,
    null,
    null,
    'visible'
  );
  const categories = categoriesData?.data?.data;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const {data, isLoading, refetch} = useGetProducts(
    page,
    limit,
    userData?.store._id,
    'published',
    selectedCategory
  );

  const products = data?.data.data || [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    if (!value.trim()) {
      setSearchResult([]);
      return;
    }

    const filteredProducts = products.filter(product =>
      product?.title?.toLowerCase().includes(value)
    );
    setSearchResult(filteredProducts);
  };

  const handleItemSelect = item => {
    setLocalSelectedItems(prevItems => {
      const isSelected = prevItems.some(
        product => product._id === item._id
      );

      if (isSelected) {
        return prevItems.filter(product => product._id !== item._id);
      } else {
        return [...prevItems, {...item, quantity: 1}];
      }
    });
  };

  const handleAddToStore = () => {
    // Convert the local items to match the expected structure
    const formattedItems = localSelectedItems.map(item => ({
      _id: crypto.randomUUID(), // Generate a unique ID for the order item
      product: {
        _id: item._id,
        title: item.title,
        previewMedia: item.previewMedia,
        price: item.price,
        stockQuantity: item.stockQuantity,
        unit: item.unit,
        category: item.category,
        subCategory: item.subCategory,
        description: item.description,
        media: item.media,
        store: item.store,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      },
      quantity: item.quantity || 1,
      price: item.price,
      subtotal: item.price * (item.quantity || 1),
    }));

    // @ts-expect-error - ignore that TypeScript doesn't know about the structure
    setSelectedProducts(formattedItems);
    setOpen(false);
  };

  const handleQuantityChange = (item, increment: boolean) => {
    setLocalSelectedItems(prevItems => {
      return prevItems.map(prevItem => {
        if (prevItem._id === item._id) {
          const newQuantity = increment
            ? (prevItem.quantity || 1) + 1
            : Math.max(1, (prevItem.quantity || 1) - 1);
          return {...prevItem, quantity: newQuantity};
        }
        return prevItem;
      });
    });
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, page]);

  useEffect(() => {
    if (open) {
      // Convert the selected products back to the local format if needed
      const normalizedItems = selectedProducts.map(item => ({
        // @ts-expect-error - ignore that TypeScript doesn't know about the structure
        ...item.product,
        // @ts-expect-error - ignore that TypeScript doesn't know about the structure
        quantity: item.quantity,
      }));
      setLocalSelectedItems(normalizedItems);
    }
  }, [open, selectedProducts]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button
          variant="secondary"
          className="flex items-center justify-between"
        >
          <div className="text-sm">Add Item</div>
          <ChevronRight size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className=" w-full sm:max-w-[36.5rem] px-0">
        <SheetHeader className="px-5 border-b pb-5">
          <SheetTitle>Select Product</SheetTitle>
        </SheetHeader>
        <SheetDescription className="px-5 pt-5">
          <div className="flex flex-col gap-3">
            <Input
              icon={<Search width={23} height={23} color="#30313D" />}
              className="rounded-xl"
              placeholder="Search for products"
              value={searchValue}
              onChange={handleSearch}
            />
            {categories?.length > 0 && (
              <Select
                onValueChange={handleCategoryChange}
                value={selectedCategory}
              >
                <SelectTrigger>
                  <SelectValue>
                    {selectedCategory || 'Select Category'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>All Categories</SelectItem>
                  {categories?.map(category => (
                    <SelectItem key={category._id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <ScrollArea className="h-[calc(100vh-18rem)] mt-6">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Spinner />
              </div>
            )}
            <div className="flex flex-col gap-4">
              {(searchResult.length > 0 ? searchResult : products).map(
                (item, index: number) => {
                  const selectedItem = localSelectedItems.find(
                    local => local._id === item._id
                  );
                  const quantity = selectedItem?.quantity || 1;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-4 pl-1"
                    >
                      <div className="flex items-center gap-[0.45rem]">
                        <Checkbox
                          checked={localSelectedItems.some(
                            product => product._id === item._id
                          )}
                          onCheckedChange={() => handleItemSelect(item)}
                          className="h-5 w-5"
                          id={item._id}
                        />
                        <div>
                          <ImageComponent
                            src={item?.previewMedia}
                            alt="Item"
                            className="w-[4.725rem] h-[4.725rem] rounded-md"
                            imageClass="w-[4.725rem] h-[4.725rem] !rounded-md"
                            placeholderClass="w-[2rem] h-[2rem]"
                          />
                        </div>
                        <div>
                          <p className="text-foreground text-sm font-semibold">
                            {item?.title}
                          </p>
                          <div className="flex gap-[0.4338rem]">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-[#F6F8FA] rounded-[15rem] px-[11.89px] py-[2.97px] w-[1.6106rem] h-[1.6106rem]"
                              onClick={() =>
                                handleQuantityChange(item, true)
                              }
                              disabled={
                                !selectedItem ||
                                (selectedItem &&
                                  selectedItem.quantity >=
                                    item.stockQuantity)
                              }
                            >
                              +
                            </Button>

                            <div className="w-fit h-[1.62rem] rounded-lg border flex items-center justify-between px-2 text-foreground">
                              <span className="font-bold pr-2">
                                {selectedItem ? quantity : 1}
                              </span>
                              <Separator orientation="vertical" />
                              <span className="font-semibold pl-2">
                                {nigerianCurrencyFormat(
                                  item.price *
                                    (selectedItem ? quantity : 1)
                                )}
                              </span>
                            </div>

                            <Button
                              variant="outline"
                              size="default"
                              className="bg-[#F6F8FA] rounded-[15rem] px-[11.89px] py-[2.97px] w-[1.6106rem] h-[1.6106rem]"
                              onClick={() =>
                                handleQuantityChange(item, false)
                              }
                              disabled={!selectedItem || quantity <= 1}
                            >
                              -
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </ScrollArea>
          <div className="absolute bottom-0 right-0 px-5 pb-5 w-full">
            <SheetFooter>
              <Button
                className="w-full"
                onClick={handleAddToStore}
                disabled={localSelectedItems.length === 0}
              >
                Add {localSelectedItems.length === 1 ? 'Item' : 'Items'}
              </Button>
            </SheetFooter>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default SelectProduct;
