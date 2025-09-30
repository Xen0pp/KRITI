
'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { Label } from './ui/label';

export type Filters = {
  query: string;
  craftType: string;
  region: string;
  price: [number, number];
};

interface DiscoverFiltersProps {
  onFiltersChange: (filters: Filters) => void;
}

const craftTypes = ["Pottery", "Paintings", "Textiles", "Jewelry", "Woodwork"];
const regions = ["Rajasthan", "Kerala", "Bihar", "Assam", "Gujarat"];

export function DiscoverFilters({ onFiltersChange }: DiscoverFiltersProps) {
  const [query, setQuery] = useState('');
  const [craftType, setCraftType] = useState('all');
  const [region, setRegion] = useState('all');
  const [price, setPrice] = useState<[number, number]>([0, 200]);

  const handleApplyFilters = () => {
    onFiltersChange({
      query,
      craftType,
      region,
      price,
    });
  };
  
  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleApplyFilters();
    }
  }

  return (
    <div className="space-y-6 p-6 rounded-lg bg-card border">
      <div className="relative">
        <Input
          placeholder="Search for crafts, artisans, or traditions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearchEnter}
          className="pl-4 pr-10 h-12 text-lg"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <Label>Craft Type</Label>
          <Select value={craftType} onValueChange={setCraftType}>
            <SelectTrigger>
              <SelectValue placeholder="Select craft type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crafts</SelectItem>
              {craftTypes.map(type => <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Region</Label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map(reg => <SelectItem key={reg} value={reg.toLowerCase()}>{reg}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
           <Label>Price Range: ₹{price[0]} - ₹{price[1]}</Label>
            <Slider
              min={0}
              max={200}
              step={5}
              value={price}
              onValueChange={(value) => setPrice(value as [number, number])}
            />
        </div>
      </div>
       <Button onClick={handleApplyFilters} className="w-full md:w-auto">Apply Filters</Button>
    </div>
  );
}
