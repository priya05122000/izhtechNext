const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllProjects() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/project`, {
            // cache: "no-store",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Projects API failed:", res.status);
            return [];
        }

        const json = await res.json();
        return json || [];
    } catch (error) {
        console.error("Fetch projects error:", error);
        return []; // prevent SSR crash
    }
}

export async function getProjectBySlug(slug: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/project/slug/${slug}`, {
            // cache: "no-store",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Project API failed:", res.status);
            return null;
        }

        const json = await res.json();
        return json || null;
    } catch (error) {
        console.error("Fetch project error:", error);
        return null; // prevent SSR crash
    }
}
