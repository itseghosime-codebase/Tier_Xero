"use client";

import { serviceList } from '@/lib/secvice'
import React, { useEffect, useRef } from 'react'
import ContactForm from './ContactForm'
import ServiceBg from '@/assets/backgrounds/servicebg.png'
import Image from 'next/image'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textBlockRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textBlockRef.current, {
                opacity: 0,
                x: -80,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse"
                }
            });

            gsap.from(formRef.current, {
                opacity: 0,
                x: 80,
                duration: 1,
                ease: "power3.out",
                delay: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            gsap.from(servicesRef.current?.children || [], {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 65%",
                    toggleActions: "play none none reverse"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className='badg relative bg-[#161616]' id='get_started'>
            <div className='py-24 space-y-14 content relative z-10'>
                <div className='w-fit border border-[#CFCFC6] mx-auto px-4 pb-2 '>
                    <h3>LETS <span>GET STARTED</span></h3>
                </div>
                <div className='grid md:grid-cols-2 items-center max-w-6xl mx-auto gap-10'>
                    
                    {/* Left Side (Text) */}
                    <div ref={textBlockRef} className='font-sans space-y-12'>
                        <p className='text-xl md:text-2xl lg:text-3xl text-[#B49C52] font-medium'>I am looking for...</p>

                        <p ref={servicesRef} className='text-lg md:text-xl lg:text-2xl'>
                            {serviceList.map((service, idx) => (
                                <span
                                    key={idx}
                                    className="!text-[#CFCFC6] font-bold py-2.5 px-3 border border-[#CFCFC6] inline-block mr-3 mb-3 lg:mr-5 lg:mb-5"
                                >
                                    {service.heading}
                                </span>
                            ))}
                        </p>

                        <div className='space-y-6 font-medium'>
                            <p className='text-xl md:text-2xl lg:text-3xl text-[#B49C52]'>Or give us a call.</p>
                            <a href="tel:+12105555555" className='underline underline-offset-4 decoration-[#CFCFC6] text-lg md:text-xl lg:text-2xl hover:decoration-[#B49C52] transition-colors duration-200 ease-in'>Call 210.555.5555</a>
                        </div>

                        <div className='space-y-6 font-medium'>
                            <p className='text-xl md:text-2xl lg:text-3xl text-[#B49C52]'>Need more help?</p>
                            <a href="mailto:Support@TierXero.co" className='underline underline-offset-4 decoration-[#CFCFC6] hover:decoration-[#B49C52] text-lg md:text-xl lg:text-2xl transition-colors duration-200 ease-in'>Support@TierXero.co</a>
                        </div>
                    </div>

                    {/* Right Side (Form) */}
                    <div ref={formRef} className='space-y-12'>
                        <p className='text-xl md:text-2xl lg:text-3xl font-sans text-[#B49C52] font-medium'>My Contact Information:</p>
                        <ContactForm />
                    </div>
                </div>
            </div>

            <Image
                src={ServiceBg}
                alt='Service bg'
                className='h-full w-full object-cover object-center absolute inset-0'
                sizes='100%'
                fill
            />
        </section>
    )
}
