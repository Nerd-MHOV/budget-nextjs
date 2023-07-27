import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers/Providers";
import SignInButton from "@/components/layout/SignInButton/SignInButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login Page",
  description: "For init Projects on Peraltas",
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
          <SignInButton />
          {children}
        </Providers>
      </body>
    </html>
  );
}
