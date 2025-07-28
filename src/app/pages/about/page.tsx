'use client'
import React from 'react'
import Image from 'next/image';
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Benefit from '@/components/Home1/Benefit'
import Newsletter from '@/components/Home4/Newsletter'
import Instagram from '@/components/Home6/Instagram'
import Brand from '@/components/Home1/Brand'
import Footer from '@/components/Footer/Footer'

const AboutUs = () => {
    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne  />
                <Breadcrumb heading='About Us' subHeading='About Us' />
            </div>
            <div className='about md:pt-20 pt-10'>
                <div className="about-us-block">
                    <div className="container">
                        <div className="text flex items-center justify-center">
                            <div className="content md:w-5/6 w-full">
                                <div className="heading3 text-center">Connecting communities with affordable, reliable internet solutions.</div>
                                <div className="body1 text-center md:mt-7 mt-5">Affordable Connectivity is your trusted partner for high-speed internet services and connectivity solutions. We understand that reliable internet access is essential in today&apos;s digital world, and we&apos;re committed to providing affordable packages that keep you connected. Our mission is to bridge the digital divide by offering competitive pricing, exceptional customer service, and cutting-edge technology to ensure seamless connectivity for homes and businesses alike.</div>
                            </div>
                        </div>
                        <div className="list-img grid sm:grid-cols-3 gap-[30px] md:pt-20 pt-10">
                            <div className="bg-img">
                                <Image
                                    src={'/images/other/about-us1.png'}
                                    width={2000}
                                    height={3000}
                                    alt='Internet connectivity services'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                            <div className="bg-img">
                                <Image
                                    src={'/images/other/about-us2.png'}
                                    width={2000}
                                    height={3000}
                                    alt='High-speed internet packages'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                            <div className="bg-img">
                                <Image
                                    src={'/images/other/about-us3.png'}
                                    width={2000}
                                    height={3000}
                                    alt='Reliable connectivity solutions'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Benefit props="md:pt-20 pt-10" />
            <Newsletter props="bg-green md:mt-20 mt-10" />
            <Instagram />
            <Brand />
            <Footer />
        </>
    )
}

export default AboutUs