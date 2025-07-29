'use client';

import React, { useEffect, useState } from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import SliderOne from "@/components/Slider/SliderOne";
import WhatNewOne from "@/components/Home1/WhatNewOne";
import productData from "@/data/Product.json";
import Collection from "@/components/Home1/Collection";
import TabFeatures from "@/components/Home1/TabFeatures";
import Banner from "@/components/Home1/Banner";
import Benefit from "@/components/Home1/Benefit";
import testimonialData from "@/data/Testimonial.json";
import Testimonial from "@/components/Home1/Testimonial";
import Instagram from "@/components/Home1/Instagram";
import Brand from "@/components/Home1/Brand";
import Footer from "@/components/Footer/Footer";
import ModalNewsletter from "@/components/Modal/ModalNewsletter";

export default function Home() {
    const backendUrl = "https://swimwear-backend.vercel.app"
  const [isLive, setIsLive] = useState(null);

  useEffect(() => {
    fetch(`${backendUrl}/api/site-status`)
      .then((res) => res.json())
      .then((data) => setIsLive(data.isLive));
  }, []);

  if (!isLive) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl">🚧 Website Under Maintenance 🚧</h1>
      </div>
    );
  }
  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuOne />
        <SliderOne />
      </div>
      <Collection />
      <TabFeatures data={productData} start={0} limit={6} />
      <Banner />
      <Benefit props="md:py-20 py-10" />
      <Testimonial data={testimonialData} limit={6} />
      <Instagram />
      <Brand />
      <Footer />
      <ModalNewsletter />
    </>
  );
}
