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
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('industries')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching industries:', error);
        return [];
    }

    return data as Industry[];
}

export async function createIndustry(data: { name: string; parent_id?: string | null; description?: string }) {
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

    revalidatePath('/admin/taxonomies');
    return newIndustry;
}

export async function updateIndustry(id: string, data: { name: string; parent_id?: string | null; description?: string }) {
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

    revalidatePath('/admin/taxonomies');
}

export async function deleteIndustry(id: string) {
    const supabase = await createAdminClient();
    const { error } = await supabase
        .from('industries')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting industry:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/taxonomies');
}
