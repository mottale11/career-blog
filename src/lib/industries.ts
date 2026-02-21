'use server';

import { createClient, createAdminClient } from '@/lib/supabase-server';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export interface Industry {
    id: string;
    name: string;
    slug: string;
    parent_id: string | null;
    description?: string;
    children?: Industry[];
}

export async function getIndustries() {
    try {
        const supabase = await createAdminClient();
        const { data, error } = await supabase
            .from('industries')
            .select('*')
            .order('name');

        if (error) {
            console.error('Error fetching industries:', error);
            return [] as Industry[];
        }

        return data as Industry[];
    } catch (error) {
        console.error('Failed to fetch industries:', error);
        return [] as Industry[];
    }
}

export async function createIndustry(data: { name: string; parent_id?: string | null; description?: string }) {
    console.log('createIndustry called with:', data);
    const supabase = await createClient(); // Or createAdminClient if restricted
    const slug = slugify(data.name);

    const { data: newIndustry, error } = await supabase
        .from('industries')
        .insert({
            name: data.name,
            slug: slug,
            parent_id: data.parent_id || null, // Ensure explicit null if undefined/empty
            description: data.description
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating industry:', error);
        throw new Error(error.message);
    }

    console.log('Industry created:', newIndustry);
    revalidatePath('/admin/taxonomies');
    return newIndustry;
}

export async function updateIndustry(id: string, data: { name: string; parent_id?: string | null; description?: string }) {
    console.log('updateIndustry called for id:', id, 'with data:', data);
    try {
        const supabase = await createAdminClient();
        const slug = slugify(data.name);

        const { error } = await supabase
            .from('industries')
            .update({
                name: data.name,
                slug: slug,
                parent_id: data.parent_id || null,
                description: data.description
            })
            .eq('id', id);

        if (error) {
            console.error('Error updating industry:', error);
            throw new Error(error.message);
        }

        console.log('Industry updated successfully for id:', id);
        revalidatePath('/admin/taxonomies');
    } catch (e) {
        console.error('Exception in updateIndustry:', e);
        throw e;
    }
}

export async function deleteIndustry(id: string) {
    console.log('deleteIndustry called for id:', id);
    try {
        const supabase = await createAdminClient();
        const { error } = await supabase
            .from('industries')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting industry:', error);
            throw new Error(error.message);
        }

        console.log('Industry deleted successfully:', id);
        revalidatePath('/admin/taxonomies');
    } catch (e) {
        console.error('Exception in deleteIndustry:', e);
        throw e;
    }
}
