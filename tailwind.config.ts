import type { Config } from "tailwindcss";

const config: Config = {
  // Đã nâng cấp: Nhận diện chế độ tối cho CẢ Mặt trăng (dark) và Quả cầu pha lê (mystic)
  darkMode: ['class', '[data-theme="dark"], [data-theme="mystic"]'],

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;