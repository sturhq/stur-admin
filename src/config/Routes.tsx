// import CheckYourMail from '@/pages/Auth/CheckYourMail';
// import ConfirmEmail from '@/pages/Auth/ConfirmEmail';
// import CreateAccount from '@/pages/Auth/CreateAccount';
// import CreatePassword from '@/pages/Auth/CreatePassword';
import Login from '@/pages/Auth/Login';
// import ProvideEmailRest from '@/pages/Auth/ProvideEmailRest';
// import ResetPassword from '@/pages/Auth/ResetPassword';
// import Dashboard from '@/pages/Dashboard';
// import CheckoutOptionsOnboarding from '@/pages/Onboarding/CheckoutOptions';
// import DeliveryAreasOnboarding from '@/pages/Onboarding/DeliveryAreas';
// import Launch from '@/pages/Onboarding/Launch';
// import PaymentMethodOnboarding from '@/pages/Onboarding/PaymentMethods';
// import ProductOnboarding from '@/pages/Onboarding/Product';
// import StoreOnboarding from '@/pages/Onboarding/Store';
// import Orders from '@/pages/Orders';
// import CreateOrderPage from '@/pages/Orders/CreateOrder/CreateOrderPage';
// import EditOrderPage from '@/pages/Orders/EditOrder/EditOrderPage';
// import OrderSummary from '@/pages/Orders/OrderSummary/OrderSummaryPage';
// import Payment from '@/pages/Payment';
// import PosDevice from '@/pages/Payment/PosTerminal';
// import VirtualTerminal from '@/pages/Payment/VirtualTerminal';
// import Products from '@/pages/Products';
// import AddProductPage from '@/pages/Products/AddProduct/AddProductPage';
// import EditDraftPage from '@/pages/Products/EditDraft/EditDraftPage';
// import EditProductPage from '@/pages/Products/EditProduct/EditProductPage';
// import ProductDetailsPage from '@/pages/Products/ProductDetails/ProductDetailsPage';
// import Settings from '@/pages/Settings';
// import CheckoutOptions from '@/pages/Settings/[slug]/CheckoutOptions';
// import DeliveryAreas from '@/pages/Settings/[slug]/DeliveryAreas';
// import MyProfile from '@/pages/Settings/[slug]/MyProfile';
// import StoreInformation from '@/pages/Settings/[slug]/StoreInformation';
// import Transactions from '@/pages/Transactions';
// import {Navigate} from 'react-router-dom';

export const authRoutes = [
  {
    path: 'login',
    element: <Login />,
  },
  /*  {
    path: 'create-account',
    element: <CreateAccount />,
  },
  {
    path: 'confirm-email',
    element: <ConfirmEmail />,
  },
  {
    path: 'create-password',
    element: <CreatePassword />,
  }, */
];

export const resetPasswordRoutes = [
  /*  {
    path: 'provide-email',
    element: <ProvideEmailRest />,
  },
  {
    path: 'check-your-email',
    element: <CheckYourMail />,
  },
  {
    path: 'reset',
    element: <ResetPassword />,
  }, */
];

export const inAppRoutes = [
  /*  {path: '/', element: <Navigate to="/dashboard" />},
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
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
  {
    path: 'payment',
    element: <Payment />,
  },
  {
    path: 'payment/virtual-terminal',
    element: <VirtualTerminal />,
  },
  {
    path: 'payment/pos-device',
    element: <PosDevice />,
  },
  {
    path: 'settings',
    element: <Settings />,
  },
  {
    path: 'settings/my-profile',
    element: <MyProfile />,
  },
  {
    path: 'settings/store-information',
    element: <StoreInformation />,
  },
  {
    path: 'settings/delivery-areas',
    element: <DeliveryAreas />,
  },
  {
    path: 'settings/checkout-options',
    element: <CheckoutOptions />,
  }, */
];

export const fullScreenRoutes = [
  /* {
    path: 'products/add-product',
    element: <AddProductPage />,
  },
  {
    path: 'products/edit-product/:productId',
    element: <EditProductPage />,
  },
  {
    path: 'products/product-detail/:productId',
    element: <ProductDetailsPage />,
  },
  {
    path: 'products/edit-draft/:productId',
    element: <EditDraftPage />,
  },
  {
    path: 'onboarding/store',
    element: <StoreOnboarding />,
  },
  {
    path: 'onboarding/products',
    element: <ProductOnboarding />,
  },
  {
    path: 'onboarding/payment-methods',
    element: <PaymentMethodOnboarding />,
  },
  {
    path: 'onboarding/checkout-options',
    element: <CheckoutOptionsOnboarding />,
  },
  {
    path: 'onboarding/delivery-areas',
    element: <DeliveryAreasOnboarding />,
  },
  {
    path: 'onboarding/launch',
    element: <Launch />,
  },
  {
    path: 'order/create-order',
    element: <CreateOrderPage />,
  },
  {
    path: 'order/summary/:orderId',
    element: <OrderSummary />,
  },
  {
    path: 'order/edit-order/:orderId',
    element: <EditOrderPage />,
  }, */
];
