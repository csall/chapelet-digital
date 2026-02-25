"use client";

import { useMemo, memo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles, ContactShadows, Float, MeshTransmissionMaterial } from '@react-three/drei';
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
            <sphereGeometry args={[size, 32, 32]} />
            {isDivider ? (
                /* Premium Gold Divider bead with prismatic metallic finish */
                <meshPhysicalMaterial
                    color="#fcd34d"
                    metalness={1}
                    roughness={0.05}
                    envMapIntensity={2.5}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    iridescence={0.8}
                    iridescenceIOR={1.5}
                />
            ) : (
                /* Advanced Transmission Material for deep sapphire/celestial effect */
                <MeshTransmissionMaterial
                    backside
                    backsideThickness={0.5}
                    thickness={1.2}
                    samples={8}
                    transmission={0.95}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    chromaticAberration={0.08}
                    anisotropy={0.2}
                    distortion={0.1}
                    distortionScale={0.1}
                    temporalDistortion={0.1}
                    ior={1.6}
                    color="#2563eb"
                    attenuationDistance={0.6}
                    attenuationColor="#60a5fa"
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
            <meshStandardMaterial color="#1e3a8a" roughness={0.3} metalness={0.5} />
        </mesh>
    );
});

const Tassel = memo(() => {
    const startPoint = getTeardropPoint(0); // Peak of the pendant area

    return (
        <group position={[startPoint.x, startPoint.y - 0.15, 0]}>
            {/* Imame / Head Bead - Multi-tiered gold with blue accent */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.06, 0.09, 0.3, 16]} />
                <meshPhysicalMaterial
                    color="#fbbf24"
                    metalness={1}
                    roughness={0.1}
                    envMapIntensity={2}
                    clearcoat={1}
                />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
                <sphereGeometry args={[0.1, 24, 24]} />
                <meshPhysicalMaterial
                    color="#2563eb"
                    metalness={0.8}
                    roughness={0.1}
                    envMapIntensity={2}
                    clearcoat={1}
                />
            </mesh>

            {/* Tassel threads with blueish gold shimmer */}
            <group position={[0, -0.3, 0]}>
                {[...Array(16)].map((_, i) => {
                    const angle = (i / 16) * Math.PI * 2;
                    const spread = 0.08;
                    const endX = Math.cos(angle) * spread;
                    const endZ = Math.sin(angle) * spread;
                    return (
                        <mesh key={i} rotation={[0.15, angle, 0]} position={[endX / 2, -0.4, endZ / 2]}>
                            <cylinderGeometry args={[0.005, 0.005, 0.8, 4]} />
                            <meshStandardMaterial
                                color="#60a5fa"
                                opacity={0.7}
                                transparent
                                metalness={0.8}
                                roughness={0.2}
                            />
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
        <Float
            speed={1.5}
            rotationIntensity={0.4}
            floatIntensity={0.6}
            floatingRange={[-0.2, 0.2]}
        >
            <group rotation={[0.4, 0, 0]} position={[0, 0.2, 0]}>
                <Cord />
                {beads.map((b, i) => <Bead key={i} position={b.pos} isDivider={b.isDivider} />)}
                <Tassel />
            </group>
        </Float>
    );
});

const DynamicLights = () => {
    const lightRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (!lightRef.current) return;
        const { x, y } = state.mouse;
        // Map mouse [-1, 1] to light position
        lightRef.current.position.set(x * 5, y * 5, 5);
    });

    return (
        <>
            <pointLight ref={lightRef} intensity={20} color="#3b82f6" distance={20} decay={2} />
            <spotLight position={[10, 20, 10]} intensity={50} angle={0.2} penumbra={1} color="#60a5fa" castShadow />
            <pointLight position={[-10, -10, -10]} intensity={15} color="#1e40af" />
        </>
    );
};

export const HomeBeadScene = memo(({ cameraY = 0 }: { cameraY?: number }) => (
    <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, cameraY, 5], fov: 45 }}
        gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
        <ambientLight intensity={0.4} />
        <DynamicLights />

        <Environment preset="night" />

        <ChapeletModel />

        <ContactShadows
            position={[0, -2.8, 0]}
            opacity={0.3}
            scale={10}
            blur={3.5}
            far={5}
        />

        <Sparkles
            count={30}
            scale={6}
            size={1.5}
            speed={0.5}
            opacity={0.4}
            color="#60a5fa"
        />
    </Canvas>
));
HomeBeadScene.displayName = "HomeBeadScene";
