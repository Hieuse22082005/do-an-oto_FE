const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yjuikhyycvjxsuslpzds.supabase.co';
const supabaseKey = 'sb_publishable_YOUUEooUu0TvF2rkXQmifg_7Weo2wQA'; // Anon key
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  const tables = ['profiles', 'users', 'user_profiles', 'vip_users', 'transactions', 'payments', 'subscriptions', 'cms_articles', 'articles', 'rules'];
  
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (!error) {
      console.log(`[SUCCESS] Table exists: ${table}`);
      console.log(data);
    } else {
      console.log(`[FAILED] Table: ${table} - Error: ${error.message}`);
    }
  }
}

checkTables();
