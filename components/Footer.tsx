import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <section className='content badgi relative flex items-center justify-center text-center pt-16 pb-8 font-sans font-bold text-sm md:text-base lg:text-lg'>
            <p>&copy; {currentYear} All Rights Reserved by <span>Tier Xero</span></p>
        </section>
    )
}
