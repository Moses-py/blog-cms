import Navbar from "@/features/navbar/Navbar";
import "./globals.css";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/features/newsletter/Newsletter";
import { useBlogStore } from "@/store/Blogstrore";
import PaystackModal from "@/components/modal/PaystackModal";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--plus_jakarta_sans",
});
const cormorant_garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--cormorant_garamond",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Flair Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modal] = useBlogStore((state) => [state.modal]);
  return (
    <html lang="en">
      <body
        className={`${plus_jakarta_sans.variable} font-sans ${cormorant_garamond.variable} font-serif`}
      >
        <div className="p-5">
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>

        <Navbar />
        {children}
        <Newsletter />
        <Footer />
        {modal && <PaystackModal />}
      </body>
    </html>
  );
}
