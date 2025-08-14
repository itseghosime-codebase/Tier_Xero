"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ParticleWaveProps = {
    particleCount?: number;
    separation?: number;
    amplitude?: number;
    speed?: number;
    color?: string;
};

export default function ParticleWave({
    particleCount = 200,
    separation = 20,
    amplitude = 15,
    speed = 0.05,
    color = "#ffffff",
}: ParticleWaveProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#0D0D0D");

        // Camera (low & far back, tilted down)
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        camera.position.set(110, 300, 500); // lower height, farther away
        camera.lookAt(0, 0, 0);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Particles
        const numParticles = particleCount * particleCount;
        const positions = new Float32Array(numParticles * 3);
        const scales = new Float32Array(numParticles);

        let i = 0;
        let j = 0;
        for (let ix = 0; ix < particleCount; ix++) {
            for (let iy = 0; iy < particleCount; iy++) {
                positions[i] = ix * separation - (particleCount * separation) / 2; // x
                positions[i + 1] = 0; // y
                positions[i + 2] = iy * separation - (particleCount * separation) / 2; // z
                scales[j] = 0.8; // smaller dots
                i += 3;
                j++;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

        // Normalized position along Z axis (-1 to 1)
        const alphas = new Float32Array(numParticles);
        j = 0;
        for (let ix = 0; ix < particleCount; ix++) {
            for (let iy = 0; iy < particleCount; iy++) {
                const zNorm = iy / (particleCount - 1); // 0 at start, 1 at end
                // interpolate between 0.4 → 0.6 → 0.3
                let alpha;
                if (zNorm < 0.5) {
                    alpha = THREE.MathUtils.lerp(0.2, 0.4, zNorm / 0.5);
                } else {
                    alpha = THREE.MathUtils.lerp(0.4, 0.1, (zNorm - 0.5) / 0.5);
                }
                alphas[j++] = alpha;
            }
        }
        geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(color) },
            },
            transparent: true,
            depthWrite: false,
            vertexShader: `
    attribute float scale;
    attribute float alpha;
    varying float vAlpha;
    void main() {
      vAlpha = alpha;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = scale * 16.0 * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
            fragmentShader: `
    uniform vec3 color;
    varying float vAlpha;
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float fade = smoothstep(0.5, 0.0, dist);
      gl_FragColor = vec4(color, fade * vAlpha);
    }
  `,
        });



        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let count = 0;

        const animate = () => {
            const positionsAttr = geometry.attributes.position as THREE.BufferAttribute;

            let i = 0;
            for (let ix = 0; ix < particleCount; ix++) {
                for (let iy = 0; iy < particleCount; iy++) {
                    const waveX = Math.sin((ix + count) * 0.15);
                    const waveY = Math.cos((iy + count) * 0.15);
                    positionsAttr.array[i + 1] = (waveX + waveY) * amplitude;
                    i += 3;
                }
            }

            positionsAttr.needsUpdate = true;
            renderer.render(scene, camera);
            count += speed;
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationRef.current!);
            window.removeEventListener("resize", handleResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, [particleCount, separation, amplitude, speed, color]);

    return <div ref={containerRef} className="w-full h-full inset-0 absolute" />;
}
