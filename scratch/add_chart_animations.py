import codecs
import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Animate Bar Chart
content = content.replace(
    '<Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />',
    '<Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} isAnimationActive={true} animationBegin={200} animationDuration={1500} animationEasing="ease-out" />'
)

# Animate Pie Charts
# Replace the <Pie tags (both of them)
content = content.replace(
    '''<Pie
                            data={revenueSources}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >''',
    '''<Pie
                            data={revenueSources}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            isAnimationActive={true}
                            animationBegin={400}
                            animationDuration={1500}
                            animationEasing="ease-out"
                          >'''
)

content = content.replace(
    '''<Pie
                            data={topBrandsData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >''',
    '''<Pie
                            data={topBrandsData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            isAnimationActive={true}
                            animationBegin={600}
                            animationDuration={1500}
                            animationEasing="ease-out"
                          >'''
)

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content)

print("Successfully added Recharts animations!")
