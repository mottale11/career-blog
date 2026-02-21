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
    try {
        const supabase = await createAdminClient();
        const { data, error } = await supabase
            .from('fields')
            .select('*')
            .order('name');

        if (error) {
            console.error('Error fetching fields:', error);
            return [] as Field[];
        }

        return data as Field[];
    } catch (error) {
        console.error('Failed to fetch fields:', error);
        return [] as Field[];
    }
}

export async function createField(data: { name: string; parent_id?: string | null; description?: string }) {
    console.log('createField called with:', data);
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

    console.log('Field created:', newField);
    revalidatePath('/admin/taxonomies');
    return newField;
}

export async function updateField(id: string, data: { name: string; parent_id?: string | null; description?: string }) {
    console.log('updateField called for id:', id, 'with data:', data);
    try {
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

        console.log('Field updated successfully for id:', id);
        revalidatePath('/admin/taxonomies');
    } catch (e) {
        console.error('Exception in updateField:', e);
        throw e;
    }
}

export async function deleteField(id: string) {
    console.log('deleteField called for id:', id);
    try {
        const supabase = await createAdminClient();
        const { error } = await supabase
            .from('fields')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting field:', error);
            throw new Error(error.message);
        }

        console.log('Field deleted successfully:', id);
        revalidatePath('/admin/taxonomies');
    } catch (e) {
        console.error('Exception in deleteField:', e);
        throw e;
    }
}
