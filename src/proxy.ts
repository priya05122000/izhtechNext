import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRedirect } from "@/src/lib/redirects";

const PRODUCTION_HOSTS = ["izhtech.com", "www.izhtech.com"];

export async function proxy(request: NextRequest) {

    const host = request.headers.get("host");

    if (host && PRODUCTION_HOSTS.includes(host)) {

        const protocol =
            request.headers.get("x-forwarded-proto") ??
            request.nextUrl.protocol.replace(":", "");

        const targetHost = host === "www.izhtech.com" ? "izhtech.com" : host;

        if (targetHost !== host || protocol !== "https") {

            return NextResponse.redirect(
                `https://${targetHost}${request.nextUrl.pathname}${request.nextUrl.search}`,
                301
            );

        }

    }

    const pathname = request.nextUrl.pathname;
    const result = await checkRedirect(pathname);

    if (result?.found && result.newPath && result.newPath !== pathname) {

        const destination = new URL(result.newPath, request.url);

        return NextResponse.redirect(destination, result.statusCode ?? 301);

    }

    return NextResponse.next();

}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
    ],
};
