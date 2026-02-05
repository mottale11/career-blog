import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function createClient() {
    try {
        const cookieStore = await cookies()

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error('Missing Supabase Environment Variables:', { supabaseUrl, supabaseAnonKeyExists: !!supabaseAnonKey });
        }

        return createServerClient(
            supabaseUrl,
            supabaseAnonKey,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            )
                        } catch (error) {
                            console.error('Error setting cookies:', error);
                            // The `setAll` method was called from a Server Component.
                            // This can be ignored if you have middleware refreshing
                            // user sessions.
                        }
                    },
                },
            }
        )
    } catch (error) {
        console.error('Error in createClient:', error);
        throw error;
    }
}
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function createAdminClient() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
        console.error('createAdminClient: NEXT_PUBLIC_SUPABASE_URL is not defined');
    }
    if (!serviceRoleKey) {
        console.error('createAdminClient: SUPABASE_SERVICE_ROLE_KEY is not defined');
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined');
    }

    return createSupabaseClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
