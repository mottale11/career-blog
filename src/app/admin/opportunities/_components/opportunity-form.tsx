'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { Opportunity, Category, Level } from '@/lib/types';
import { categories } from '@/lib/data';
import { format } from 'date-fns';
import { slugify } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const countries = ['USA', 'UK', 'Australia', 'Ireland', 'Global'];
const levels: Level[] = ['Undergraduate', 'Graduate', 'Postgraduate', 'Professional', 'All Levels'];

const opportunitySchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  slug: z.string().min(2, { message: 'Slug must be at least 2 characters.' }),
  category: z.string({ required_error: 'Please select a category.' }),
  organization: z.string().min(2),
  location: z.string(),
  country: z.string({ required_error: 'Please select a country.' }),
  level: z.string({ required_error: 'Please select a level.' }),
  summary: z.string().min(10),
  description: z.string().min(20),
  eligibility: z.string(),
  benefits: z.string(),
  applicationProcess: z.string(),
  deadline: z.date(),
  applicationLink: z.string().url(),
  featured: z.boolean(),
  trending: z.boolean(),
  status: z.enum(['draft', 'published']),
  tags: z.string(),
  image: z.string().url(),
  imageHint: z.string(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type OpportunityFormValues = z.infer<typeof opportunitySchema>;

export function OpportunityForm({ opportunity }: { opportunity?: Opportunity }) {
  const { toast } = useToast();
  const router = useRouter();
  const isEditMode = !!opportunity;

  const defaultValues = {
      title: opportunity?.title ?? '',
      slug: opportunity?.slug ?? '',
      category: opportunity?.category ?? 'Jobs',
      organization: opportunity?.organization ?? '',
      location: opportunity?.location ?? '',
      country: opportunity?.country ?? 'Global',
      level: opportunity?.level ?? 'All Levels',
      summary: opportunity?.summary ?? '',
      description: opportunity?.description ?? '',
      eligibility: opportunity?.eligibility.join('\n') ?? '',
      benefits: opportunity?.benefits.join('\n') ?? '',
      applicationProcess: opportunity?.applicationProcess ?? '',
      deadline: opportunity?.deadline ? new Date(opportunity.deadline) : new Date(),
      applicationLink: opportunity?.applicationLink ?? '',
      featured: opportunity?.featured ?? false,
      trending: opportunity?.trending ?? false,
      status: opportunity?.status ?? 'draft',
      tags: opportunity?.tags.join(', ') ?? '',
      image: opportunity?.image ?? 'https://picsum.photos/seed/new-post/600/400',
      imageHint: opportunity?.imageHint ?? '',
      metaTitle: opportunity?.metaTitle ?? '',
      metaDescription: opportunity?.metaDescription ?? '',
  };

  const form = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunitySchema),
    defaultValues,
  });

  function onSubmit(data: OpportunityFormValues) {
    console.log(data);
    toast({
      title: `Opportunity ${isEditMode ? 'updated' : 'created'}!`,
      description: 'The opportunity details have been saved. (Prototype only)',
    });
    // In a real app, you would call a server action to save the data
    // For now, we'll just log it and redirect.
    router.push('/admin/opportunities');
  }
  
  const title = form.watch('title');
  React.useEffect(() => {
    if (title && !isEditMode) {
      form.setValue('slug', slugify(title), { shouldValidate: true });
    }
  }, [title, form, isEditMode]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Core Details</CardTitle>
                    <CardDescription>This is the main content of the opportunity.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Software Engineering Internship" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                     <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., software-engineering-internship" {...field} />
                            </FormControl>
                             <FormDescription>This is the URL-friendly version of the title.</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Summary</FormLabel>
                            <FormControl>
                                <Textarea placeholder="A short summary of the opportunity" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Description</FormLabel>
                            <FormControl>
                                <Textarea rows={8} placeholder="The full, detailed description of the opportunity." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Details & Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <FormField
                        control={form.control}
                        name="eligibility"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Eligibility</FormLabel>
                            <FormControl>
                                <Textarea rows={5} placeholder="Enter each requirement on a new line." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="benefits"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Benefits</FormLabel>
                            <FormControl>
                                <Textarea rows={5} placeholder="Enter each benefit on a new line." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="applicationProcess"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Application Process</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe the steps to apply." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>SEO & Metadata</CardTitle>
                    <CardDescription>Optimize this post for search engines.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <FormField
                        control={form.control}
                        name="metaTitle"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Meta Title</FormLabel>
                            <FormControl>
                                <Input placeholder="A concise and engaging title for search results" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="metaDescription"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Meta Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="A brief summary to entice users in search results" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader><CardTitle>Status & Visibility</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="published" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Published</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="draft" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Draft</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Application Deadline</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date("1900-01-01") }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Organization</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                     <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {categories.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <Input placeholder="Comma-separated tags" {...field} />
                            </FormControl>
                            <FormDescription>Separated by commas (e.g., tech, remote, full-time).</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Organization</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Google" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Mountain View, CA" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select a level" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {levels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Media & Links</CardTitle></CardHeader>
                 <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageHint"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Image AI Hint</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., tech office" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="applicationLink"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Application Link</FormLabel>
                            <FormControl>
                                <Input placeholder="https://jobs.example.com/apply/123" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                 </CardContent>
            </Card>

             <Card>
                <CardHeader><CardTitle>Flags</CardTitle></CardHeader>
                 <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Featured</FormLabel>
                                    <FormDescription>
                                    Display this on the homepage.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="trending"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Hiring Now</FormLabel>
                                    <FormDescription>
                                    Mark this as a "hiring now" post.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                 </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-3">
             <Button type="submit" size="lg">
                <Save className="mr-2 h-4 w-4" />
                {isEditMode ? 'Save Changes' : 'Create Opportunity'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
