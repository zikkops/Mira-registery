import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata = { title: "Your dashboard — Mira Registry" };

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main>
        <Dashboard />
      </main>
      <Footer />
    </>
  );
}
