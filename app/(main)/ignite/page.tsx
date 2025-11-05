"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CityForm from "@/components/CityForm";

export default function IgnitePage() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Create Stripe checkout session
    // For now, redirect to success
    router.push(`/success?city=${encodeURIComponent(city)}&name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Ignite Your Star</h1>
      <p className="text-gray-300 mb-6">Choose your city and name your star to join the constellation.</p>
      <CityForm onSubmit={handleSubmit} city={city} setCity={setCity} name={name} setName={setName} />
    </div>
  );
}

