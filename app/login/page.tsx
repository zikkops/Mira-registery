import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginPanel from "@/components/auth/LoginPanel";

export const metadata = { title: "Log in — Mira Registry" };

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main>
        <LoginPanel />
      </main>
      <Footer />
    </>
  );
}
