import Navbar from "@/features/navbar/Navbar";
import "./globals.css";
import { Quicksand, Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const plus_jakarta_sans = Plus_Jakarta_Sans({
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
      <body className={plus_jakarta_sans.className}>
        <ToastContainer
          position="top-center"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
