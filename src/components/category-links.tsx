import { categories } from '@/lib/data';
import Link from 'next/link';
import { Button } from './ui/button';
import { slugify } from '@/lib/utils';

export function CategoryLinks() {
  return (
    <section>
      <h2 className="text-2xl font-bold font-headline mb-4 text-center">
        Explore Categories
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button asChild variant="outline" key={category.name}>
            <Link href={`/opportunities/${slugify(category.name)}`}>
              {category.name}
            </Link>
          </Button>
        ))}
      </div>
    </section>
  );
}
