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
  | 'Undergraduate'
  | 'Graduate'
  | 'Postgraduate'
  | 'Professional'
  | 'All Levels';

export type OpportunityStatus = 'published' | 'draft';

export type Opportunity = {
  id: string;
  slug: string;
  title: string;
  category: Category;
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
  image: string;
  imageHint: string;
  tags: string[];
  status: OpportunityStatus;
  created_at?: string;
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
