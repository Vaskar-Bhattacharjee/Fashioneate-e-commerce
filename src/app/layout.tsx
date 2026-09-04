import type { Metadata } from "next";
import { Quicksand, Cormorant_Garamond } from "next/font/google";
import "@/src/app/globals.css";
import { Navbar } from "@/src/components/ui/navbar";
import { ThemeProvider } from "../components/ui/theme-provider";
import { Footer } from "../components/Footer/footer";
import { Toaster } from "../components/ui/sonner";


const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fashioneate",
  description:
    "Your Ultimate Fashion Destination - Trendy Styles for Every Occasion",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${quicksand.variable} ${cormorantGaramond.variable} antialiased`}
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
