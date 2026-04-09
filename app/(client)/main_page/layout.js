import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/layouts/loggedNavBar";
import Footer from "@/components/layouts/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function MainLayout({ children }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
    >
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
