'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Opportunity } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

function OpportunitiesTable({ opportunities }: { opportunities: Opportunity[] }) {
    if (opportunities.length === 0) {
        return (
            <div className="text-center py-16 border-dashed border-2 rounded-lg bg-card mt-4">
                <h2 className="text-xl font-semibold">No Opportunities Found</h2>
                <p className="text-muted-foreground mt-2">
                    There are no opportunities in this category.
                </p>
            </div>
        )
    }

    return (
        <div className="border rounded-lg bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Deadline</TableHead>
                        <TableHead className="hidden md:table-cell">Flags</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {opportunities.map((opportunity) => (
                        <TableRow key={opportunity.id}>
                            <TableCell className="font-medium max-w-xs truncate">
                                <Link href={`/opportunity/${opportunity.slug}`} className="hover:underline" target="_blank" title={opportunity.title}>
                                    {opportunity.title}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">{opportunity.category}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={opportunity.status === 'published' ? 'default' : 'outline'}>
                                    {opportunity.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {formatDate(opportunity.deadline)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                    {opportunity.featured && <Badge>Featured</Badge>}
                                    {opportunity.trending && <Badge variant="outline">Hiring</Badge>}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/admin/opportunities/edit/${opportunity.id}`}>Edit</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/opportunity/${opportunity.slug}`} target="_blank">View</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-destructive focus:text-destructive-foreground focus:bg-destructive"
                                            onClick={() => alert('Delete functionality not implemented in prototype.')}
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export function StatusTabs({ opportunities }: { opportunities: Opportunity[] }) {
    const now = new Date();
    // Only published opportunities can be active or expired
    const publishedOpportunities = opportunities.filter(o => o.status === 'published');
    const activeOpportunities = publishedOpportunities.filter(o => new Date(o.deadline) >= now);
    const expiredOpportunities = publishedOpportunities.filter(o => new Date(o.deadline) < now);
    const draftOpportunities = opportunities.filter(o => o.status === 'draft');

    return (
        <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                <TabsTrigger value="active">Active ({activeOpportunities.length})</TabsTrigger>
                <TabsTrigger value="expired">Expired ({expiredOpportunities.length})</TabsTrigger>
                <TabsTrigger value="drafts">Drafts ({draftOpportunities.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
                <OpportunitiesTable opportunities={activeOpportunities} />
            </TabsContent>
            <TabsContent value="expired">
                <OpportunitiesTable opportunities={expiredOpportunities} />
            </TabsContent>
            <TabsContent value="drafts">
                <OpportunitiesTable opportunities={draftOpportunities} />
            </TabsContent>
        </Tabs>
    );
}
