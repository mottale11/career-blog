'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NewsletterForm({ className }: { className?: string }) {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    console.log('Newsletter subscription for:', email);
    toast({
      title: 'Subscribed!',
      description: "You've successfully subscribed to our newsletter.",
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <section
      className={cn(
        'w-full bg-card border rounded-lg p-8 md:p-12 shadow-sm',
        className
      )}
    >
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight font-headline sm:text-4xl">
          Stay Ahead of the Curve
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
          Subscribe to our newsletter to get the latest career opportunities
          delivered straight to your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto"
        >
          <Input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="h-11 flex-1"
          />
          <Button type="submit" size="lg" className="h-11">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
