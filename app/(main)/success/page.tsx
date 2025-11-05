"use client";
import { useSearchParams } from "next/navigation";
import CapsuleForm from "@/components/CapsuleForm";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "";
  const name = searchParams.get("name") || "";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">✨ Star Created!</h1>
      <p className="text-gray-300 mb-6">Add a message to your time capsule.</p>
      <CapsuleForm city={city} starName={name} />
    </div>
  );
}

