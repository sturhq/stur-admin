import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nigerianCurrencyFormat = (amount: number) => {
  return `₦${new Intl.NumberFormat('en-NG', {
    currency: 'NGN',
    maximumFractionDigits: 2,
  }).format(amount)}`;
};

export const fileSizeConverter = (size: number) => {
  if (size >= 1024) {
    size = size / 1024;
    return size >= 1024
      ? `${(size / 1024).toFixed(1)} MB`
      : `${size.toFixed(1)} KB`;
  }
  return `${size} B`;
};

export const ellipsizeText = (text: string, maxlimit: number) => {
  if (text) {
    if (text.length > maxlimit) {
      return `${text.substring(0, maxlimit - 3)}...`;
    }
    return text;
  }
  return '';
};

export const hashTagText = (text: string) => {
  if (text) {
    return `#${text.replace(' ', '')}`;
  }
  return '';
};

export const deHyphenateText = (text: string) => {
  if (text) {
    return `${text.replace('-', ' ')}`;
  }
  return '';
};

export const CopyToClipboard = (text: string | number) => {
  navigator.clipboard.writeText(String(text));
};

export const renderPaymentStatusBadge = status => {
  switch (status) {
    case 'paid':
      return 'positive';
    case 'pending':
      return 'warning';
    case 'refunded':
      return 'negative';
    default:
      return 'info';
  }
};

export const renderStatusBadge = status => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'confirmed':
      return 'info';
    case 'completed':
      return 'positive';
    case 'cancelled':
      return 'negative';
    default:
      return 'info';
  }
};

export const renderDeliveryStatusBadge = status => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'out_for_delivery':
      return 'warning';
    case 'delivered':
      return 'positive';
    default:
      return 'info';
  }
};
