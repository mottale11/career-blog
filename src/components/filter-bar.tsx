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

// Static lists
const locations = ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia', 'South Africa', 'Nigeria', 'Ghana', 'USA', 'UK', 'Australia', 'Ireland', 'Global'];
const levels = ['Undergraduate', 'Graduate', 'Postgraduate', 'Professional', 'Internship', 'All Levels'];

interface FilterBarProps {
    industriesList?: { id: string; name: string }[];
    fieldsList?: { id: string; name: string }[];
}

export function FilterBar({ industriesList = [], fieldsList = [] }: FilterBarProps) {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

                {/* Field Filter */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Field</label>
                    <Select
                        onValueChange={(value) => handleFilterChange('field', value)}
                        defaultValue={searchParams.get('field') || 'all'}
                    >
                        <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Field" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Fields</SelectItem>
                            {fieldsList.map((f) => (
                                <SelectItem key={f.id} value={f.name}>
                                    {f.name}
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
                            {industriesList.map((ind) => (
                                <SelectItem key={ind.id} value={ind.name}>
                                    {ind.name}
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
