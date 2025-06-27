import { create } from 'zustand';
import type { Product } from '../services/types';
import { getCategories, getProducts } from '../services/api';

export type Limit = 10 | 20 | 30 | 40 | 50;

interface ProductState {
  fetchProducts: () => Promise<void>;
  fetchMoreProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;

  data: {
    products: Product[];
    rawResponse: any;
  };
  categories: string[];

  filters: {
    limit: Limit;
    category?: string;
    setLimit: (limit: Limit) => void;
    setCategory: (category?: string) => void;
  };

  total: number;
  hasMore: boolean;

  isLoading: boolean;
  isError: boolean;
}

export const useProductStore = create<ProductState>((set, get) => ({
  data: {
    products: [],
    rawResponse: {},
  },
  categories: [],
  isError: false,
  isLoading: false,
  total: 0,
  hasMore: true,

  fetchProducts: async () => {
    set({ isLoading: true, isError: false });

    try {
      const { limit } = get().filters;
      const res = await getProducts({ limit, skip: 0 });

      set({
        data: {
          rawResponse: res,
          products: res?.products ?? [],
        },
        total: res?.total ?? 0,
        hasMore: (res?.products?.length ?? 0) < (res?.total ?? 0),
        isLoading: false,
      });
    } catch (e) {
      console.error(e);
      set({ isError: true, isLoading: false });
    }
  },

  fetchMoreProducts: async () => {
    const { data, total } = get();
    const currentCount = data.products.length;

    if (currentCount >= total) return;

    try {
      const res = await getProducts({ limit: 10, skip: currentCount });
      const newProducts = res?.products ?? [];

      set(state => ({
        data: {
          rawResponse: res,
          products: [...state.data.products, ...newProducts],
        },
        total: res?.total ?? total,
        hasMore: currentCount + newProducts.length < (res?.total ?? total),
      }));
    } catch (e) {
      console.error(e);
      set({ isError: true, isLoading: false });
    }
  },

  fetchCategories: async () => {
    try {
      set({ categories: await getCategories() });
    } catch (e) {
      console.error(e);
    }
  },

  filters: {
    limit: 30,
    category: undefined,
    setLimit: limit => set(state => ({ filters: { ...state.filters, limit } })),
    setCategory: category => set(state => ({ filters: { ...state.filters, category } })),
  },
}));
