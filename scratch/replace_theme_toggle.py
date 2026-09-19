import codecs

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\ThemeToggle.tsx'

jsx = """"use client";

import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-[130px] h-[60px] scale-[0.4] rounded-md bg-slate-200 dark:bg-slate-800" />;
  }

  const isLight = theme === "light";

  return (
    <div className="lamp-theme-toggle-wrapper">
      <input 
        name="switch" 
        id="switch" 
        type="checkbox" 
        checked={isLight} 
        onChange={(e) => setTheme(e.target.checked ? "light" : "dark")} 
      />
      <label className="switch" htmlFor="switch"></label>
      <div className="lamp">
        <div className="lamp-body"></div>
        <div className="lamp-bulb"></div>
      </div>
    </div>
  );
}
"""

codecs.open(filepath, 'w', 'utf-8').write(jsx)
print('Replaced ThemeToggle.tsx')
