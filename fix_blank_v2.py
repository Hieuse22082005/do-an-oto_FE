with open('app/account/profile/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

replacement = """
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!session) {
        router.push('/');
        return;
      }

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (profileError && profileError.code !== 'PGRST116') {
         throw profileError;
      }

      if (profileData) {
        setProfile(profileData);
      } else {
        // Fallback if profile not found in table but user is logged in
        setProfile({ id: session.user.id, email: session.user.email || '', token_balance: 0 });
      }

      // Fetch transaction history
      const { data: txData, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_email', session.user.email) // Use email since older records used email!
        .order('created_at', { ascending: false });

      if (txError) throw txError;

      if (txData) {
        setHistory(txData);
      }

    } catch (e: any) {
      console.error("Lỗi đồng bộ hồ sơ:", e);
      setErrorMsg(e.message || JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  };
"""

import re
text = re.sub(r'useEffect\(\(\) => \{.*?setLoading\(false\);\n    \}\n  \};', replacement, text, flags=re.DOTALL)

text = text.replace('if (!profile) return <div className="min-h-screen flex items-center justify-center">Lỗi: Không tìm thấy hồ sơ cá nhân.</div>;', 'if (errorMsg) return <div className="min-h-screen flex items-center justify-center flex-col text-red-500"><p>Lỗi đồng bộ:</p><pre>{errorMsg}</pre></div>;\n  if (!profile) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;')

with open('app/account/profile/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
