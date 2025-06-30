import { Search, ListFilter, ArrowUpNarrowWide, LayoutGrid } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useProductStore } from '../store/product';
import type { TLimit, TOrder, TSort } from '../services/types';
import { useDebounce } from 'use-debounce';
import { useEffect } from 'react';

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 w-full max-w-full">
      <SearchComponent />
      <SortComponent />
      <OrderComponent />
      <LimitComponent />
    </div>
  );
}

const SearchComponent = () => {
  const search = useProductStore(s => s.filters.search);
  const setSearch = useProductStore(s => s.filters.setSearch);
  const fetchProducts = useProductStore(s => s.fetchProducts);

  const [debouncedSearch] = useDebounce(search, 600);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, debouncedSearch]);

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input className="pl-10 pr-10" placeholder="Search a products is here..." value={search} onChange={v => setSearch(v.target.value)} />
    </div>
  );
};

const SortComponent = () => {
  const sort = useProductStore(s => s.filters.sort);
  const setSort = useProductStore(s => s.filters.setSort);

  return (
    <Select value={sort} onValueChange={v => setSort(v as TSort)}>
      <SelectTrigger className="w-[180px]">
        <ListFilter className="mr-2 h-4 w-4 text-muted-foreground" />
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        {[
          { label: 'Title', value: 'title' },
          { label: 'Price', value: 'price' },
          { label: 'Stock', value: 'stock' },
          { label: 'Discount %', value: 'discountPercentage' },
          { label: 'Rating', value: 'rating' },
        ].map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const OrderComponent = () => {
  const order = useProductStore(s => s.filters.order);
  const setOrder = useProductStore(s => s.filters.setOrder);

  return (
    <Select value={order} onValueChange={(v: TOrder) => setOrder(v)}>
      <SelectTrigger className="w-[150px]">
        <ArrowUpNarrowWide className="mr-2 h-4 w-4 text-muted-foreground" />
        <SelectValue placeholder="..." />
      </SelectTrigger>

      <SelectContent>
        {[
          { name: 'Ascending', value: 'asc' },
          { name: 'Descending ', value: 'desc' },
        ].map(item => (
          <SelectItem key={item.name} value={item.value}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const LimitComponent = () => {
  const limit = useProductStore(s => s.filters.limit);
  const setLimit = useProductStore(s => s.filters.setLimit);

  return (
    <Select value={limit.toString()} onValueChange={v => setLimit(Number(v) as TLimit)}>
      <SelectTrigger className="w-[150px]">
        <LayoutGrid className="mr-2 h-4 w-4 text-muted-foreground" />
        <SelectValue placeholder="Items per page" />
      </SelectTrigger>

      <SelectContent>
        {[10, 20, 30, 40, 50].map(item => (
          <SelectItem key={item} value={item.toString()}>
            {item} items
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
