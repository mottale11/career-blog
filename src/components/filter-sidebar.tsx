'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const locations = ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia', 'South Africa', 'Nigeria', 'Ghana', 'USA', 'UK', 'Australia', 'Ireland', 'Global'];
const levels = ['Undergraduate', 'Graduate', 'Postgraduate', 'Professional', 'Internship', 'All Levels'];
const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Agriculture', 'Engineering', 'Creative', 'Non-profit'];
const categories = ['Jobs', 'Scholarships', 'Internships', 'Fellowships', 'Grants', 'Career Advice', 'Study Abroad'];

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (type: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (value && value !== 'all') {
      current.set(type, value);
    } else {
      current.delete(type);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  const handleReset = () => {
    router.push(pathname);
  }

  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        <h2 className="text-xl font-bold font-headline">Filters</h2>

        <div className="space-y-2">
          <label className="text-sm font-medium">Country</label>
          <Select
            onValueChange={(value) => handleFilterChange('country', value)}
            defaultValue={searchParams.get('country') || 'all'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {locations.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select
            onValueChange={(value) => handleFilterChange('category', value)}
            defaultValue={searchParams.get('category') || 'all'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Industry</label>
          <Select
            onValueChange={(value) => handleFilterChange('industry', value)}
            defaultValue={searchParams.get('industry') || 'all'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Level</label>
          <Select
            onValueChange={(value) => handleFilterChange('level', value)}
            defaultValue={searchParams.get('level') || 'all'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="ghost" className="w-full" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </aside>
  );
}
