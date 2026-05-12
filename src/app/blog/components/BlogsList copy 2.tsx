// BlogsList.tsx

"use client";

import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { Search } from "lucide-react";
import BlogCard from "./BlogCard";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PostModel {
    id: string;
    slug: string;
    title: string;
    description: string;
    status: string;
    tags: string;
    shortNote: string;
    imagePath: string;
    featuredImagePath: string;
    publishedDate: Date;
    author: {
        name: string;
        id: string;
    };
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    categories: CategoryModel[];
}

interface CategoryModel {
    id: string;
    name: string;
    description: string;
    icon: string;
    shortDescription: string;
    imagePath: string;
    blog: PostModel[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

interface BlogsListProps {
    blogs: PostModel[];
}

const BlogsList = ({
    blogs = [],
}: BlogsListProps) => {

    const sidebarRef =
        useRef<HTMLDivElement>(null);

    const wrapperRef =
        useRef<HTMLDivElement>(null);

    const [selectedCategory, setSelectedCategory] =
        useState<string | null>(null);

    const [searchTerm, setSearchTerm] =
        useState("");

    // Categories
    const categories = useMemo(() => {

        if (!blogs?.length) return [];

        const allCategories = blogs.flatMap((post) =>
            post.categories?.map((cat) => cat.name) || []
        );

        return Array.from(new Set(allCategories));

    }, [blogs]);

    // Filter Blogs
    const filteredBlogs = useMemo(() => {

        return blogs.filter((post) => {

            const matchesCategory =
                !selectedCategory ||
                post.categories?.some(
                    (cat) => cat.name === selectedCategory
                );

            const lowerSearch =
                searchTerm.toLowerCase();

            const matchesSearch =
                !searchTerm ||
                post.title
                    .toLowerCase()
                    .includes(lowerSearch) ||
                post.shortNote
                    ?.toLowerCase()
                    .includes(lowerSearch) ||
                post.categories?.some((cat) =>
                    cat.name
                        .toLowerCase()
                        .includes(lowerSearch)
                );

            return matchesCategory && matchesSearch;
        });

    }, [blogs, selectedCategory, searchTerm]);

    // Scroll Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // GSAP Sticky Sidebar
    useEffect(() => {

        if (
            !sidebarRef.current ||
            !wrapperRef.current
        ) return;

        const ctx = gsap.context(() => {

            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: "top top+=90",
                end: "bottom bottom",
                pin: sidebarRef.current,
                pinSpacing: false,
                scrub: false,
            });

        });

        return () => ctx.revert();

    }, []);

    return (
        <section className="px-5">

            <div className="md:container mx-auto px-2">

                <div
                    ref={wrapperRef}
                    className="flex flex-col md:flex-row gap-10 lg:gap-14"
                >

                    {/* Sidebar */}
                    <div className="w-full md:w-[35%] lg:w-[25%] xl:w-[20%]">

                        <div
                            ref={sidebarRef}
                            className="bg-white pb-8"
                        >

                            {/* Search */}
                            <div className="relative w-full mb-6">

                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full border-0 border-b-2 border-gray-400 focus:border-black focus:ring-0 outline-none pl-0 text-sm font-medium"
                                />

                                <span className="absolute right-2 bottom-3 text-black">
                                    <Search className="w-4 h-4" />
                                </span>
                            </div>

                            {/* Categories */}
                            <div className="bg-[#A5B7FF1F] border border-[#00000012] rounded-sm shadow-sm">

                                <h2 className="text-lg font-semibold p-4">
                                    Categories
                                </h2>

                                <ul className="space-y-0 text-sm">

                                    <li
                                        className={`px-4 py-2.5 border-b-2 last:border-b-0 cursor-pointer ${!selectedCategory
                                                ? "bg-blue-100 font-bold"
                                                : ""
                                            }`}
                                        onClick={() =>
                                            setSelectedCategory(null)
                                        }
                                    >
                                        All
                                    </li>

                                    {categories.map((cat, i) => (

                                        <li
                                            key={i}
                                            className={`px-4 py-2.5 border-b-2 last:border-b-0 cursor-pointer ${selectedCategory === cat
                                                    ? "bg-blue-100 font-bold"
                                                    : ""
                                                }`}
                                            onClick={() =>
                                                setSelectedCategory(cat)
                                            }
                                        >
                                            {cat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Blog Cards */}
                    <div className="flex-1 pb-8">

                        {filteredBlogs?.length > 0 ? (

                            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">

                                {filteredBlogs.map((item) => (

                                    <BlogCard
                                        key={item.id}
                                        item={item}
                                        variant="blog"
                                    />
                                ))}
                            </div>

                        ) : (

                            <div className="flex justify-center items-center h-full">
                                <p>No Blogs Found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogsList;