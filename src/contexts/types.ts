export type USERDATA = {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  isPaymentSetup: boolean;
  isProductSetup: boolean;
  verification: {
    bvn: {
      isVerified: boolean;
    };
    nin: {
      isVerified: boolean;
    };
    cac: {
      isVerified: boolean;
    };
    status: boolean;
  };
  isStoreLaunched: boolean;
  phone: string;
  isActive: boolean;
  tier: 'personal' | 'business';
  business_type:
    | 'FOOD_AND_BEVERAGES'
    | 'FASHION_AND_BEAUTY'
    | 'GROCERY'
    | 'RETAIL'
    | 'B2B'
    | 'DIGITAL_CREATORS'
    | 'SERVICE'
    | 'OTHERS';
  store?: {
    _id: string;
    storeName: string;
    storeDescription: string;
    storeLogoUrl: string;
    colorTheme: string;
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    storeLink: string;
    isSettlementSetup: boolean;
    isOnlinePaymentSetup: boolean;
    isOfflinePaymentSetup: boolean;
    storeUrl: string;
    storeSlug: string;
    phoneNumber: string;
    enableDelivery?: boolean;
    enableInstagramCheckout?: boolean;
    enablePayOnDelivery?: boolean;
    enablePickUp?: boolean;
    enableWhatsAppNotification?: boolean;
    requireEmail?: boolean;
  };
};
