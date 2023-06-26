import Navbar from "@/features/navbar/Navbar";
import "./globals.css";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
});

export const metadata = {
  title: "Flair Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
