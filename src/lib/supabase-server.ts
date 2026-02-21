'use server';

import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Creates a Supabase client for Server Components that respects RLS policies.
 * Uses cookie-based auth for session handling.
 */
export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                } catch {
                    // Ignore: called from a Server Component where cookies cannot be set.
                }
            },
        },
    });
}

/**
 * Creates an admin Supabase client that bypasses RLS using the service role key.
 * Use ONLY on the server side, never expose this key to the client.
 */
export async function createAdminClient() {
    if (!supabaseUrl) {
        throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
    }
    if (!serviceRoleKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
    }

    return createSupabaseClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}
