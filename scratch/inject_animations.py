import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# 1. Add state for animated data
state_injection = """  // Animated Chart Data Trigger
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
"""

content = content.replace("  // Navigation State\n  const [activeTab, setActiveTab]", state_injection + "\n  // Navigation State\n  const [activeTab, setActiveTab]")


# 2. Replace data references in charts to use chartData
content = content.replace('data={monthlyData}', 'data={chartData.bar}')
content = content.replace('data={revenueSources}', 'data={chartData.rev}')
content = content.replace('data={topBrandsData}', 'data={chartData.brand}')

# 3. Add hover scaling and continuous floating to chart containers
# Find the chart containers. 
content = content.replace(
    'className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300"',
    'className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-1 hover:scale-[1.01] transition-all duration-500"'
)

content = content.replace(
    'className="lg:col-span-3 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300"',
    'className="lg:col-span-3 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-1 hover:scale-[1.01] transition-all duration-500"'
)

# Replace for Pie charts
content = content.replace(
    'className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300"',
    'className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500"'
)

# 4. Modify Bar chart animation
content = content.replace(
    '<Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} isAnimationActive={true} animationBegin={200} animationDuration={1500} animationEasing="ease-out" />',
    '<Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} isAnimationActive={true} animationBegin={100} animationDuration={2000} animationEasing="ease-out" />'
)

# 5. Make the pie charts look more dynamic by changing innerRadius on hover? Not easily possible here. 
# But the delay + data swap trick guarantees the draw animation plays visibly.

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Successfully injected dynamic animation states!")
