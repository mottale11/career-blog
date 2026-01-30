import { getOpportunities } from "@/lib/data";
import { StatusTabs } from "./_components/status-tabs";

export default async function AdminStatusPage() {
    const opportunities = await getOpportunities();

    return (
        <div>
            <h2 className="text-3xl font-bold font-headline mb-6">Opportunity Status</h2>
            <StatusTabs opportunities={opportunities} />
        </div>
    );
}
