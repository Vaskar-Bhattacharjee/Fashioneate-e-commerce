import type { Metadata } from "next";
import { Quicksand, Cormorant_Garamond, Roboto, Inter, Kumbh_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/src/components/ui/navbar";
import { ThemeProvider } from "../components/ui/theme-provider";
import { Footer } from "../components/Footer/footer";
import { Toaster } from "../components/ui/sonner";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});
const kumbh = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
});
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Fashioneate",
  description:
    "Your Ultimate Fashion Destination - Trendy Styles for Every Occasion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${quicksand.variable} ${cormorantGaramond.variable} ${roboto.variable} ${kumbh.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <Navbar />

          <main>
            {children}
            <Toaster position="top-right" />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
