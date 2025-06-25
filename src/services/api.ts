import axios from 'axios';
import { useEffect, useState } from 'react';

export function AxiosInstance() {
  return axios.create({
    baseURL: 'https://dummyjson.com',
  });
}

export function useGetProducts({ category }: { category: string | null }) {
  const [data, setData] = useState<any>([]);
  const [query, setQuery] = useState({ isLoading: false, isError: false });

  const URL = !category || category === 'all' ? 'products' : `products/category/${category}`;

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
  }, [category]);

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
