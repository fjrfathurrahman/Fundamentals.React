import { useEffect } from 'react';
import ProductList from './components/product-list';
import SearchBar from './components/search-bar';
import SidebarFiltering from './components/sidebar-filtering';
import { useProductStore } from './store/product';

function App() {
  console.log('app');

  const fetchProducts = useProductStore(s => s.fetchProducts);
  const fetchCategories = useProductStore(s => s.fetchCategories);

  const category = useProductStore(s => s.filters.category);
  const limit = useProductStore(s => s.filters.limit);
  const sort = useProductStore(s => s.filters.sort);
  const order = useProductStore(s => s.filters.order);

  const data = useProductStore(s => s.data.rawResponse);
  const products = useProductStore(s => s.data.products);
  const isLoading = useProductStore(s => s.isLoading);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, limit, sort, order]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">E-commerce Components</h1>
        <p className="text-muted-foreground">A collection of reusable e-commerce components built with ShadcnUI and Tailwind CSS.</p>
      </div>

      <div className="flex gap-6">
        <SidebarFiltering />

        <div className="flex-1 space-y-4">
          <SearchBar />
          <ProductList data={data} isLoading={isLoading} products={products} />
        </div>
      </div>
    </div>
  );
}

export default App;
