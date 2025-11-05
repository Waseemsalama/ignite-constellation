import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Link from "next/link";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="bg-[#0A0E18] text-white min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto p-6">
          <nav className="mb-6 flex gap-4 border-b border-gray-800">
            <Link href="/account" className="px-4 py-2 hover:text-primary">Dashboard</Link>
            <Link href="/account/settings" className="px-4 py-2 hover:text-primary">Settings</Link>
            <Link href="/account/password" className="px-4 py-2 hover:text-primary">Password</Link>
          </nav>
          {children}
        </div>
        <Footer />
      </div>
    </Providers>
  );
}

