const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllServices() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/services`, {
            // cache: "no-store",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Services API failed:", res.status);
            return [];
        }

        const json = await res.json();
        return json || [];
    } catch (error) {
        console.error("Fetch services error:", error);
        return []; // prevent SSR crash
    }
}

export async function getServiceById(id: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/services/${id}`, {
            // cache: "no-store",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Service API failed:", res.status);
            return null;
        }

        const json = await res.json();
        return json?.data || null;
    } catch (error) {
        console.error("Fetch service error:", error);
        return null;
    }
}


export async function getServiceBySlug(slug: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/services/slug/${slug}`, {
            // cache: "no-store",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Service API failed:", res.status);
            return null;
        }

        const json = await res.json();
        return json || null;
    } catch (error) {
        console.error("Fetch service error:", error);
        return null; // prevent SSR crash
    }
}

