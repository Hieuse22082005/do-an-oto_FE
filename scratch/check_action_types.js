const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yjuikhyycvjxsuslpzds.supabase.co';
const supabaseKey = 'sb_publishable_YOUUEooUu0TvF2rkXQmifg_7Weo2wQA'; // Anon key
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data } = await supabase.from('user_activity_logs').select('action_type');
  console.log([...new Set(data.map(d => d.action_type))]);
}
check();
