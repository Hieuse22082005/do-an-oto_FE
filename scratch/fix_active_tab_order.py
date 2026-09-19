import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

bad_snippet = """  // Animated Chart Data Trigger
  const [chartData, setChartData] = useState({ bar: [] as any[], rev: [] as any[], brand: [] as any[] });
  useEffect(() => {
    if (activeTab === 'overview') {
      setChartData({ bar: [], rev: [], brand: [] });
      const t = setTimeout(() => {
        setChartData({ bar: monthlyData, rev: revenueSources, brand: topBrandsData });
      }, 150);
      return () => clearTimeout(t);
    }
  }, [activeTab]);

  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'cms' | 'logs'>('overview');"""

good_snippet = """  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'cms' | 'logs'>('overview');

  // Animated Chart Data Trigger
  const [chartData, setChartData] = useState({ bar: [] as any[], rev: [] as any[], brand: [] as any[] });
  useEffect(() => {
    if (activeTab === 'overview') {
      setChartData({ bar: [], rev: [], brand: [] });
      const t = setTimeout(() => {
        setChartData({ bar: monthlyData, rev: revenueSources, brand: topBrandsData });
      }, 150);
      return () => clearTimeout(t);
    }
  }, [activeTab]);"""

content = content.replace(bad_snippet, good_snippet)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Fixed activeTab usage before declaration!")
