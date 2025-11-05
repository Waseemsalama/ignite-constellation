"use client";
import { useState } from "react";

interface CityFormProps {
  onSubmit: (e: React.FormEvent) => void;
  city: string;
  setCity: (city: string) => void;
  name: string;
  setName: (name: string) => void;
}

export default function CityForm({ onSubmit, city, setCity, name, setName }: CityFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-400 mb-1">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="w-full px-4 py-2 bg-[#0f141b] rounded-lg text-white border border-gray-700 focus:border-primary focus:outline-none"
          placeholder="Enter your city"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Star Name (optional)</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 bg-[#0f141b] rounded-lg text-white border border-gray-700 focus:border-primary focus:outline-none"
          placeholder="Name your star"
        />
      </div>
      <button type="submit" className="btn w-full">
        Continue to Payment
      </button>
    </form>
  );
}

