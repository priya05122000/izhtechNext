const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllJobs() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/job`, {
            // cache: "no-store",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Jobs API failed:", res.status);
            return [];
        }

        const json = await res.json();
        return json || [];
    } catch (error) {
        console.error("Fetch jobs error:", error);
        return []; // prevent SSR crash
    }
}

export async function getJobBySlug(slug: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/job/slug/${slug}`, {
            // cache: "no-store",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Job API failed:", res.status);
            return null;
        }

        const json = await res.json();
        return json || null;
    } catch (error) {
        console.error("Fetch job error:", error);
        return null; // prevent SSR crash
    }
}