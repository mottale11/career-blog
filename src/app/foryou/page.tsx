import { getOpportunities } from "@/lib/data";
import { PersonalizedRecommendations } from "@/components/personalized-recommendations";

export const metadata = {
  title: "Personalized Recommendations | Jobsyde",
  description: "Get personalized opportunity recommendations based on your profile.",
};

export default async function ForYouPage() {
  const opportunities = await getOpportunities();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Opportunities For You
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Tell us about yourself, and our AI will find the most relevant opportunities for you.
        </p>
      </div>
      <PersonalizedRecommendations opportunities={opportunities} />
    </div>
  );
}
