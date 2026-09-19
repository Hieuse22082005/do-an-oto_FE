import codecs
import re

filepath = r'c:\Users\Hieu\Desktop\do an oto_FE\components\ui\glowy-waves-hero-shadcnui.tsx'
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

# Add useTheme import
content = content.replace('import { useEffect, useRef } from "react";', 'import { useEffect, useRef } from "react";\nimport { useTheme } from "next-themes";')

# Add resolvedTheme usage
content = content.replace('export function GlowyWavesHero({ onTryNow }: { onTryNow?: () => void }) {\n  const canvasRef = useRef<HTMLCanvasElement | null>(null);', 'export function GlowyWavesHero({ onTryNow }: { onTryNow?: () => void }) {\n  const { resolvedTheme } = useTheme();\n  const canvasRef = useRef<HTMLCanvasElement | null>(null);')

# Modify computeThemeColors
old_compute = """    const computeThemeColors = () => {
      return {
        backgroundTop: "#09090b", // black-ish
        backgroundBottom: "#111", 
        wavePalette: ["""

new_compute = """    const computeThemeColors = () => {
      const isLight = resolvedTheme === "light";
      return {
        backgroundTop: isLight ? "#ffffff" : "#09090b",
        backgroundBottom: isLight ? "#f8f9fa" : "#111", 
        wavePalette: ["""

content = content.replace(old_compute, new_compute)

# Modify the white wave color to handle light mode
old_wave = """          {
            offset: Math.PI * 2,
            amplitude: 55,
            frequency: 0.004,
            color: "rgba(255, 255, 255, 0.2)",
            opacity: 0.2,
          },"""

new_wave = """          {
            offset: Math.PI * 2,
            amplitude: 55,
            frequency: 0.004,
            color: isLight ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.2)",
            opacity: 0.2,
          },"""
content = content.replace(old_wave, new_wave)

# Add dependencies to useEffect
content = content.replace('  }, []);', '  }, [resolvedTheme]);')

# Fix paragraph text color
content = content.replace('text-gray-300 md:text-xl', 'text-gray-700 dark:text-gray-300 md:text-xl')

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)
print('Done!')
