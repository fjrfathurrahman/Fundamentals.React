import axios from 'axios';
import { useEffect, useState } from 'react';
import { useProductStore } from '../store/product';

//
export const AxiosInstance = () => axios.create({ baseURL: 'https://dummyjson.com' });

export async function getProducts({ limit, skip }: { limit: number; skip: number }) {
  await new Promise(resolve => setTimeout(resolve, 700));

  const endpoint = `products?limit=${limit}&skip=${skip}`;
  const res = await AxiosInstance().get(endpoint);
  return res.data;
}


export async function getCategories() {
  return (await AxiosInstance().get('products/category-list')).data;
}

export function useGetProducts({ category }: { category: string | null }) {
  const [data, setData] = useState<any>([]);
  const [query, setQuery] = useState({ isLoading: false, isError: false });

  const {
    filters: { limit },
  } = useProductStore();

  // Endpoint
  const URL = `products?limit=${limit}`;

  const fecthData = async () => {
    setQuery(prev => ({ ...prev, isLoading: true }));

    try {
      const response = (await AxiosInstance().get(URL)).data;
      console.log('useGetProducts', response);

      setData(response);
    } catch (error) {
      console.log('useGetCategories', error);
      setQuery(prev => ({ ...prev, isError: true }));
      return;
    } finally {
      setQuery(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    fecthData();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, limit]);

  return {
    response: data,
    products: data?.products || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export function useGetCategories() {
  const [data, setData] = useState<any>([]);

  const fecthData = async () => {
    try {
      const response = (await AxiosInstance().get('products/category-list')).data;

      setData(response);
    } catch (error) {
      console.log('useGetCategories', error);
    }
  };

  useEffect(() => {
    fecthData();

    return () => {};
  }, []);

  return {
    categories: data,
  };
}
