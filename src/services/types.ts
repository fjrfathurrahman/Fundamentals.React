export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };

  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };

  images: string[];
  thumbnail: string;
};

type Review = {
  rating: number;
  comment: string;
  date: string; 
  reviewerName: string;
  reviewerEmail: string;
};


// STORE ZUSTAND
// Types
export type TSort = 'title' | 'price' | 'stock' | 'discountPercentage' | 'rating';
export type TOrder = 'asc' | 'desc';
export type TLimit = 10 | 20 | 30 | 40 | 50;

// Filter State
interface ProductFilterState {
  search?: string;
  category: string;
  sort: TSort;
  order: TOrder;
  limit: TLimit;
}

// Filter Actions
interface ProductFilterActions {
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setSort: (value: TSort) => void;
  setOrder: (value: TOrder) => void;
  setLimit: (value: TLimit) => void;
}

// Async Actions
interface ProductAsyncActions {
  fetchProducts: () => Promise<void>;
  fetchMoreProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
}

// Store State
interface ProductState {
  data: {
    products: Product[];
    rawResponse: object;
  };
  categories: string[];
  total: number;
  hasMore: boolean;
  isLoading: boolean;
  isError: boolean;

  filters: ProductFilterState & ProductFilterActions;
}

// Main Zustand Store Type
export type ProductStore = ProductState & ProductAsyncActions;