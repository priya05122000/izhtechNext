import React from "react";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import IzhtechScroll from "./components/IzhtechScroll";
import NewsLetter from "./components/NewsLetter";
import Process from "./components/Process";
import { getAllServices } from "@/src/services/mainService";
import Feature from "./components/Feature";
import { getAllClients } from "@/src/services/clientService";
import PartnerCompany from "./components/PartnerCompany";
import { getAllSiteInfo } from "@/src/services/siteInfoService";
import PlatformInsights from "./components/PlatformInsights";
import CustomObject from "@/src/shared/components/CustomObjects";
// import BlogList from "./components/BlogList";
import { getAllBlogPosts } from "@/src/services/blogPostService";
import OurService from "./components/OurService";
import { getAllTestimonials } from "@/src/services/testimonialService";
import Slider from "./components/Slider";
import BlogList from "./components/BlogList";

const HomePage = async () => {
    const services = await getAllServices();
    const clients = await getAllClients();
    const siteInfo = await getAllSiteInfo();
    const blogPosts = await getAllBlogPosts();
    const testimonials = await getAllTestimonials();

    return (
        <>
            <Hero />
            <Feature services={services} />
            <PartnerCompany clients={clients} />
            <Banner siteInfo={siteInfo} />
            <IzhtechScroll />
            <NewsLetter />
            <PlatformInsights siteInfo={siteInfo} />
            <BlogList blogPosts={blogPosts} />
            <OurService services={services} />
            <Process />
            <Slider testimonials={testimonials} />
        </>
    );
};

export default HomePage;