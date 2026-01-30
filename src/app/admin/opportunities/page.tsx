import { getOpportunities } from "@/lib/data";
import { Button } from "@/components/ui/button";
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

export default async function AdminOpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-headline">Manage Opportunities</h2>
        <Button>Add New Opportunity</Button>
      </div>
      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
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
                <TableCell>{opportunity.organization}</TableCell>
                <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                        {opportunity.featured && <Badge>Featured</Badge>}
                        {opportunity.trending && <Badge variant="outline">Trending</Badge>}
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">
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
    </div>
  );
}
