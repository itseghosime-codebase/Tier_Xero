'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import ServiceBg from '@/assets/backgrounds/servicebg.png'
import { MdArrowOutward } from 'react-icons/md'
import { serviceList } from '@/lib/secvice'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ServiceSection() {
    const [activeService, setActiveService] = React.useState<number>(0)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        let ctx = gsap.context(() => {
            gsap.from('.service-button', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
                y: 50,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out',
            })

            gsap.from('.service-content', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
                y: 50,
                opacity: 0,
                delay: 0.2,
                duration: 0.8,
                ease: 'power3.out',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className='py-24 relative w-full -mt-5 badge' id='service'>
            <div className='max-w-[1500px] mx-auto'>
                <div className='relative content w-full z-10'>
                    <div className='w-fit border border-[#CFCFC6] mx-auto px-4 pb-2 mb-10'>
                        <h3>OUR <span>SERVICES</span></h3>
                    </div>
                    <div className='grid xl:grid-cols-5 gap-10'>
                        {/* Left buttons */}
                        <div className='xl:col-span-2 space-y-2 h-full flex flex-col justify-center'>
                            {serviceList.map((service, index) => (
                                <div key={index}>
                                    <button
                                        onClick={() => setActiveService(index)}
                                        className={`service-button flex items-center justify-between w-full text-3xl md:text-4xl lg:text-5xl font-mono font-normal border-b ${activeService === index ? 'border-[#B49C52] text-[#B49C52]' : 'border-[#CFCFC6] text-[#CFCFC6]'} pb-2`}>
                                        <p>{service.heading}</p>
                                        <MdArrowOutward className='mt-5' />
                                    </button>

                                    {/* Mobile dropdown */}
                                    {activeService === index && (
                                        <div className="py-4 mt-5 space-y-6 xl:hidden service-content">
                                            <p
                                                className="font-sans text-sm md:text-base lg:text-lg tracking-wide font-medium"
                                                dangerouslySetInnerHTML={{ __html: service.description }}
                                            />
                                            <div className='space-y-5'>
                                                {service.listing.map((item, i) => (
                                                    <div key={i} className='space-y-3'>
                                                        <div className='flex items-baseline gap-5'>
                                                            <div className='relative h-full flex items-center justify-center px-5 py-3 after:absolute after:top-0 after:right-0 after:h-5 after:w-5 after:border-2 after:border-b-0 after:border-l-0 after:border-[#B49C52]
                                                        before:absolute before:bottom-0 before:left-0 before:h-5 before:w-5 before:border-2 before:border-t-0 before:border-r-0 before:border-[#B49C52]'>
                                                                <h4 className='text-xl md:text-2xl'>{i + 1}</h4>
                                                            </div>
                                                            <h4 className='text-xl md:text-2xl lg:text-3xl font-mono font-normal text-[#CFCFC6]'>{item.head}</h4>
                                                        </div>
                                                        <p
                                                            className='font-sans text-sm md:text-base lg:text-lg tracking-wide font-medium'
                                                            dangerouslySetInnerHTML={{ __html: item.body }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop right content */}
                        <div className='hidden xl:block xl:col-span-3 p-3 md:p-10 service-content'>
                            <div className='flex flex-col md:flex-row items-center justify-between h-full gap-10 md:gap-16'>
                                <div className="serviceListing">
                                    <h4 className="md:rotate-[-90deg] -mt-4 text-4xl md:text-5xl xl:text-7xl whitespace-nowrap font-mono font-normal text-[#B49C52]">
                                        {serviceList[activeService].heading}
                                    </h4>
                                </div>

                                <div className='space-y-8'>
                                    <p
                                        className="font-sans text-sm md:text-base lg:text-lg tracking-wide font-medium"
                                        dangerouslySetInnerHTML={{ __html: serviceList[activeService].description }}
                                    />
                                    <div className='space-y-5'>
                                        {serviceList[activeService].listing.map((item, index) => (
                                            <div key={index} className='space-y-3'>
                                                <div className='flex items-baseline gap-7 lg:gap-10'>
                                                    <div className='relative h-full flex items-center justify-center px-5 py-3 after:absolute after:top-0 after:right-0 after:h-5 after:w-5 after:border-2 after:border-b-0 after:border-l-0 after:border-[#B49C52]
                                                    before:absolute before:bottom-0 before:left-0 before:h-5 before:w-5 before:border-2 before:border-t-0 before:border-r-0 before:border-[#B49C52]'>
                                                        <h4 className='text-xl md:text-2xl lg:text-3xl'>{index + 1}</h4>
                                                    </div>
                                                    <h4 className='text-2xl md:text-3xl lg:text-4xl font-mono font-normal text-[#CFCFC6] m-0 p-0'>{item.head}</h4>
                                                </div>
                                                <p className='font-sans text-sm md:text-base lg:text-lg tracking-wide font-medium'
                                                    dangerouslySetInnerHTML={{ __html: item.body }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
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
