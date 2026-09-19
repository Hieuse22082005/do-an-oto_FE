import re

file_path = r"c:\Users\Hieu\Desktop\do an oto_FE\components\tabs\AdminTab.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove mockUsers
content = re.sub(r'const mockUsers = \[\s*\{.*?\}\s*\];', '', content, flags=re.DOTALL)

# Add realUsers state
state_search = "const [selectedJson, setSelectedJson] = useState<any>(null);"
state_replace = state_search + "\n  const [realUsers, setRealUsers] = useState<any[]>([]);"
content = content.replace(state_search, state_replace)

# Fetch users in fetchAdminData
fetch_logic = """
      // Fetch Real Users
      try {
        const res = await fetch('/api/admin/users');
        if (res.ok) {
          const usersData = await res.json();
          setRealUsers(usersData);
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
"""
# Insert inside fetchAdminData after setTopBrands
content = content.replace("setTopBrands(sortedBrands);", "setTopBrands(sortedBrands);\n" + fetch_logic)

# Replace mockUsers.map with realUsers.map in the JSX
content = content.replace("{mockUsers.map(u => (", "{realUsers.map(u => (")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("AdminTab.tsx updated to use real users from Supabase!")
