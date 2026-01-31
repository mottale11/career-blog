import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testConnection() {
    console.log('Testing Supabase connection...');
    try {
        const { supabase } = await import('../src/lib/supabase');
        const { data, error } = await supabase.from('opportunities').select('*').limit(1);
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            console.log('Successfully fetched data. Row count:', data.length);
            console.log('Data:', data);
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

testConnection();
