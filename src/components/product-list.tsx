import { BoxIcon } from 'lucide-react';
import type { Product } from '../services/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useProductStore } from '../store/product';
import ProductCard from './product-card';

interface ProductListProps {
  products: Product[];
  data: any;
  isLoading: boolean;
}

export default function ProductList({ data, isLoading, products }: ProductListProps) {
  const fetchMoreProducts = useProductStore(s => s.fetchMoreProducts);
  console.log('ProductList');

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="flex gap-2">
                <div className="h-10 bg-gray-200 rounded flex-1"></div>
                <div className="h-10 bg-gray-200 rounded flex-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="text-center py-12 h-[50vh] border-2 border-gray-400/25 rounded-xl border-dashed flex flex-col justify-center">
        <div className="text-gray-400 mb-4 text-center flex items-center justify-center">
          <BoxIcon size={100} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Showing {products.length} products out {data.total}
      </p>

      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreProducts}
        hasMore={true}
        loader={null}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {products.map((i, index) => (
          <ProductCard key={index} product={i} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
