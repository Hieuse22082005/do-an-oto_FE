import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";


const montserrat = Montserrat({ 
  subsets: ["latin", "vietnamese"], 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: "OTOCHECK Web3",
  description: "Hệ thống định giá xe cũ bằng AI bảo chứng Blockchain",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${montserrat.variable} font-sans`}>
      <body className="bg-white text-gray-800 m-0 p-0 overflow-x-hidden">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
        {children}
              </ThemeProvider>
      </body>
    </html>
  );
}