import Providers from "@/components/Providers";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="bg-[#0A0E18] text-white min-h-screen flex items-center justify-center">
        {children}
      </div>
    </Providers>
  );
}

