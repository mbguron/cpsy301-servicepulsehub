import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/layouts/NavBar";
import Footer from "@/components/layouts/Footer";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ServicePulse Hub",
  description: "Digital Device Repair Service",
};

export default function MainLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
