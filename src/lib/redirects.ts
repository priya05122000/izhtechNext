const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RedirectCheckResult {
    found: boolean;
    newPath?: string;
    statusCode?: number;
}

export async function checkRedirect(pathname: string): Promise<RedirectCheckResult | null> {
    try {
        const res = await fetch(
            `${API_BASE_URL}/api/redirects/check?path=${encodeURIComponent(pathname)}`,
            { cache: "no-store" }
        );
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
