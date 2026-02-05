import { createAdminClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createAdminClient();
        const email = 'mottale619@gmail.com';
        const password = '$Moses26';

        console.log('Setup-auth: Checking for user', email);

        // Check if user exists
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

        if (listError) {
            console.error('Error listing users:', listError);
            return NextResponse.json({ error: listError.message }, { status: 500 });
        }

        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            console.log('User exists. Deleting to ensure clean state...');
            const { error: deleteError } = await supabase.auth.admin.deleteUser(existingUser.id);
            if (deleteError) {
                console.error('Error deleting user:', deleteError);
                return NextResponse.json({ error: 'Failed to delete existing user: ' + deleteError.message }, { status: 500 });
            }
            console.log('User deleted successfully.');
        }

        // Create user
        console.log('Creating user...');
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { role: 'admin' }
        });

        if (createError) {
            console.error('Error creating user:', createError);
            return NextResponse.json({ error: createError.message }, { status: 500 });
        }

        console.log('User created successfully:', newUser.user.id);
        return NextResponse.json({ message: 'User created successfully (Clean Re-creation)', userId: newUser.user.id });

    } catch (error: any) {
        console.error('Setup Auth Error:', error);
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}
