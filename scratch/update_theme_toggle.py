import codecs

css = """
/* Uiverse Theme Toggle */
.theme-switch {
  --transDur: 0.3s;
  --primary: hsl(210, 90%, 50%);
  --primaryT: hsla(210, 90%, 50%, 0.4);
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  transform: scale(0.6); /* Scale it down to fit in header better */
  transform-origin: center right;
}

.theme__icon {
  transition: 0.3s;
}

.theme__icon,
.theme__toggle {
  z-index: 1;
}

.theme__icon,
.theme__icon-part {
  position: absolute;
}

.theme__icon {
  display: block;
  top: 0.5em;
  left: 0.5em;
  width: 1.5em;
  height: 1.5em;
}

.theme__icon-part {
  border-radius: 50%;
  box-shadow: 0.4em -0.4em 0 0.5em hsl(0,0%,100%) inset;
  top: calc(50% - 0.5em);
  left: calc(50% - 0.5em);
  width: 1em;
  height: 1em;
  transition: box-shadow var(--transDur) ease-in-out,
		opacity var(--transDur) ease-in-out,
		transform var(--transDur) ease-in-out;
  transform: scale(0.5);
}

.theme__icon-part ~ .theme__icon-part {
  background-color: hsl(0,0%,100%);
  border-radius: 0.05em;
  top: 50%;
  left: calc(50% - 0.05em);
  transform: rotate(0deg) translateY(0.5em);
  transform-origin: 50% 0;
  width: 0.1em;
  height: 0.2em;
}

.theme__icon-part:nth-child(3) {
  transform: rotate(45deg) translateY(0.45em);
}

.theme__icon-part:nth-child(4) {
  transform: rotate(90deg) translateY(0.45em);
}

.theme__icon-part:nth-child(5) {
  transform: rotate(135deg) translateY(0.45em);
}

.theme__icon-part:nth-child(6) {
  transform: rotate(180deg) translateY(0.45em);
}

.theme__icon-part:nth-child(7) {
  transform: rotate(225deg) translateY(0.45em);
}

.theme__icon-part:nth-child(8) {
  transform: rotate(270deg) translateY(0.5em);
}

.theme__icon-part:nth-child(9) {
  transform: rotate(315deg) translateY(0.5em);
}

.theme__label,
.theme__toggle,
.theme__toggle-wrap {
  position: relative;
}

.theme__toggle,
.theme__toggle:before {
  display: block;
}

.theme__toggle {
  background-color: hsl(48,90%,85%);
  border-radius: 25% / 50%;
  box-shadow: 0 0 0 0.125em var(--primaryT);
  padding: 0.25em;
  width: 6em;
  height: 3em;
  -webkit-appearance: none;
  appearance: none;
  transition: background-color var(--transDur) ease-in-out,
		box-shadow 0.15s ease-in-out,
		transform var(--transDur) ease-in-out;
  cursor: pointer;
}

.theme__toggle:before {
  background-color: hsl(48,90%,55%);
  border-radius: 50%;
  content: "";
  width: 2.5em;
  height: 2.5em;
  transition: 0.3s;
}

.theme__toggle:focus {
  box-shadow: 0 0 0 0.125em var(--primary);
  outline: transparent;
}

/* Checked (Dark mode) */
.theme__toggle:checked {
  background-color: hsl(198,90%,15%);
}

.theme__toggle:checked:before,
.theme__toggle:checked ~ .theme__icon {
  transform: translateX(3em);
}

.theme__toggle:checked:before {
  background-color: hsl(198,90%,55%);
}

.theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(1) {
  box-shadow: 0.2em -0.2em 0 0.2em hsl(0,0%,100%) inset;
  transform: scale(1);
  top: 0.2em;
  left: -0.2em;
}

.theme__toggle:checked ~ .theme__icon .theme__icon-part ~ .theme__icon-part {
  opacity: 0;
}

.theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(2) {
  transform: rotate(45deg) translateY(0.8em);
}

.theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(3) {
  transform: rotate(90deg) translateY(0.8em);
}

.theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(4) {
  transform: rotate(135deg) translateY(0.8em);
}

.theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(5) {
  transform: rotate(180deg) translateY(0.8em);
}

.theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(6) {
  transform: rotate(225deg) translateY(0.8em);
}

.theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(7) {
  transform: rotate(270deg) translateY(0.8em);
}

.theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(8) {
  transform: rotate(315deg) translateY(0.8em);
}

.theme__toggle:checked ~ .theme__icon .theme__icon-part:nth-child(9) {
  transform: rotate(360deg) translateY(0.8em);
}

.theme__toggle-wrap {
  margin: 0;
}
"""

with codecs.open(r'c:\Users\Hieu\Desktop\do an oto_FE\app\globals.css', 'a', 'utf-8') as f:
    f.write(css)

react_code = """"use client";

import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-[6em] h-[3em] rounded-[25%/50%] bg-slate-200 dark:bg-slate-800 scale-75 transform-origin-right" />;
  }

  const isDark = theme === "dark";

  return (
    <label htmlFor="themeToggleBtn" className="theme-switch" title="Thay đổi giao diện">
      <span className="theme__toggle-wrap">
        <input 
          id="themeToggleBtn" 
          className="theme__toggle" 
          type="checkbox" 
          role="switch" 
          name="theme" 
          value="dark" 
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
        <span className="theme__icon">
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
          <span className="theme__icon-part"></span>
        </span>
      </span>
    </label>
  );
}
"""

with codecs.open(r'c:\Users\Hieu\Desktop\do an oto_FE\components\ThemeToggle.tsx', 'w', 'utf-8') as f:
    f.write(react_code)

print('Updated theme toggle')
