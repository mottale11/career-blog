'use client';

import { useState, useEffect } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { createCategory, getCategories, deleteCategory, updateCategory } from '@/lib/categories';
import { createIndustry, getIndustries, deleteIndustry, updateIndustry } from '@/lib/industries';
import { createField, getFields, deleteField, updateField } from '@/lib/fields';
import { getTags, deleteTag } from '@/lib/tags';
import { Trash2 } from 'lucide-react';
import { TaxonomyManager } from './_components/taxonomy-manager';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { Suspense } from 'react';

function TaxonomiesContent() {
  const [tags, setTags] = useState<{ name: string, count: number }[]>([]);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = searchParams.get('tab') || 'categories';

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const fetchTags = async () => {
    try {
      const data = await getTags();
      setTags(data);
    } catch (error) {
      console.error("Failed to fetch tags", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleDeleteTag = async (tagName: string) => {
    if (!confirm(`Are you sure you want to delete the tag "${tagName}"? This will remove it from all opportunities.`)) return;
    try {
      await deleteTag(tagName);
      toast({ title: "Deleted", description: "Tag removed from opportunities." });
      fetchTags();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete tag.", variant: "destructive" });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold font-headline mb-6">
        Manage Taxonomies
      </h2>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="industries">Industries</TabsTrigger>
          <TabsTrigger value="fields">Fields</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <TaxonomyManager
            title="Categories"
            description="Manage the opportunity categories for your site."
            itemName="Category"
            fetchData={getCategories}
            createItem={createCategory}
            updateItem={updateCategory}
            deleteItem={deleteCategory}
          />
        </TabsContent>

        <TabsContent value="industries">
          <TaxonomyManager
            title="Industries"
            description="Manage industries (e.g. Technology, Finance, Healthcare)."
            itemName="Industry"
            fetchData={getIndustries}
            createItem={createIndustry}
            updateItem={updateIndustry}
            deleteItem={deleteIndustry}
          />
        </TabsContent>

        <TabsContent value="fields">
          <TaxonomyManager
            title="Fields"
            description="Manage fields of study or specialization (e.g. Computer Science, Economics)."
            itemName="Field"
            fetchData={getFields}
            createItem={createField}
            updateItem={updateField}
            deleteItem={deleteField}
          />
        </TabsContent>

        <TabsContent value="tags">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Tags are automatically generated from your opportunities. Deleting a tag removes it from all posts.
                </CardDescription>
              </div>
              <Button disabled variant="secondary" title="Tags are created by adding them to opportunities.">
                Auto-Generated
              </Button>
            </CardHeader>
            <CardContent>
              {tags.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No tags found used in opportunities.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge key={tag.name} variant="secondary" className="px-3 py-1 flex items-center gap-2 text-sm">
                      {tag.name} <span className="text-xs opacity-50">({tag.count})</span>
                      <button onClick={() => handleDeleteTag(tag.name)} className="ml-1 hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function TaxonomiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaxonomiesContent />
    </Suspense>
  );
}
