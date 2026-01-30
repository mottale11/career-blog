'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { categories } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TaxonomiesPage() {
  // In a real app, you would also fetch tags. For this prototype, we'll just use categories.
  const allTags = [
    'Software Engineering', 'Internship', 'Google', 'USA', 'Tech',
    'Scholarship', 'Postgraduate', 'Oxford University', 'UK', 'Academia',
    'Data Science', 'Jobs', 'Meta', 'Professional', 'Fellowship', 'Graduate',
    'Research', 'International', 'Grant', 'Early Career', 'Conservation', 'Global',
    'team meeting', 'Soft Skills', 'Communication', 'Professional Development',
    'Study Abroad', 'Australia', 'Education', 'Student Guide', 'Marketing', 'HubSpot',
    'Ireland', 'Digital Marketing',
  ];
  const uniqueTags = [...new Set(allTags)];

  return (
    <div>
      <h2 className="text-3xl font-bold font-headline mb-6">
        Manage Categories & Tags
      </h2>

      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                  Manage the opportunity categories for your site.
                </CardDescription>
              </div>
              <Button onClick={() => alert('Add category functionality not implemented in prototype.')}>Add Category</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                 {categories.map(category => (
                    <Badge key={category.name} variant="secondary" className="text-base py-1 px-3">
                        {category.name}
                    </Badge>
                 ))}
              </div>
               <p className="text-sm text-muted-foreground pt-4">
                Category management (add, edit, delete) is not implemented in this prototype.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tags">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Manage the tags used across your opportunities.
                </CardDescription>
              </div>
              <Button onClick={() => alert('Add tag functionality not implemented in prototype.')}>Add Tag</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {uniqueTags.map(tag => (
                    <Badge key={tag} variant="outline">
                        {tag}
                    </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground pt-4">
                Tag management (add, edit, delete) is not implemented in this prototype.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
