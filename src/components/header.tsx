'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Briefcase,
  Compass,
  Lightbulb,
  Menu,
  Plane,
  Search,
  User,
  X,
  ChevronDown,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';
import React from 'react';

const navItems: NavItem[] = [
  { name: 'AI Job Finder', href: '/foryou', icon: User },
  {
    name: 'Jobs',
    href: '/opportunities/Jobs',
    icon: Briefcase,
    children: [
      { name: 'Entry Level Jobs', href: '/opportunities?category=Jobs&q=Entry+Level' },
      { name: 'Mid Level Jobs', href: '/opportunities?category=Jobs&q=Mid+Level' },
      { name: 'Senior Level Jobs', href: '/opportunities?category=Jobs&q=Senior+Level' },
      { name: 'Remote Jobs', href: '/opportunities?category=Jobs&q=Remote' },
      { name: 'Government Jobs', href: '/opportunities?category=Jobs&q=Government' },
    ],
  },
  { name: 'Career Advice', href: '/opportunities/Career-Advice', icon: Lightbulb },
  { name: 'Study Abroad', href: '/opportunities/Study-Abroad', icon: Plane },
  { name: 'Search', href: '/opportunities', icon: Search },
];

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Compass className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Career Compass
            </span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 items-center space-x-4">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger
                    className={cn(
                      'flex items-center gap-1 transition-colors hover:text-primary focus:outline-none',
                      pathname.startsWith(item.href)
                        ? 'text-primary'
                        : 'text-foreground/60'
                    )}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                       <Link href={item.href}>All Jobs</Link>
                    </DropdownMenuItem>
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link href={child.href}>{child.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'transition-colors hover:text-primary',
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-foreground/60'
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex w-full max-w-sm">
            <SearchForm />
          </div>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User Profile</span>
          </Button>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                   <Link href="/" className="flex items-center space-x-2" onClick={() => setIsSheetOpen(false)}>
                    <Compass className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">Career Compass</span>
                  </Link>
                  <SheetTrigger asChild>
                     <Button variant="ghost" size="icon" aria-label="Close menu">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </div>
                <div className="p-4">
                  <SearchForm />
                </div>
                <nav className="flex-1 px-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        {!item.children ? (
                          <Link
                            href={item.href}
                            onClick={() => setIsSheetOpen(false)}
                            className={cn(
                              'flex items-center space-x-3 rounded-md px-3 py-2 text-base font-medium transition-colors',
                              pathname === item.href
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-accent hover:text-accent-foreground'
                            )}
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                          </Link>
                        ) : (
                          <Collapsible>
                            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                              <div className="flex items-center space-x-3">
                                <item.icon className="h-5 w-5" />
                                <span>{item.name}</span>
                              </div>
                              <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <ul className="pl-8 pt-2 space-y-1">
                                <li>
                                  <Link
                                    href={item.href}
                                    onClick={() => setIsSheetOpen(false)}
                                    className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                                  >
                                    All Jobs
                                  </Link>
                                </li>
                                {item.children.map((child) => (
                                  <li key={child.name}>
                                    <Link
                                      href={child.href}
                                      onClick={() => setIsSheetOpen(false)}
                                      className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </CollapsibleContent>
                          </Collapsible>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get('q') || '';

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('q') as string;
    if (query) {
      router.push(`/opportunities?q=${query}`);
    } else {
      router.push('/opportunities');
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <Input
        type="search"
        name="q"
        defaultValue={defaultQuery}
        placeholder="Search opportunities..."
        className="h-9 w-full rounded-full pl-10"
      />
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </form>
  )
}