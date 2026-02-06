'use server';

import { createClient, createAdminClient } from '@/lib/supabase-server';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export interface Field {
    id: string;
    name: string;
    slug: string;
    parent_id: string | null;
    description?: string;
    children?: Field[];
}

export async function getFields() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('fields')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching fields:', error);
        return [];
    }

    return data as Field[];
}

export async function createField(data: { name: string; parent_id?: string | null; description?: string }) {
    const supabase = await createClient();
    const slug = slugify(data.name);

    const { data: newField, error } = await supabase
        .from('fields')
        .insert({
            name: data.name,
            slug: slug,
            parent_id: data.parent_id || null,
            description: data.description
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating field:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/taxonomies');
    return newField;
}

export async function updateField(id: string, data: { name: string; parent_id?: string | null; description?: string }) {
    const supabase = await createAdminClient();
    const slug = slugify(data.name);

    const { error } = await supabase
        .from('fields')
        .update({
            name: data.name,
            slug: slug,
            parent_id: data.parent_id || null,
            description: data.description
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating field:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/taxonomies');
}

export async function deleteField(id: string) {
    const supabase = await createAdminClient();
    const { error } = await supabase
        .from('fields')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting field:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/taxonomies');
}
