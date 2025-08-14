"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ParticleWaves from "@/components/ParticleWaves";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
export default function HerSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(".hero-title", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            gsap.from(".hero-paragraph", {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.4,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-[600px] md:h-[700px] xl:h-[80vh] overflow-hidden flex items-end py-20 lg:py-40"
            id="home"
        >
            <ParticleWaves />
            <div className="absolute z-10 inset-0 bg-gradient-to-t from-black/80 to-transparent to-60%" />
            <div className="content relative max-w-7xl mt-20 space-y-3 z-20">
                <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-mono font-bold">
                    Design <span>Beyond Limits. </span> <br className="hidden md:block" />
                    Brands <span>Beyond Ordinary.</span>
                </h1>
                <p className="hero-paragraph text-sm md:text-base lg:text-lg xl:text-xl font-sans">
                    <span>Tier Xero</span> creates powerful digital experiences that elevate brands and engage audiences.
                    As your strategic partner, we bring your vision to life with purpose and precision.
                </p>
            </div>
        </section>
    );
}
