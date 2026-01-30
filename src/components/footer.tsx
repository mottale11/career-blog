import { Linkedin, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';
import { LogoIcon } from './logo-icon';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <LogoIcon className="h-8 w-8" />
              <span className="font-bold text-xl font-headline">Jobsyde</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Jobsyde is a career-focused platform dedicated to sharing verified
              job openings, scholarships, internships, fellowships, grants, and
              career development opportunities from around the world. Our goal
              is to help students, graduates, and professionals discover
              opportunities that move their careers forward.
            </p>
          </div>
          <div>
            <h3 className="font-semibold font-headline tracking-wider uppercase text-sm">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link href="/opportunities/Jobs" className="text-muted-foreground hover:text-primary">Jobs</Link></li>
              <li><Link href="/opportunities/Scholarships" className="text-muted-foreground hover:text-primary">Scholarships</Link></li>
              <li><Link href="/opportunities/Internships" className="text-muted-foreground hover:text-primary">Internships</Link></li>
              <li><Link href="/opportunities/Fellowships" className="text-muted-foreground hover:text-primary">Fellowships & Grants</Link></li>
              <li><Link href="/opportunities/Study-Abroad" className="text-muted-foreground hover:text-primary">Study Abroad</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline tracking-wider uppercase text-sm">
              Opportunities
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/opportunities?category=Jobs&q=Entry+Level" className="text-muted-foreground hover:text-primary">Entry Level Jobs</Link></li>
                <li><Link href="/opportunities?category=Jobs&q=Remote" className="text-muted-foreground hover:text-primary">Remote Jobs</Link></li>
                <li><Link href="/opportunities?category=Jobs&q=Government" className="text-muted-foreground hover:text-primary">Government Jobs</Link></li>
                <li><Link href="/opportunities?category=Scholarships&q=Fully+Funded" className="text-muted-foreground hover:text-primary">Fully Funded Scholarships</Link></li>
                <li><Link href="/opportunities?category=Internships&q=International" className="text-muted-foreground hover:text-primary">International Internships</Link></li>
                <li><Link href="/opportunities?category=Fellowships&q=Research" className="text-muted-foreground hover:text-primary">Research Fellowships</Link></li>
            </ul>
             <h3 className="font-semibold font-headline tracking-wider uppercase text-sm mt-6">
              Resources
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/opportunities/Study-Abroad" className="text-muted-foreground hover:text-primary">Study Abroad Guides</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jobsyde. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
