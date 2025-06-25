/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import type { Product } from '../services/types';
import { useGetCategories, useGetProducts } from '../services/api';

interface ProductContext {
  data: any;
  products: Product[];
  isLoading: boolean;
  isError: boolean;

  categories: string[]
  category: string | null;
  setCategory: (category: string | null) => void;
}

export const ProductContext = createContext<ProductContext | null>(null);

export default function ProductProvider({ children }: { children: React.ReactNode }) {
  // Get All Products
  const { products, response, isError, isLoading } = useGetProducts();
  
  // Feature Category
  const [category, setCategory] = useState<string | null>(null);
  const { categories } = useGetCategories();

  // values
  const values = useMemo(
    () => ({
      data: response,
      products,
      isLoading,
      isError,

      categories,
      category,
      setCategory,
    }),
    [products, isError, isLoading, response, categories,  category, setCategory]
  );

  return <ProductContext.Provider value={values}>{children}</ProductContext.Provider>;
}

export const useProduct = (): ProductContext => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }

  return context;
};
