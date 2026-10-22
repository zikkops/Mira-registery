import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata = { title: "Admin — Mira Registry" };

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main>
        <AdminPanel />
      </main>
      <Footer />
    </>
  );
}
