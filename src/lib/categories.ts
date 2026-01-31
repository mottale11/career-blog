'use server';

import { supabase } from '@/lib/supabase';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export interface Category {
    id: string;
    name: string;
    slug: string;
    parent_id: string | null;
    description?: string;
    children?: Category[];
}

export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data as Category[];
}

export async function createCategory(data: { name: string; parent_id?: string | null; description?: string }) {
    const slug = slugify(data.name);

    const { data: newCategory, error } = await supabase
        .from('categories')
        .insert({
            name: data.name,
            slug: slug,
            parent_id: data.parent_id || null,
            description: data.description
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating category:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/taxonomies');
    revalidatePath('/admin/opportunities/new');

    return newCategory;
}

export async function deleteCategory(id: string) {
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting category:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/taxonomies');
}
