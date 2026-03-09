"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { AMRModel } from "./AMRModel";

export default function AMRScene() {
    return (
        <Canvas camera={{ position: [6, 4, 6], fov: 40 }} gl={{ alpha: true }} className="w-full h-full">
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Environment preset="city" />
            <AMRModel />
        </Canvas>
    );
}
