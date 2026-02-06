'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { categories } from '@/lib/data';

// Extended lists for filters
const locations = ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia', 'South Africa', 'Nigeria', 'Ghana', 'USA', 'UK', 'Australia', 'Ireland', 'Global'];
const levels = ['Undergraduate', 'Graduate', 'Postgraduate', 'Professional', 'Internship', 'All Levels'];
const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Agriculture', 'Engineering', 'Creative', 'Non-profit'];
const remoteOptions = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
    { label: 'Any', value: 'all' },
];

export function FilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilterChange = (key: string, value: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (value && value !== 'all') {
            current.set(key, value);
        } else {
            current.delete(key);
        }

        const search = current.toString();
        const query = search ? `?${search}` : '';

        router.push(`/${query}`);
    };

    const handleReset = () => {
        router.push('/');
    };

    return (
        <section className="bg-muted/30 p-4 rounded-lg border mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Location Filter */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Location</label>
                    <Select
                        onValueChange={(value) => handleFilterChange('location', value)}
                        defaultValue={searchParams.get('location') || 'all'}
                    >
                        <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            {locations.map((loc) => (
                                <SelectItem key={loc} value={loc}>
                                    {loc}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Field/Category Filter */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Field</label>
                    <Select
                        onValueChange={(value) => handleFilterChange('category', value)}
                        defaultValue={searchParams.get('category') || 'all'}
                    >
                        <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Fields</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat.name} value={cat.name}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Industry Filter */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Industry</label>
                    <Select
                        onValueChange={(value) => handleFilterChange('industry', value)}
                        defaultValue={searchParams.get('industry') || 'all'}
                    >
                        <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Industry" />
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

                {/* Remote Filter */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Remote</label>
                    <Select
                        onValueChange={(value) => handleFilterChange('remote', value)}
                        defaultValue={searchParams.get('remote') || 'all'}
                    >
                        <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Remote" />
                        </SelectTrigger>
                        <SelectContent>
                            {remoteOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Level Filter */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Level</label>
                    <Select
                        onValueChange={(value) => handleFilterChange('level', value)}
                        defaultValue={searchParams.get('level') || 'all'}
                    >
                        <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            {levels.map((lvl) => (
                                <SelectItem key={lvl} value={lvl}>
                                    {lvl}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Reset Button (only show if filters are active) */}
            {Array.from(searchParams.entries()).length > 0 && (
                <div className="mt-4 flex justify-end">
                    <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-foreground">
                        Reset Filters
                    </Button>
                </div>
            )}
        </section>
    );
}
