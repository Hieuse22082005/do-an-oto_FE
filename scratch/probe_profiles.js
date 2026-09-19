const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yjuikhyycvjxsuslpzds.supabase.co';
const supabaseKey = 'sb_publishable_YOUUEooUu0TvF2rkXQmifg_7Weo2wQA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProfiles() {
  // Let's insert a fake one or just select to see columns if there's any. Wait, the table is empty.
  // We can query pg_meta using postgres, but we don't have postgres access here.
  // Instead, let's fetch all data from profiles.
  const { data, error } = await supabase.from('profiles').select('*').limit(10);
  console.log(data);
  console.log(error);
}

checkProfiles();
