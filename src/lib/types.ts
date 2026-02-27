import type { LucideIcon } from "lucide-react";

export type Category =
  | 'Jobs'
  | 'Scholarships'
  | 'Internships'
  | 'Fellowships'
  | 'Grants'
  | 'Career Advice'
  | 'Study Abroad';

export type Level =
  | 'Entry Level'
  | 'Mid-Level'
  | 'Senior Level'
  | 'Undergraduate'
  | 'Graduate'
  | 'Postgraduate'
  | 'Professional'
  | 'Internship'
  | 'All Levels';

export type OpportunityStatus = 'published' | 'draft';

export type Opportunity = {
  id: string;
  slug: string;
  title: string;
  category: Category[];
  organization: string;
  location: string;
  country: string;
  level: Level;
  summary: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string;
  deadline: string;
  applicationLink: string;
  featured: boolean;
  trending: boolean;
  image?: string;
  imageHint?: string;
  tags: string[];
  industries: string[];
  fields: string[];
  status: OpportunityStatus;
  created_at?: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryPeriod?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | null;
  employmentType?: string[] | null;
  metaTitle?: string;
  metaDescription?: string;
};

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  children?: {
    name: string;
    href: string;
  }[];
};
