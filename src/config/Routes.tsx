import Login from '@/pages/Auth/Login';
import Orders from '@/pages/Orders';
import OrderSummary from '@/pages/Orders/OrderSummary/OrderSummaryPage';
import Products from '@/pages/Products';
import Stores from '@/pages/Stores';
import AddProductPage from '@/pages/Stores/AddProduct/AddProduct';

import CreateStorePage from '@/pages/Stores/CreateStore/CreateStorePage';
import EditStorePage from '@/pages/Stores/EditStore/EditStorePage';
import StoreDetails from '@/pages/Stores/StoreDetails';
import ProductDetailsPage from '@/pages/Stores/StoreDetails/ProductDetails/ProductDetailsPage';
import Transactions from '@/pages/Transactions';

import {Navigate} from 'react-router-dom';

export const authRoutes = [
  {
    path: 'login',
    element: <Login />,
  },
];

export const resetPasswordRoutes = [];

export const inAppRoutes = [
  {path: '/', element: <Navigate to="/stores" />},
  {path: 'stores', element: <Stores />},
  {path: '/stores/:storeId', element: <StoreDetails />},

  {
    path: 'products',
    element: <Products />,
  },
  {
    path: 'orders',
    element: <Orders />,
  },
  {
    path: 'transactions',
    element: <Transactions />,
  },
];

export const fullScreenRoutes = [
  {
    path: 'products/product-detail/:productId',
    element: <ProductDetailsPage />,
  },
  {
    path: 'store/create',
    element: <CreateStorePage />,
  },
  {
    path: 'products/add-product',
    element: <AddProductPage />,
  },
  {
    path: 'order/summary/:orderId',
    element: <OrderSummary />,
  },
  {path: 'store/edit-store/:storeId', element: <EditStorePage />},
];
