'use client'
import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import Tony from '@/assets/teams/tony.png'
import Stetson from '@/assets/teams/stetson.png'
import Clinton from '@/assets/teams/Obas.png'
import Scott from '@/assets/teams/scott.png'
import Amu from '@/assets/teams/amu.png'
import Image from 'next/image';

// ✅ TEAM DATA
const SliderImage = [
    { label: 'Sales & Marketing', name: 'Tony Aldridge', image: Tony },
    { label: 'UI/UX & Design', name: 'Stetson Berks', image: Stetson },
    { label: 'Backend Developer', name: 'Clinton Obaseki', image: Clinton },
    { label: 'Project Manager', name: 'Scott Whitney', image: Scott },
    { label: 'UI/UX', name: 'Amu Sapto', image: Amu },
];

export default function CarouselSlide() {
    const swiperRef = useRef<any>(null);

    return (
        <section className="pb-20 space-y-10 md:space-y-14 lg:space-y-16 content mx-auto max-w-[1600px]">
            {/* HEADER WITH BUTTONS */}
            <div className="flex items-baseline justify-center gap-5 md:gap-10">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="font-mono w-fit text-5xl lg:text-6xl xl:text-7xl font-black"
                >
                    {'<'}
                </button>
                <div className="w-fit border border-[#CFCFC6] p-2 flex items-center justify-center">
                    <h3 className='!text-[27px] md:!text-4xl lg:!text-5xl xl:!text-6xl'>
                        TIER XERO <span className="text-[#C4A454]">TEAM</span>
                    </h3>
                </div>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="font-mono text-5xl lg:text-6xl xl:text-7xl font-black"
                >
                    {'>'}
                </button>
            </div>

            {/* SWIPER */}
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={60}
                centeredSlides
                loop
                breakpoints={{
                    640: {
                        centeredSlides: true
                    },
                    768: {
                        centeredSlides: false
                    },
                    1024: {
                        centeredSlides: false
                    },
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)} // ✅ get swiper instance
                className="mySwiper"
            >
                {SliderImage.map((team, idx) => (
                    <SwiperSlide key={idx} className="max-w-[300px]">
                        <div className="text-center max-w-80 font-sans font-bold text-xl">
                            <div className="image-container mb-3">
                                <Image
                                    src={team.image}
                                    alt={team.name}
                                    sizes="100%"
                                    className="h-full w-full object-center object-cover"
                                />
                            </div>
                            <p>{team.name}</p>
                            <p>{team.label}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
