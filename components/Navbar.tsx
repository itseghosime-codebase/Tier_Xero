"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import LogoSmall from "@/assets/logo/logo-small.svg";
import Logo from "@/assets/logo/logo.svg";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("#home");
    const [scrolled, setScrolled] = useState(false);

    // Detect scroll for both active section & scrolled state
    useEffect(() => {
        const handleScroll = () => {
            // Toggle scrolled state
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // If active is #get_started, don't override
            if (active === "#get_started") return;

            let currentSection = "#home";
            LinkTags.forEach(({ href }) => {
                const section = document.querySelector(href);
                if (
                    section &&
                    section.getBoundingClientRect().top <= 150 &&
                    section.getBoundingClientRect().bottom >= 150
                ) {
                    currentSection = href;
                }
            });
            setActive(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [active]);

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-50 content py-5 md:py-10 flex items-center justify-center gap-3 lg:gap-5 px-5 md:px-10 transition-all duration-300`}
        >
            {/* Logo */}
            <div className="shrink-0 relative z-20">
                <Image
                    src={Logo}
                    alt="Tier Xero Logo"
                    sizes="100%"
                    className="md:h-10 lg:h-16 w-auto hidden md:block"
                />
                <div className="py-3 px-5 rounded-full bg-[#1D1D1D] border border-[#5D5D5D] w-fit md:hidden">
                    <Image
                        src={LogoSmall}
                        alt="Tier Xero Logo Mobile"
                        sizes="100%"
                        className="h-8 w-auto"
                    />
                </div>
            </div>

            {/* Desktop Menu */}
            <ul className={`pt-3 pb-5 px-5 lg:px-10 rounded-full bg-[#1D1D1D] ${scrolled ? 'mx-auto' : 'mx-auto'} transition-all duration-300 ease-in-out border border-[#5D5D5D] w-fit items-center gap-10 font-mono text-lg lg:text-xl font-semibold hidden md:flex`}>
                {LinkTags.map((links, id) => (
                    <li key={id}>
                        <Link
                            href={links.href}
                            className={`transition-colors ease-in duration-200 ${active === links.href && active !== "#get_started"
                                ? "text-[#B49C52]"
                                : "hover:text-[#B49C52]"
                                }`}
                            onClick={() => setActive(links.href)}
                        >
                            {links.label}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* Desktop CTA */}
            <Link
                href={"#get_started"}
                onClick={() => setActive("#get_started")}
                className="pt-3 pb-5 px-5 rounded-full bg-[#1D1D1D] border border-[#5D5D5D] w-fit font-mono text-lg lg:text-xl font-semibold hidden md:block transition-colors ease-in duration-200 text-[#B49C52] hover:text-[#CFCFC6]"
            >
                GET STARTED
            </Link>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#CFCFC6] md:hidden relative z-20"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>

            {/* Mobile Menu Drawer */}
            <div
                className={`absolute ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-linear content z-10 top-0 pt-28 h-screen left-0 w-full bg-[#1D1D1D] border-t border-[#5D5D5D] flex flex-col items-center py-5 gap-6 md:hidden`}
            >
                {LinkTags.map((links, id) => (
                    <Link
                        key={id}
                        href={links.href}
                        className={`transition-colors ease-in duration-200 text-2xl w-full font-mono font-semibold ${active === links.href && active !== "#get_started"
                            ? "text-[#B49C52]"
                            : "hover:text-[#B49C52]"
                            }`}
                        onClick={() => {
                            setActive(links.href);
                            setIsOpen(false);
                        }}
                    >
                        {links.label}
                    </Link>
                ))}
                <Link
                    href={"#get_started"}
                    onClick={() => {
                        setActive("#get_started");
                        setIsOpen(false);
                    }}
                    className={`transition-colors ease-in duration-200 text-2xl w-full font-mono font-semibold ${active === "#get_started"
                        ? "text-[#B49C52]"
                        : "hover:text-[#B49C52]"
                        }`}
                >
                    GET STARTED
                </Link>
            </div>
        </nav>
    );
}

const LinkTags = [
    { label: "HOME", href: "#home" },
    { label: "SERVICES", href: "#service" },
    { label: "ABOUT", href: "#about" },
];
