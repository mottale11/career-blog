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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createCategory, getCategories, deleteCategory, type Category } from '@/lib/categories';
import { Loader2, Trash2 } from 'lucide-react';

export default function TaxonomiesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to load categories.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      setIsSubmitting(true);
      await createCategory({
        name: newCategoryName,
        parent_id: selectedParentId === "none" ? null : selectedParentId,
      });

      toast({
        title: "Success",
        description: "Category created successfully.",
      });

      setNewCategoryName('');
      setSelectedParentId(null);
      setIsDialogOpen(false);
      fetchCategories();
    } catch (error: any) {
      // Safe error handling
      const errorMessage = error instanceof Error ? error.message : "Failed to create category";
      toast({
        title: "Error",
        description: errorMessage.includes('duplicate key')
          ? "A category with this name already exists."
          : "Failed to create category.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      toast({ title: "Deleted", description: "Category deleted." });
      fetchCategories();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete category.", variant: "destructive" });
    }
  }

  // Helper to render categories with indentation for hierarchy
  // Since fetching returns a flat list (for now), we can just filter for display
  // A true tree would require recursive processing.
  // For now, let's display simple list, maybe grouping by parent if possible, 
  // or just flat list with parent name indicator.

  // Let's build a simple hierarchical view
  const rootCategories = categories.filter(c => !c.parent_id);
  const getChildren = (parentId: string) => categories.filter(c => c.parent_id === parentId);

  const renderCategoryItem = (category: Category, depth = 0) => {
    const children = getChildren(category.id);
    return (
      <div key={category.id} className="flex flex-col gap-2">
        <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 group" style={{ marginLeft: `${depth * 20}px` }}>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{category.name}</Badge>
            {depth > 0 && <span className="text-xs text-muted-foreground">(Subcategory)</span>}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 text-destructive" onClick={() => handleDeleteCategory(category.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        {children.map(child => renderCategoryItem(child, depth + 1))}
      </div>
    );
  };

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
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add Category</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                      Create a new category. You can optionally nest it under a parent category.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateCategory} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="e.g. Engineering"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent">Parent Category (Optional)</Label>
                      <Select onValueChange={(val) => setSelectedParentId(val)} value={selectedParentId || "none"}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a parent category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None (Top Level)</SelectItem>
                          {categories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Category
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center p-4"><Loader2 className="animate-spin" /></div>
              ) : categories.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No categories found. Create one to get started.</p>
              ) : (
                <div className="flex flex-col gap-1">
                  {rootCategories.map(cat => renderCategoryItem(cat))}
                </div>
              )}
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
              <p className="text-muted-foreground">Tags functionality coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
