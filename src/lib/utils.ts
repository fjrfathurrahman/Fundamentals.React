import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useProductStore } from '../store/product';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useActiveFilters() {
  const { filters: { order, sort, category } } = useProductStore();

  const filters = {
    category,
    sort,
    order,
  } as const;

  const filtered = Object.entries(filters).map(([key, value]) => ({
    label: `${key}: ${value}`,
  }));

  return filtered;
}

export const formatCurrency = (amount: number, currency: 'USD' | 'IDR') => {
  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};
