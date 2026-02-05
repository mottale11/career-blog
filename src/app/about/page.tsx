import { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Jobslot',
  description:
    'Learn more about Jobslot, our mission, and the team behind the platform.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
          About Jobslot
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Your trusted guide in the journey to discover and seize career-defining opportunities from across the globe.
        </p>
      </div>

      <div className="relative w-full h-80 rounded-lg overflow-hidden mb-12 shadow-lg">
        <Image
          src="https://picsum.photos/seed/about-us-hero/1200/400"
          alt="A diverse team collaborating in a modern office"
          fill
          className="object-cover"
          data-ai-hint="diverse team office"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 p-8 text-white">
          <h2 className="text-3xl font-bold font-headline">Connecting Talent with Opportunity</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 text-lg text-foreground/90">
        <p>
          Jobslot is a career-focused platform dedicated to sharing verified
          job openings, scholarships, internships, fellowships, grants, and
          career development opportunities from around the world. Our goal
          is to help students, graduates, and professionals discover
          opportunities that move their careers forward.
        </p>
        <p>
          In a world filled with endless information, finding the right opportunity can be overwhelming. We started Jobslot to cut through the noise and create a single, reliable source for verified, high-quality opportunities. We believe that everyone, regardless of their background or location, deserves access to chances that can shape their future.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-16 max-w-5xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To empower individuals by providing accessible, verified, and life-changing career and educational opportunities, fostering a global community of ambitious professionals.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be the world's most trusted platform for career development, where talent meets opportunity without barriers, enabling everyone to achieve their full potential.
            </p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Our Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are a passionate team of developers, career advisors, and content curators dedicated to making a difference. We work tirelessly to find and verify the best opportunities for you.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}