import { supabase } from './supabase';
import type {
  Opportunity,
  Category,
  Level
} from './types';

// Categories are kept hardcoded for now as they are static UI elements
export const categories: {
  name: Category,
  description: string
}[] = [{
  name: 'Jobs',
  description: 'Find your next career move with our curated list of job openings.'
},
{
  name: 'Scholarships',
  description: 'Discover funding opportunities for your undergraduate and postgraduate studies.'
},
{
  name: 'Internships',
  description: 'Gain valuable work experience with internships from top companies.'
},
{
  name: 'Fellowships',
  description: 'Advance your research or professional skills with prestigious fellowships.'
},
{
  name: 'Grants',
  description: 'Secure funding for your projects, research, and creative endeavors.'
},
{
  name: 'Career Advice',
  description: 'Get expert tips and guidance to navigate your career path successfully.'
},
{
  name: 'Study Abroad',
  description: 'Explore opportunities to study in different countries and broaden your horizons.'
},
  ];

export async function getOpportunities(category?: Category) {
  let query = supabase
    .from('opportunities')
    .select('*')
    .eq('status', 'published')
    .order('deadline', { ascending: false }); // Sort by newest deadline (furthest in future?) or just created_at? 
  // Original code sorted by deadline desc: new Date(b.deadline) - new Date(a.deadline)
  // That puts "later" deadlines first. Let's stick to that.

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }

  return data as Opportunity[];
}

export async function getAllOpportunities() {
  const { data, error } = await supabase
    .from('opportunities')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all opportunities:', error);
    return [];
  }

  return data as Opportunity[];
}

export async function getOpportunityBySlug(slug: string) {
  const { data, error } = await supabase
    .from('opportunities')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching opportunity with slug ${slug}:`, error);
    return undefined;
  }

  return data as Opportunity;
}

export async function getOpportunityById(id: string) {
  const { data, error } = await supabase
    .from('opportunities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching opportunity with id ${id}:`, error);
    return undefined;
  }

  return data as Opportunity;
}
