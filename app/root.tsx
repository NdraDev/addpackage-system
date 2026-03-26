import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
    { rel: "icon", href: "/logo.png", type: "image/png" },
    { rel: "manifest", href: "/site.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="id" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="WHM API Automation System" />
                <meta name="theme-color" content="#000000" />
                <Links />
            </head>
            <body className="min-h-screen bg-background font-sans antialiased">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <>
            <Meta />
            <Outlet />
        </>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404 - Page Not Found" : "Error";
        details = error.status === 404
            ? "The page you are looking for does not exist."
            : error.statusText || details;
    } else if (error instanceof Error) {
        details = error.message;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6 p-8">
                <div className="space-y-2">
                    <img src="/logo.png" alt="NdraDev Logo" className="w-20 h-20 mx-auto mb-4" />
                    <h1 className="text-6xl font-bold">{message}</h1>
                    <p className="text-xl text-muted-foreground">{details}</p>
                </div>
                <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Back to Home
                </a>
            </div>
        </div>
    );
}
