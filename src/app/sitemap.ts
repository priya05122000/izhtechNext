// src/app/sitemap.ts

import { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/src/services/blogPostService";

import { getAllServices } from "@/src/services/mainService";

import { getAllProjects } from "@/src/services/projectService";

import { getAllCareer } from "@/src/services/careerService";
import { getAllJobs, getJobBySlug } from "../services/JobService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL

    // Static Pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },

        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },

        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },

        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },

        {
            url: `${baseUrl}/service`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },

        {
            url: `${baseUrl}/project`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },

        {
            url: `${baseUrl}/career`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    // Blogs
    const blogs = await getAllBlogPosts();

    const blogPages: MetadataRoute.Sitemap =
        blogs?.map((blog: any) => ({
            url: `${baseUrl}/blog/${blog.slug}`,

            lastModified: new Date(
                blog.updatedAt || blog.createdAt
            ),

            changeFrequency: "daily",

            priority: 0.7,
        })) || [];

    // Services
    const services = await getAllServices();

    const servicePages: MetadataRoute.Sitemap =
        services?.map((service: any) => ({
            url: `${baseUrl}/service/${service.slug}`,

            lastModified: new Date(
                service.updatedAt || service.createdAt
            ),

            changeFrequency: "weekly",

            priority: 0.7,
        })) || [];

    // Projects
    const projects = await getAllProjects();

    const projectPages: MetadataRoute.Sitemap =
        projects?.map((project: any) => ({
            url: `${baseUrl}/project/${project.slug}`,

            lastModified: new Date(
                project.updatedAt || project.createdAt
            ),

            changeFrequency: "weekly",

            priority: 0.7,
        })) || [];

    // Careers
    const careers = await getAllJobs();

    console.log(careers)

    const careerPages: MetadataRoute.Sitemap =
        careers?.map((career: any) => ({
            url: `${baseUrl}/career/${career.slug}`,

            lastModified: new Date(
                career.updatedAt || career.createdAt
            ),

            changeFrequency: "weekly",

            priority: 0.7,
        })) || [];

    return [
        ...staticPages,

        ...blogPages,

        ...servicePages,

        ...projectPages,

        ...careerPages,
    ];
}