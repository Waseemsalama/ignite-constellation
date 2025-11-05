"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function StarSky() {
  const [starData, setStarData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/stars")
      .then((res) => res.json())
      .then((data) => setStarData(data))
      .catch(() => {});
  }, []);

  return (
    <div className="h-[calc(100vh-96px)] w-full">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={["#02040A"]} />
        <ambientLight intensity={0.6} />
        <Stars radius={120} depth={50} count={3000} factor={4} fade />
        <OrbitControls enableZoom enablePan />
        {/* TODO: Render actual stars from starData with colors and brightness */}
      </Canvas>
    </div>
  );
}

