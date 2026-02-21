'use server';

import { createAdminClient } from './supabase-server';
import type { Opportunity, Category } from './types';

export async function getOpportunities(filters?: {
  category?: string;
  location?: string;
  industry?: string;
  field?: string;
  level?: string;
}): Promise<Opportunity[]> {
  try {
    const supabase = await createAdminClient();

    let query = supabase
      .from('opportunities')
      .select('*')
      .eq('status', 'published')
      .order('deadline', { ascending: false });

    if (filters?.category && filters.category !== 'all') {
      query = query.contains('category', [filters.category]);
    }
    if (filters?.location && filters.location !== 'all') {
      query = query.eq('location', filters.location);
    }
    if (filters?.industry && filters.industry !== 'all') {
      query = query.contains('industries', [filters.industry]);
    }
    if (filters?.field && filters.field !== 'all') {
      query = query.contains('fields', [filters.field]);
    }
    if (filters?.level && filters.level !== 'all') {
      query = query.eq('level', filters.level);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching opportunities:', error.message, '| code:', error.code, '| details:', error.details);
      return [];
    }

    console.log('✅ Successfully fetched opportunities from database:', data?.length || 0);
    return data as Opportunity[];
  } catch (error) {
    console.error('Failed to fetch opportunities:', error);
    return [];
  }
}

export async function getAllOpportunities() {
  try {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all opportunities:', error);
      return [];
    }

    return data as Opportunity[];
  } catch (error) {
    console.error('Failed to fetch all opportunities:', error);
    return [];
  }
}

export async function getOpportunityBySlug(slug: string) {
  try {
    const supabase = await createAdminClient();
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
  } catch (error) {
    console.error(`Failed to fetch opportunity with slug ${slug}:`, error);
    return undefined;
  }
}

export async function getOpportunityById(id: string) {
  const supabase = await createAdminClient();
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

// Export categories for use in category pages and sitemap
export async function getCategories(): Promise<Category[]> {
  return [
    'Jobs',
    'Scholarships',
    'Internships',
    'Fellowships',
    'Grants',
    'Career Advice',
    'Study Abroad'
  ];
}
