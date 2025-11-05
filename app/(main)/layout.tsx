import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Script from "next/script";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {/* TikTok Share SDKs */}
      <Script src="https://www.tiktok.com/embed.js" strategy="afterInteractive" />
      <Script src="https://www.tiktok.com/share/embed/sharekit.js" strategy="afterInteractive" />
      {/* Mapbox GL CSS */}
      <link href="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css" rel="stylesheet" />
      <div className="bg-[#0A0E18] text-white min-h-screen">
        <Navbar />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}

