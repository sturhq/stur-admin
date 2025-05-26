import {Card} from '@/components/ui/card';
import productImage from '@/assets/images/products.svg';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
// import {gaRecordEvent} from '@/analytics';

const NoProducts = () => {
  const navigate = useNavigate();
  // const addProduct = () => {
  //   gaRecordEvent('ADD_PRODUCT', 'user clicked add product from its page');
  //   navigate('/products/add-product');
  // };
  return (
    <Card className="bg-card-card2 py-[5.68rem] px-[12.25rem] mt-4">
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col justify-start mr-[9rem]">
          <h1 className="text-[1.25rem] font-bold">Add your products</h1>
          <p className="text-sm font-normal">
            Start by stocking your store with products your customers will
            love
          </p>
          <Button
            className="w-fit mt-4"
            // onClick={addProduct}
          >
            Add Product
          </Button>
        </div>
        <img src={productImage} alt="products" />
      </div>
    </Card>
  );
};

export default NoProducts;
