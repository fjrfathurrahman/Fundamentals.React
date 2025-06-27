'use client';

import { Search, X, Filter, ListFilter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useProductStore } from '../store/product';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
}

export default function SearchBar({ placeholder = 'Search products...', value, onValueChange, onClear }: SearchBarProps) {
  console.log('SearchBar');

  const limit = useProductStore(s => s.filters.limit)
  const setLimit = useProductStore(s => s.filters.setLimit);

  return (
    <div className="flex items-center gap-2 w-full max-w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input type="text" placeholder={placeholder} value={value} onChange={e => onValueChange?.(e.target.value)} className="pl-10 pr-10" />

        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      <Button variant="outline" className="relative">
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>

      {/* Limit Data */}
      <Select value={limit.toString()} onValueChange={(value: any) => setLimit(value)}>
        <SelectTrigger className="w-[150px]">
          <ListFilter className="mr-2 h-4 w-4 text-muted-foreground" />
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
    </div>
  );
}
