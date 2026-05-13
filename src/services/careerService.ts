const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllCareer() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/career`, {
            // cache: "no-store",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Career API failed:", res.status);
            return [];
        }

        const json = await res.json();
        return json || [];
    } catch (error) {
        console.error("Fetch career error:", error);
        return []; // prevent SSR crash
    }
}


