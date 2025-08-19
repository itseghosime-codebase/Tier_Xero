"use client";

import React, { useEffect, useRef } from 'react'
import LogoLarge from '@/assets/logo/logo-large.png'
import Image from 'next/image'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(imageRef.current, {
                opacity: 0,
                x: -100,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%", // start when 80% of section is in view
                    toggleActions: "play none none reverse"
                }
            });

            gsap.from(textRef.current, {
                opacity: 0,
                x: 100,
                duration: 1,
                delay: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className='py-20 content space-y-16' id='about'>
            <div className="w-fit border border-[#CFCFC6] mx-auto px-6 py-2 flex items-center justify-center">
                <h3>WHAT IS <span>TIER</span> XERO?</h3>
            </div>
            <div className='grid md:grid-cols-5 items-center max-w-5xl mx-auto gap-10'>
                <div ref={imageRef} className='md:col-span-2 flex items-center justify-center'>
                    <Image
                        src={LogoLarge}
                        alt="Tier Xero Logo"
                        className='w-auto h-72'
                        sizes='100%'
                    />
                </div>
                <div ref={textRef} className='md:col-span-3 space-y-4 font-sans text-sm md:text-base lg:text-lg text-[#CFCFC6]'>
                    <p>
                        At <span>Tier Xero</span>, we specialize in bringing brands and their identities to life through <span>expert web design and development</span>. Our passion is crafting digital experiences that not only look stunning but also deliver <span>seamless usability</span> and meaningful engagement.
                    </p>
                    <p>
                        We combine <span>creative marketing strategies</span>, cutting-edge AI agents, user-centered UX design, and data-driven SEO to help businesses grow and thrive online. Every project is a unique collaboration, where your brand’s story is at the heart of everything we build.
                    </p>
                    <p>
                        Partner with <span>Tier Xero</span> to transform your vision into a <span>powerful digital presence</span> that truly connects with your audience.
                    </p>
                </div>
            </div>
        </section>
    )
}
