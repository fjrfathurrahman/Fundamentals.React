import './App.css';
import SearchBar from './components/search-bar';
import { ProductList } from './components/product-list';
import ProductProvider from './hooks/product-context';
import { SidebarFiltering } from './components/sidebar-filtering';

function App() {
  return (
    <ProductProvider>
      <div className="container mx-auto p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">E-commerce Components</h1>
          <p className="text-muted-foreground">A collection of reusable e-commerce components built with ShadcnUI and Tailwind CSS.</p>
        </div>

        <div className="flex gap-6">
          <SidebarFiltering />
          
          <div className="flex-1 space-y-4">
            <SearchBar />
            <ProductList />
          </div>
        </div>
      </div>
    </ProductProvider>
  );
}

export default App;