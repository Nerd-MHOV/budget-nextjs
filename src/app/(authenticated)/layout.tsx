import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers/Providers";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Navbar from "@/components/layout/navbar/Navbar";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authenticated Route",
  description: "Layout for routes authenticated",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex">
            <Sidebar />
            <div className="w-full relative">
              <Navbar />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
