'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { slugify } from '@/lib/utils'; // Assuming this executes safely on server
import { Opportunity } from '@/lib/types';

// We can define the input type based on the form values or the Opportunity type
// For simplicity, we'll accept a Partial<Opportunity> but require key fields for creation
// In a real app we'd validate with Zod here too.

export async function createOpportunity(data: any) {
    // Basic validation / transformation
    // Arrays might come in as strings if we used FormData, but if we pass JSON from client component we get arrays.

    // Ensure slug is unique? Supabase constraint will fail if not.

    // Transform arrays if they are strings (handled in form, but good to be safe?)
    // The form passes arrays for eligibility/benefits/tags as joined strings?
    // Looking at the form code:
    // eligibility: opportunity?.eligibility.join('\n') ?? '',
    // And on submit, it logs 'data'. The schema says:
    // eligibility: z.string()
    // ...
    // So the form output is a string with newlines.
    // The database expects `text[]`.
    // So we MUST transform these strings back to arrays.

    const eligibilityArray = data.eligibility.split('\n').filter((line: string) => line.trim() !== '');
    const benefitsArray = data.benefits.split('\n').filter((line: string) => line.trim() !== '');
    const tagsArray = data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '');

    // Resolve category_id
    let categoryId = null;
    if (data.category) {
        const { data: catData } = await supabase.from('categories').select('id').eq('name', data.category).single();
        if (catData) categoryId = catData.id;
    }

    const { error } = await supabase.from('opportunities').insert({
        title: data.title,
        slug: data.slug || slugify(data.title),
        category: data.category,
        category_id: categoryId,
        organization: data.organization,
        location: data.location,
        country: data.country,
        level: data.level,
        summary: data.summary,
        description: data.description,
        eligibility: eligibilityArray,
        benefits: benefitsArray,
        "applicationProcess": data.applicationProcess,
        deadline: data.deadline,
        "applicationLink": data.applicationLink,
        featured: data.featured,
        trending: data.trending,
        image: data.image,
        "imageHint": data.imageHint,
        tags: tagsArray,
        status: data.status,
        "metaTitle": data.metaTitle,
        "metaDescription": data.metaDescription,
    });

    if (error) {
        console.error('Error creating opportunity:', error);
        throw new Error('Failed to create opportunity');
    }

    revalidatePath('/admin/opportunities');
    revalidatePath('/'); // Homepage might change
    redirect('/admin/opportunities');
}

export async function updateOpportunity(id: string, data: any) {
    const eligibilityArray = typeof data.eligibility === 'string'
        ? data.eligibility.split('\n').filter((line: string) => line.trim() !== '')
        : data.eligibility;

    const benefitsArray = typeof data.benefits === 'string'
        ? data.benefits.split('\n').filter((line: string) => line.trim() !== '')
        : data.benefits;

    const tagsArray = typeof data.tags === 'string'
        ? data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '')
        : data.tags;

    // Resolve category_id
    let categoryId = null;
    if (data.category) {
        const { data: catData } = await supabase.from('categories').select('id').eq('name', data.category).single();
        if (catData) categoryId = catData.id;
    }

    const { error } = await supabase.from('opportunities').update({
        title: data.title,
        slug: data.slug,
        category: data.category,
        category_id: categoryId,
        organization: data.organization,
        location: data.location,
        country: data.country,
        level: data.level,
        summary: data.summary,
        description: data.description,
        eligibility: eligibilityArray,
        benefits: benefitsArray,
        "applicationProcess": data.applicationProcess,
        deadline: data.deadline,
        "applicationLink": data.applicationLink,
        featured: data.featured,
        trending: data.trending,
        image: data.image,
        "imageHint": data.imageHint,
        tags: tagsArray,
        status: data.status,
        "metaTitle": data.metaTitle,
        "metaDescription": data.metaDescription,
    }).eq('id', id);

    if (error) {
        console.error('Error updating opportunity:', error);
        throw new Error('Failed to update opportunity');
    }

    revalidatePath('/admin/opportunities');
    revalidatePath(`/opportunity/${data.slug}`);
    revalidatePath('/');
    redirect('/admin/opportunities');
}

export async function deleteOpportunity(id: string) {
    // 1. Fetch the opportunity to get the image URL
    const { data: opportunity, error: fetchError } = await supabase
        .from('opportunities')
        .select('image')
        .eq('id', id)
        .single();

    if (fetchError) {
        console.error('Error fetching opportunity for deletion:', fetchError);
        // We might validly fail if it doesn't exist, but let's try to proceed to delete calling row just in case
    }

    // 2. If there's an image, try to delete it from storage
    if (opportunity?.image) {
        try {
            // Assumes standard Supabase Storage Public URL format
            // https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
            // We need [path]
            const imageUrl = opportunity.image;
            // Simple check if it matches our storage URL pattern
            if (imageUrl.includes('/storage/v1/object/public/images/')) {
                const path = imageUrl.split('/storage/v1/object/public/images/')[1];
                if (path) {
                    const { error: storageError } = await supabase.storage
                        .from('images')
                        .remove([decodeURIComponent(path)]);

                    if (storageError) {
                        console.error('Error deleting image from storage:', storageError);
                    }
                }
            }
        } catch (e) {
            console.error("Error processing image deletion:", e);
        }
    }

    // 3. Delete the record
    const { error } = await supabase.from('opportunities').delete().eq('id', id);

    if (error) {
        console.error('Error deleting opportunity:', error);
        throw new Error('Failed to delete opportunity');
    }

    revalidatePath('/admin/opportunities');
    // We do NOT redirect here because this is likely called from the list page
}
