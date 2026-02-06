'use server';

import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Please provide both email and password.' as const };
    }

    const supabase = await createClient();
    console.log('Attempting login for:', email);

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('Login error:', error);
        return { error: error.message };
    }

    console.log('Login successful for:', email);

    return { success: true };
}
