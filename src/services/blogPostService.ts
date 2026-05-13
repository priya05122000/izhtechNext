const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllBlogPosts() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/post`, {
            // cache: "no-store",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Blog Posts API failed:", res.status);
            return [];
        }

        const json = await res.json();
        return json || [];
    } catch (error) {
        console.error("Fetch blog posts error:", error);
        return []; // prevent SSR crash
    }
}

export async function getBlogBySlug(slug: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/post/slug/${slug}`, {
            // cache: "no-store",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Blog API failed:", res.status);
            return null;
        }

        const json = await res.json();
        return json || null;
    } catch (error) {
        console.error("Fetch blog error:", error);
        return null; // prevent SSR crash
    }
}


