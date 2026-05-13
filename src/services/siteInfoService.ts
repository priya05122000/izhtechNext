const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllSiteInfo() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/siteInfo`, {
            // cache: "no-store",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Site Info API failed:", res.status);
            return [];
        }

        const json = await res.json();
        return json || [];
    } catch (error) {
        console.error("Fetch site info error:", error);
        return []; // prevent SSR crash
    }
}