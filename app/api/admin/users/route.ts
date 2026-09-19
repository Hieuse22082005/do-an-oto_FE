import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY; // Service Role Key

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) throw error;

    // Map to the format we need
    const users = data.users.map(u => ({
      id: u.id,
      email: u.email,
      // For now, if it's the admin email, we say VIP, else Standard
      tier: u.email === 'duongxuanhieu22082005@gmail.com' ? 'VIP' : 'Standard',
      status: 'Active',
      joined: new Date(u.created_at).toISOString().split('T')[0]
    }));

    return NextResponse.json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
