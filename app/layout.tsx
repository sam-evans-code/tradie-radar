import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Compete - Competitive Intelligence Platform",
  description: "Competitive intelligence SaaS for B2B SaaS companies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div id="toast-root"></div>
      </body>
    </html>
  );
}
