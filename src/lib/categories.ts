'use server';

import { createClient, createAdminClient } from '@/lib/supabase-server';
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
    const supabase = await createClient();
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
    console.log('createCategory called with:', data);
    try {
        const supabase = await createClient();
        console.log('Supabase client created successfully in createCategory');
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
            console.error('Error creating category in Supabase:', error);
            throw new Error(error.message);
        }

        console.log('Category created successfully:', newCategory);

        revalidatePath('/admin/taxonomies');
        revalidatePath('/admin/opportunities/new');

        return newCategory;
    } catch (error) {
        console.error('Exception in createCategory:', error);
        throw error;
    }
}

export async function updateCategory(id: string, data: { name: string; parent_id?: string | null; description?: string }) {
    const supabase = await createAdminClient();
    const slug = slugify(data.name);

    const { error } = await supabase
        .from('categories')
        .update({
            name: data.name,
            slug: slug,
            parent_id: data.parent_id || null,
            description: data.description
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating category:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/taxonomies');
    revalidatePath('/admin/opportunities/new');
}

export async function deleteCategory(id: string) {
    const supabase = await createAdminClient();
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
