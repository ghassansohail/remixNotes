import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/main.css";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import MainNavigation from "./components/MainNavigation";

export default function App() {
  return (
    <html lang="en">
    <head>
      <Meta />
      <Links />
    </head>
    <body>
      <header>
        <MainNavigation />
      </header>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
  );
}
export function links () {
 return [{ rel: "stylesheet", href:styles }]
}

export function ErrorBoundary({ error }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>An error occurred!</h1>
          <p>{error}</p>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
