import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreateRegistry from "@/components/dashboard/CreateRegistry";

export const metadata = { title: "Create your registry — Mira Registry" };

export default function NewRegistryPage() {
  return (
    <>
      <Navbar />
      <main>
        <CreateRegistry />
      </main>
      <Footer />
    </>
  );
}
