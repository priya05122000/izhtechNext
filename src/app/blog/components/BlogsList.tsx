"use client";

import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import { Search } from "lucide-react";
import BlogCard from "./BlogCard";

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

        if (!blogs?.length) return [];

        return blogs.filter((post) => {

            const search = searchTerm
                .toLowerCase()
                .trim();

            // Category Filter
            const matchesCategory =
                !selectedCategory ||
                post.categories?.some(
                    (cat) =>
                        cat.name.toLowerCase() ===
                        selectedCategory.toLowerCase()
                );

            // Search Filter
            const matchesSearch =
                !search ||
                post.categories?.some(
                    (cat) =>
                        cat.name.toLowerCase() === search
                );

            return matchesCategory && matchesSearch;

        });

    }, [blogs, selectedCategory, searchTerm]);

    // Scroll Top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="px-5 sm:px-8 ">

            <div className="md:container mx-auto">

                <div className="flex flex-col md:flex-row gap-10 lg:gap-14">

                    {/* Sidebar */}
                    <div className="w-full md:w-[35%] lg:w-[25%] xl:w-[20%]">

                        <div className="sticky top-24">

                            <div className="bg-white pb-8">

                                {/* Search */}
                                <div className="relative w-full mb-6">

                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="w-full border-0 border-b-2 border-gray-400 focus:border-black focus:ring-0 outline-none pl-0 py-2 text-sm font-medium bg-transparent"
                                    />

                                    <span className="absolute right-2 bottom-3 text-black">
                                        <Search className="w-4 h-4" />
                                    </span>
                                </div>

                                {/* Categories */}
                                <div className="bg-[#A5B7FF1F] border border-[#00000012] rounded-sm shadow-sm overflow-hidden">

                                    <p className="text-lg font-semibold p-4">
                                        Categories
                                    </p>

                                    <ul className="space-y-0 text-sm">

                                        {/* All */}
                                        <li
                                            className={`px-4 py-3 border-b border-[#e5e7eb] cursor-pointer transition-all duration-300 ${!selectedCategory
                                                ? "bg-blue-100 font-bold"
                                                : "hover:bg-gray-50"
                                                }`}
                                            onClick={() =>
                                                setSelectedCategory(null)
                                            }
                                        >
                                            All
                                        </li>

                                        {/* Categories */}
                                        {categories.map((cat, i) => (

                                            <li
                                                key={i}
                                                className={`px-4 py-3 border-b border-[#e5e7eb] last:border-b-0 cursor-pointer transition-all duration-300 ${selectedCategory === cat
                                                    ? "bg-blue-100 font-bold"
                                                    : "hover:bg-gray-50"
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
                    </div>

                    {/* Blog Cards */}
                    <div className="flex-1 w-full pb-8 min-w-0">

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

                            <div className="flex justify-center items-center min-h-[300px]">
                                <p className="text-gray-500 text-lg">
                                    No Blogs Found
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogsList;