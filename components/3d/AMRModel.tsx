"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export function AMRModel({ progress = 0 }: { progress?: number }) {
    const group = useRef<THREE.Group>(null);
    const lidarRef = useRef<THREE.Mesh>(null);
    const wheelsRef = useRef<THREE.Group[]>([]);

    // Clear array on every render so we don't accumulate refs
    wheelsRef.current = [];

    useFrame((state, delta) => {
        if (group.current) {
            // Bobbing motion to simulate suspension
            group.current.position.y = Math.sin(state.clock.elapsedTime * 6) * 0.02;
        }

        // Lidar spinning fast
        if (lidarRef.current) {
            lidarRef.current.rotation.y += delta * 15;
        }

        // Rotate wheels (progress dictates speed or just continuous drive)
        // We'll dynamically change wheel speed based on whether it is "moving"
        wheelsRef.current.forEach(wheel => {
            if (wheel) wheel.rotation.z -= delta * 10;
        });
    });

    return (
        <group ref={group} scale={1.5} dispose={null} rotation={[0, -Math.PI / 4, 0]}>
            {/* Chassis - Sleek Material Expressive */}
            <RoundedBox args={[1.2, 0.4, 0.8]} radius={0.1} smoothness={4} position={[0, 0, 0]}>
                <MeshDistortMaterial
                    color="#111111"
                    roughness={0.1}
                    metalness={0.8}
                    distort={0.1}
                    speed={2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    emissive="#D71921"
                    emissiveIntensity={0.1}
                />
            </RoundedBox>

            {/* Top Layer / Deck */}
            <RoundedBox args={[1.0, 0.1, 0.8]} radius={0.05} position={[0, 0.25, 0]}>
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
            </RoundedBox>

            {/* Lidar Sensor */}
            <group position={[0.2, 0.4, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
                <mesh ref={lidarRef} position={[0, 0.1, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.2, 32]} />
                    <meshStandardMaterial color="#000" metalness={0.8} roughness={0.1} />
                    {/* Lidar Laser Glow */}
                    <mesh position={[0, 0, -0.08]}>
                        <boxGeometry args={[0.02, 0.1, 0.02]} />
                        <meshBasicMaterial color="#00ff00" />
                    </mesh>
                </mesh>
            </group>

            {/* Front Camera/Sensor Array */}
            <group position={[0.61, 0.1, 0]}>
                <mesh>
                    <boxGeometry args={[0.02, 0.1, 0.4]} />
                    <meshStandardMaterial color="#000" metalness={0.8} />
                </mesh>
                <mesh position={[0.01, 0, 0]}>
                    <circleGeometry args={[0.03, 16]} />
                    <meshBasicMaterial color="#00ffff" />
                </mesh>
            </group>

            {/* Wheels */}
            {[-0.4, 0.4].map((x, i) =>
                [-0.45, 0.45].map((z, j) => (
                    <group
                        key={`wheel-${i}-${j}`}
                        position={[x, -0.2, z]}
                        ref={(el) => {
                            if (el) wheelsRef.current.push(el);
                        }}
                    >
                        {/* Tyre */}
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.18, 0.18, 0.12, 32]} />
                            <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.1} />
                        </mesh>
                        {/* Wheel rim */}
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.1, 0.1, 0.13, 16]} />
                            <meshStandardMaterial color="#D71921" roughness={0.3} metalness={0.7} />
                        </mesh>
                    </group>
                ))
            )}
        </group>
    );
}
