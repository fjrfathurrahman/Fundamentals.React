import { create } from 'zustand';
import type { Product, ProductStore } from '../services/types';
import { getCategories, getProducts } from '../services/api';

export const useProductStore = create<ProductStore>((set, get) => ({
  data: { products: [], rawResponse: {} },
  categories: [],
  total: 0,
  hasMore: true,
  isLoading: false,
  isError: false,

  filters: {
    search: '',
    category: 'all',
    sort: 'title',
    order: 'asc',
    limit: 30,

    setSearch: search =>
      set(state => ({
        filters: { ...state.filters, search },
      })),

    setCategory: category =>
      set(state => ({
        filters: { ...state.filters, category },
      })),

    setSort: sort =>
      set(state => ({
        filters: { ...state.filters, sort },
      })),

    setOrder: order =>
      set(state => ({
        filters: { ...state.filters, order },
      })),

    setLimit: limit =>
      set(state => ({
        filters: { ...state.filters, limit },
      })),
  },

  fetchProducts: async () => {
    set({ isLoading: true, isError: false });

    try {
      const { limit, category, order, sort } = get().filters;
      const res = await getProducts({ category, limit, order, skip: 0, sort });

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
      const { category, order, sort, limit } = get().filters;
      const res = await getProducts({
        category,
        order,
        sort,
        limit,
        skip: currentCount,
      });

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
      const categories = await getCategories();
      set({ categories });
    } catch (e) {
      console.error(e);
    }
  },
}));
