export type CREATEACCOUNT_TYPE = {
  email: string;
  business_type:
    | 'FOOD_AND_BEVERAGES'
    | 'FASHION_AND_BEAUTY'
    | 'GROCERY'
    | 'RETAIL'
    | 'B2B'
    | 'SERVICE'
    | 'DIGITAL_CREATORS'
    | 'OTHERS';
};

export type PRODUCT_TYPE = {
  _id?: string;
  subCategory: string;
  category: string;
  title: string;
  description: string;
  previewMedia: string;
  media: string[];
  price: number;
  stockQuantity: number;
  unit: string;
};

export type STORE_TYPE = {
  storeName?: string;
  storeDescription?: string;
  storeLogoUrl?: string;
  address?: string;
  state?: string;
  lga?: string;
  bannerUrl?: string;
  phoneNumber?: string;
  business_type?:
    | 'FOOD_AND_BEVERAGES'
    | 'FASHION_AND_BEAUTY'
    | 'GROCERY'
    | 'RETAIL'
    | 'B2B'
    | 'SERVICE'
    | 'DIGITAL_CREATORS'
    | 'OTHERS';
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  // colorTheme: string;
};

export type DELIVERY_AREAS_TYPE = {
  deliveryAreas: DELIVERY_AREAS_DTO[];
};

export type DELIVERY_AREAS_DTO = {
  name: string;
  price: number | string;
  active: boolean;
};

export type CHECKOUT_TYPE = {
  requireEmail?: boolean;
  enableDelivery?: boolean;
  enablePickUp?: boolean;
  enableInstagramCheckout?: boolean;
  enablePayOnDelivery?: boolean;
  enableWhatsAppNotification?: boolean;
};

export type ADD_BVN_TYPE = {
  bvn: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  tier: 'personal' | 'business' | '';
};

export type ADD_CAC_TYPE = {
  rcNumber: string;
  businessName: string;
  companyType: 'RC' | 'BN' | 'IT';
  cacDocumentUrl: string;
};

export type ADD_CATEGORY_TYPE = {
  name: string;
  status: 'visible' | 'hidden';
};

export type ADD_SUBCATEGORY_TYPE = {
  name: string;
  status: 'visible' | 'hidden';
  categoryId: string;
};

export type TRANSACTION_TYPES =
  | 'transfer'
  | 'card'
  | 'bank'
  | 'ussd'
  | 'qr'
  | 'charge';

export type TRANSACTION_SOURCE = 'web' | 'virtual_terminal' | 'pos';

export type ORDER_TYPE = {
  customerId?: string;
  storeId: string;
  tableNumber?: string;
  nickname?: string;
  phoneNumber: string;
  deliveryOption: 'in_store' | 'home_delivery';
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  deliveryAddress?: string;
  lga?: string;
  state?: string;
  notes?: string;
  paymentReference?: string;
};

export type ORDER_EDIT_TYPE = {
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

export type ORDER_PAYMENT_TYPE = {
  paymentOption: 'pay_on_delivery' | 'online_payment';
  paymentReference?: string;
};
