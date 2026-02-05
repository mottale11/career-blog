'use server';

import { createClient, createAdminClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export interface TagWithCount {
    name: string;
    count: number;
}

export async function getTags(): Promise<TagWithCount[]> {
    const supabase = await createClient();
    const { data: opportunities, error } = await supabase
        .from('opportunities')
        .select('tags');

    if (error) {
        console.error('Error fetching tags:', error);
        return [];
    }

    const tagCounts: Record<string, number> = {};

    opportunities?.forEach(opp => {
        if (opp.tags && Array.isArray(opp.tags)) {
            opp.tags.forEach((tag: string) => {
                const normalizedTag = tag.trim();
                // Ensure we don't count empty strings
                if (normalizedTag) {
                    tagCounts[normalizedTag] = (tagCounts[normalizedTag] || 0) + 1;
                }
            });
        }
    });

    return Object.entries(tagCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export async function deleteTag(tagName: string) {
    const supabase = await createClient();

    // 1. Fetch opportunities that contain this tag
    // Supabase contains operator for array: tags @> {tagName} 
    // But we need to update them.

    // We can't do a simple "update set tags = tags - tagName" easily in one query without a PG function.
    // So we fetch, filter, and update.

    const { data: opportunities, error: fetchError } = await supabase
        .from('opportunities')
        .select('id, tags')
        .contains('tags', [tagName]);

    if (fetchError) {
        console.error('Error fetching opportunities for tag deletion:', fetchError);
        throw new Error('Failed to find opportunities with this tag');
    }

    if (!opportunities || opportunities.length === 0) return;

    // 2. Update each opportunity
    const updates = opportunities.map(async (opp) => {
        const newTags = opp.tags.filter((t: string) => t !== tagName);
        const { error: updateError } = await supabase
            .from('opportunities')
            .update({ tags: newTags })
            .eq('id', opp.id);

        if (updateError) {
            console.error(`Failed to remove tag ${tagName} from opportunity ${opp.id}`, updateError);
        }
    });

    await Promise.all(updates);

    revalidatePath('/admin/taxonomies');
    revalidatePath('/admin/opportunities');
}
