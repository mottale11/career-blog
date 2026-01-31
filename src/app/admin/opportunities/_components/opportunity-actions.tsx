'use client';

import { Button } from "@/components/ui/button";
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
import { deleteOpportunity } from "../../actions";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";

export function OpportunityActions({ opportunity }: { opportunity: any }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    function handleDelete() {
        if (!confirm('Are you sure you want to delete this opportunity?')) return;

        startTransition(async () => {
            try {
                await deleteOpportunity(opportunity.id);
                toast({
                    title: "Opportunity deleted",
                    description: "The opportunity has been successfully removed.",
                });
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to delete opportunity.",
                    variant: "destructive"
                });
            }
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
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
                    className="text-destructive focus:text-destructive-foreground focus:bg-destructive cursor-pointer"
                    onClick={handleDelete}
                    disabled={isPending}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
