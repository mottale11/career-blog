'use client';

import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { Loader2, Trash2, Pencil } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Generic interface for taxonomy items
export interface TaxonomyItem {
    id: string;
    name: string;
    slug: string;
    parent_id: string | null;
    description?: string;
    children?: any[];
}

interface TaxonomyManagerProps {
    title: string;
    description: string;
    itemName: string;
    fetchData: () => Promise<any[]>;
    createItem: (data: { name: string; parent_id?: string | null }) => Promise<any>;
    updateItem: (id: string, data: { name: string; parent_id?: string | null }) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
}

export function TaxonomyManager({
    title,
    description,
    itemName,
    fetchData,
    createItem,
    updateItem,
    deleteItem
}: TaxonomyManagerProps) {
    const [items, setItems] = useState<TaxonomyItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TaxonomyItem | null>(null);
    const [itemNameInput, setItemNameInput] = useState('');
    const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const loadData = async () => {
        try {
            setIsLoading(true);
            const data = await fetchData();
            setItems(data);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: `Failed to load ${title.toLowerCase()}.`,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const openCreateDialog = () => {
        setEditingItem(null);
        setItemNameInput('');
        setSelectedParentId(null);
        setIsDialogOpen(true);
    };

    const openEditDialog = (item: TaxonomyItem) => {
        setEditingItem(item);
        setItemNameInput(item.name);
        setSelectedParentId(item.parent_id);
        setIsDialogOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!itemNameInput.trim()) return;

        try {
            setIsSubmitting(true);
            if (editingItem) {
                await updateItem(editingItem.id, {
                    name: itemNameInput,
                    parent_id: selectedParentId === "none" ? null : selectedParentId,
                });
                toast({ title: "Updated", description: `${itemName} updated successfully.` });
            } else {
                await createItem({
                    name: itemNameInput,
                    parent_id: selectedParentId === "none" ? null : selectedParentId,
                });
                toast({ title: "Created", description: `${itemName} created successfully.` });
            }

            setItemNameInput('');
            setSelectedParentId(null);
            setEditingItem(null);
            setIsDialogOpen(false);
            loadData();
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : `Failed to save ${itemName.toLowerCase()}`;
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(`Are you sure you want to delete this ${itemName.toLowerCase()}?`)) return;
        try {
            await deleteItem(id);
            toast({ title: "Deleted", description: `${itemName} deleted.` });
            loadData();
        } catch (error) {
            toast({ title: "Error", description: `Failed to delete ${itemName.toLowerCase()}.`, variant: "destructive" });
        }
    }

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                <Button onClick={openCreateDialog}>Add {itemName}</Button>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Parent</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                                    </TableCell>
                                </TableRow>
                            ) : items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No {title.toLowerCase()} found. Create one to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (() => {
                                // Build grouped rows: parents first, children directly below their parent
                                const parents = items
                                    .filter(i => !i.parent_id)
                                    .sort((a, b) => a.name.localeCompare(b.name));
                                const orphans = items
                                    .filter(i => i.parent_id && !items.find(p => p.id === i.parent_id))
                                    .sort((a, b) => a.name.localeCompare(b.name));

                                const rows: React.ReactNode[] = [];

                                // Render a row for a single item
                                const renderRow = (item: TaxonomyItem, isChild: boolean) => (
                                    <TableRow key={item.id} className={isChild ? 'bg-muted/20' : ''}>
                                        <TableCell className="font-medium">
                                            {isChild ? (
                                                <span className="inline-flex items-center gap-1 pl-6">
                                                    <span className="text-muted-foreground">↳</span>
                                                    <span className="text-sm">{item.name}</span>
                                                </span>
                                            ) : (
                                                <span className="font-semibold">{item.name}</span>
                                            )}
                                        </TableCell>
                                        <TableCell className={isChild ? 'text-sm text-muted-foreground' : ''}>
                                            {item.slug}
                                        </TableCell>
                                        <TableCell>
                                            {isChild
                                                ? items.find(p => p.id === item.parent_id)?.name
                                                : <Badge variant="secondary">Top Level</Badge>
                                            }
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );

                                // Render each parent then its children
                                parents.forEach(parent => {
                                    rows.push(renderRow(parent, false));
                                    const children = items
                                        .filter(i => i.parent_id === parent.id)
                                        .sort((a, b) => a.name.localeCompare(b.name));
                                    children.forEach(child => rows.push(renderRow(child, true)));
                                });

                                // Render orphaned children at the end (parent was deleted)
                                orphans.forEach(orphan => rows.push(renderRow(orphan, false)));

                                return rows;
                            })()}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingItem ? `Edit ${itemName}` : `Add New ${itemName}`}</DialogTitle>
                        <DialogDescription>
                            {editingItem ? `Make changes to the ${itemName.toLowerCase()} details.` : `Create a new ${itemName.toLowerCase()}. You can optionally nest it under a parent.`}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={itemNameInput}
                                onChange={(e) => setItemNameInput(e.target.value)}
                                placeholder={`e.g. ${itemName === 'Category' ? 'Engineering' : itemName === 'Industry' ? 'Technology' : 'Computer Science'}`}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="parent">Parent {itemName} (Optional)</Label>
                            <Select onValueChange={(val) => setSelectedParentId(val)} value={selectedParentId || "none"}>
                                <SelectTrigger>
                                    <SelectValue placeholder={`Select a parent ${itemName.toLowerCase()}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None (Top Level)</SelectItem>
                                    {items.filter(i => i.id !== editingItem?.id).map(item => (
                                        <SelectItem key={item.id} value={item.id}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingItem ? 'Save Changes' : `Create ${itemName}`}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
