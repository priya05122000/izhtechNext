const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RedirectCheckResult {
    found: boolean;
    newPath?: string;
    statusCode?: number;
}

export async function checkRedirect(pathname: string): Promise<RedirectCheckResult | null> {
    try {
        const url = `${API_BASE_URL}/api/redirects/check?path=${encodeURIComponent(pathname)}`;

        // console.log("API_BASE_URL:", API_BASE_URL);
        // console.log("Pathname:", pathname);
        // console.log("Request URL:", url);

        const res = await fetch(url, { cache: "no-store" });

        // console.log("Status:", res.status);

        if (res.status === 404) {
            // No redirect exists for this path
            return { found: false };
        }

        if (!res.ok) {
            console.error("Redirect check API failed:", res.status);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Redirect check error:", error);
        return null;
    }
}
