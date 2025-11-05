"use client";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function MapboxCountry() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !mapboxgl.accessToken) return;

    const map = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-98, 39],
      zoom: 3,
    });

    // TODO: add city glow circles from /api/citystats
    map.on("load", async () => {
      try {
        const res = await fetch("/api/citystats");
        const cities = await res.json();
        // Add city markers/circles based on brightness/points
      } catch (error) {
        console.error("Error loading city stats:", error);
      }
    });

    return () => map.remove();
  }, []);

  return <div ref={ref} className="h-[500px] w-full rounded-xl overflow-hidden" />;
}

