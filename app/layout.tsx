import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Spectral } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { site } from "@/lib/site";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-schibsted",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.descriptor}`,
    template: `%s — ${site.name}`,
  },
  description: site.short,
  applicationName: site.name,
  keywords: [
    "production advisory",
    "production controlling",
    "independent production",
    "brands",
    "agencies",
    "AI in production",
    "media consultancy",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.descriptor}`,
    description: site.short,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.descriptor}`,
    description: site.short,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#1a1813",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${schibsted.variable} ${spectral.variable}`}>
      <body>
        <Loader />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
