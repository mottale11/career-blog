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
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { OpportunityActions } from "./_components/opportunity-actions";

export default async function AdminOpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-headline">Manage Opportunities</h2>
        <Button asChild>
          <Link href="/admin/opportunities/new">Add New Opportunity</Link>
        </Button>
      </div>
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
                  <OpportunityActions opportunity={opportunity} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
