import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/site-chrome";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design Skill Arena",
  description: "展示不同模型使用前端设计 skills 生成页面效果的静态站点。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <TooltipProvider>
          <SiteChrome>{children}</SiteChrome>
        </TooltipProvider>
      </body>
    </html>
  );
}
