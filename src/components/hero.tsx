'use client';
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Hero() {
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;
    router.push(`/opportunities?q=${query}`);
  };

  return (
    <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] flex items-center justify-center text-white">
      <Image
        src="/hero_image.png"
        alt="Hero background image"
        fill
        className="object-cover"
        priority
        data-ai-hint="Hero background image for career opportunities"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight">
          Navigate Your Career Path
        </h1>
        <p className="mt-4 text-lg md:text-xl text-primary-foreground/90">
          Discover a world of opportunities. Jobs, scholarships, internships,
          and more, all in one place.
        </p>
        <form
          onSubmit={handleSearch}
          className="mt-8 flex flex-col sm:flex-row w-full max-w-xl mx-auto"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              name="query"
              placeholder="e.g., 'Software Engineer' or 'Scholarship in UK'"
              className="w-full h-12 pl-12 pr-4 text-foreground rounded-full sm:rounded-r-none"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="mt-2 sm:mt-0 h-12 rounded-full sm:rounded-l-none"
          >
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}
