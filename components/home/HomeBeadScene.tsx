"use client";

import { useMemo, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const NUM_BEADS = 33;

/** 
 * Custom Teardrop Curve for a realistic hanging rosary 
 * Returns a Point on the curve for a given [0, 1] t 
 */
function getTeardropPoint(t: number) {
    const angle = t * Math.PI * 2;
    // Teardrop distortion: push the bottom down and narrow the top
    const radiusX = 1.3 * (1 + 0.3 * Math.sin(angle / 2));
    const radiusY = 2.0 * (0.8 + 0.4 * Math.sin(angle / 2));

    // Rotate to hang properly (pendant at bottom)
    const x = Math.sin(angle) * radiusX;
    const y = -Math.cos(angle) * radiusY + 0.5; // Offset up slightly
    return new THREE.Vector3(x, y, 0);
}

const Bead = memo(({ position, isDivider = false }: { position: THREE.Vector3; isDivider?: boolean }) => {
    const size = isDivider ? 0.16 : 0.135;

    return (
        <mesh position={position}>
            <sphereGeometry args={[size, 24, 24]} />
            {isDivider ? (
                /* Gold Divider bead */
                <meshPhysicalMaterial
                    color="#fbbf24"
                    metalness={0.9}
                    roughness={0.15}
                    envMapIntensity={2}
                    clearcoat={1}
                />
            ) : (
                /* Polished Obsidian bead */
                <meshPhysicalMaterial
                    color="#18181b"
                    metalness={0.1}
                    roughness={0.02}
                    transmission={0.05}
                    thickness={0.5}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    envMapIntensity={4}
                    reflectivity={1}
                />
            )}
        </mesh>
    );
});
Bead.displayName = "Bead";

const Cord = memo(() => {
    const points = useMemo(() => {
        const pts = [];
        for (let i = 0; i <= 100; i++) {
            pts.push(getTeardropPoint(i / 100));
        }
        return pts;
    }, []);

    const geometry = useMemo(() => {
        const curve = new THREE.CatmullRomCurve3(points, true);
        return new THREE.TubeGeometry(curve, 100, 0.015, 8, true);
    }, [points]);

    return (
        <mesh geometry={geometry}>
            <meshStandardMaterial color="#2d2d30" roughness={0.8} />
        </mesh>
    );
});

const Tassel = memo(() => {
    const startPoint = getTeardropPoint(0); // Peak of the pendant area

    return (
        <group position={[startPoint.x, startPoint.y - 0.15, 0]}>
            {/* Imame / Head Bead - Multi-tiered gold */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.06, 0.09, 0.3, 16]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Tassel threads */}
            <group position={[0, -0.3, 0]}>
                {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    const spread = 0.08;
                    const endX = Math.cos(angle) * spread;
                    const endZ = Math.sin(angle) * spread;
                    return (
                        <mesh key={i} rotation={[0.1, angle, 0]} position={[endX / 2, -0.4, endZ / 2]}>
                            <cylinderGeometry args={[0.006, 0.006, 0.8, 4]} />
                            <meshStandardMaterial color="#fbbf24" opacity={0.8} transparent />
                        </mesh>
                    );
                })}
            </group>
        </group>
    );
});

const ChapeletModel = memo(() => {
    const beads = useMemo(() => {
        const result = [];
        // 33 beads divided into 11, 11, 11
        for (let i = 0; i < 33; i++) {
            const t = (i + 0.5) / 33;
            // Add a divider bead every 11
            const isDivider = (i + 1) % 11 === 0 && i !== 32;
            result.push({ pos: getTeardropPoint(t), isDivider });
        }
        return result;
    }, []);

    return (
        <group rotation={[0.4, 0, 0]} position={[0, 0.2, 0]}>
            <Cord />
            {beads.map((b, i) => <Bead key={i} position={b.pos} isDivider={b.isDivider} />)}
            <Tassel />
        </group>
    );
});

export const HomeBeadScene = memo(({ cameraY = 0 }: { cameraY?: number }) => (
    <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, cameraY, 5], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'default' }}
        frameloop="demand" // Only render on demand - extreme energy savings
        style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 10, 10]} intensity={20} angle={0.2} penumbra={1} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={10} color="#6366f1" />

        <Environment preset="city" />

        <ChapeletModel />

        <ContactShadows
            position={[0, -2.8, 0]}
            opacity={0.4}
            scale={10}
            blur={3}
            far={5}
        />

        <Sparkles count={15} scale={5} size={2} speed={0} opacity={0.15} color="#fbbf24" />
    </Canvas>
));
HomeBeadScene.displayName = "HomeBeadScene";
