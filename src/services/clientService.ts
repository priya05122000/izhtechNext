const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllClients() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/client`, {
            // cache: "no-store",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Clients API failed:", res.status);
            return [];
        }

        const json = await res.json();
        return json || [];
    } catch (error) {
        console.error("Fetch clients error:", error);
        return []; // prevent SSR crash
    }
}