import axios from 'axios';

//
export const AxiosInstance = () => axios.create({ baseURL: 'https://dummyjson.com' });

interface GetProductsParams {
  limit: number;
  skip: number;
  category: string;
  sort: string;
  order: 'asc' | 'desc';
  search?: string;
}

export async function getProducts({ category, limit, skip, order, sort, search }: GetProductsParams) {
  await new Promise(res => setTimeout(res, 700));

  const path = category !== 'all' ? `products/category/${category}` : `products`;
  const query = `?order=${order}&sortBy=${sort}&limit=${limit}&skip=${skip}`;

  if (search?.trim()) {
    return (await AxiosInstance().get(`${path}/search?q=${search}&sort=title&order=asc`)).data;
  }

  return (await AxiosInstance().get(`${path}${query}`)).data;
}


// GET List Categories
export async function getCategories() {
  return (await AxiosInstance().get('products/category-list')).data;
}
