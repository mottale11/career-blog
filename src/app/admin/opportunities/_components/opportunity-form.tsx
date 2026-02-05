'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { createOpportunity, updateOpportunity } from '../../actions';
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
import type { Opportunity, Level } from '@/lib/types';
import type { Category } from '@/lib/categories';
// import { categories } from '@/lib/data';
import { format, isValid } from 'date-fns';
import { slugify } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { uploadImage } from '@/lib/storage';

const countries = ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia', 'South Africa', 'Nigeria', 'Ghana', 'USA', 'UK', 'Australia', 'Ireland', 'Global'];
const levels: Level[] = ['Undergraduate', 'Graduate', 'Postgraduate', 'Professional', 'Internship', 'All Levels'];

import { RichTextEditor } from '@/components/ui/rich-text-editor';

const opportunitySchema = z.object({
    title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
    slug: z.string().min(2, { message: 'Slug must be at least 2 characters.' }),
    category: z.string({ required_error: 'Please select a category.' }),
    organization: z.string().min(2),
    location: z.string(),
    country: z.string({ required_error: 'Please select a country.' }),
    level: z.string({ required_error: 'Please select a level.' }),
    summary: z.string().optional(),
    description: z.string().min(20),
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

interface OpportunityFormProps {
    opportunity?: Opportunity;
    categories: Category[];
}

export function OpportunityForm({ opportunity, categories }: OpportunityFormProps) {
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

    const [isLoading, setIsLoading] = React.useState(false);
    const [isUploadingImage, setIsUploadingImage] = React.useState(false);

    async function onSubmit(data: OpportunityFormValues) {
        setIsLoading(true);
        try {
            // Generate summary from description
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.description, 'text/html');
            const textContent = doc.body.textContent || "";
            const summary = textContent.substring(0, 200).trim() + (textContent.length > 200 ? '...' : '');

            const submissionData = {
                ...data,
                summary: summary || "No summary available",
            };

            if (isEditMode && opportunity) {
                await updateOpportunity(opportunity.id, submissionData);
                toast({
                    title: "Opportunity updated",
                    description: "The opportunity has been successfully updated.",
                });
            } else {
                await createOpportunity(submissionData);
                toast({
                    title: "Opportunity created",
                    description: "The new opportunity has been successfully created.",
                });
            }
            // Redirect is handled in server action, but we might want to ensure we don't do anything else
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
            setIsLoading(false);
        }
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
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Description</FormLabel>
                                        <FormControl>
                                            <RichTextEditor
                                                content={field.value}
                                                onChange={field.onChange}
                                                placeholder="The full, detailed description of the opportunity."
                                            />
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
                            {/* Status field removed in favor of action buttons */}
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
                                                        {field.value && isValid(field.value) ? (
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
                                                    disabled={(date) => date < new Date("1900-01-01")}
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
                                                {categories.filter(c => !c.parent_id).map((category) => (
                                                    <div key={category.id}>
                                                        <SelectItem value={category.name}>
                                                            {category.name}
                                                        </SelectItem>
                                                        {categories.filter(c => c.parent_id === category.id).map(child => (
                                                            <SelectItem key={child.id} value={child.name} className="pl-6">
                                                                - {child.name}
                                                            </SelectItem>
                                                        ))}
                                                    </div>
                                                ))}
                                                {categories.length === 0 && <span className="p-2 text-sm text-muted-foreground">No categories found.</span>}
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
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {/* Image Preview */}
                                                {field.value && (
                                                    <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={field.value}
                                                            alt="Preview"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-4">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        disabled={isUploadingImage}
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setIsUploadingImage(true);
                                                                try {
                                                                    const url = await uploadImage(file);
                                                                    field.onChange(url);
                                                                } catch (error) {
                                                                    console.error(error);
                                                                    toast({
                                                                        title: "Upload failed",
                                                                        description: "Failed to upload image. Please try again.",
                                                                        variant: "destructive"
                                                                    });
                                                                } finally {
                                                                    setIsUploadingImage(false);
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>

                                                <div className="flex gap-2">
                                                    <Input placeholder="https://example.com/image.jpg" {...field} disabled={isUploadingImage} />
                                                </div>
                                                <FormDescription>
                                                    Upload an image or paste a URL.
                                                </FormDescription>
                                            </div>
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

                <div className="lg:col-span-3 flex gap-4">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading || isUploadingImage}
                        onClick={() => form.setValue('status', 'published')}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {isEditMode ? 'Save & Publish' : 'Publish'}
                    </Button>
                    <Button
                        type="submit"
                        variant="outline"
                        size="lg"
                        disabled={isLoading || isUploadingImage}
                        onClick={() => form.setValue('status', 'draft')}
                    >
                        Save as Draft
                    </Button>
                </div>
            </form>
        </Form>
    );
}
