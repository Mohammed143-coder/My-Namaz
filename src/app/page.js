import NavBar from "@/components/NavBar";
import HomeLayout from "@/components/Home/HomeMain";

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen bg-white">
      {/* Full height container */}
      <NavBar />

      {/* Make HomeLayout fill remaining height and control its own scrolls */}
      <main className="flex-grow overflow-hidden">
        <HomeLayout />
      </main>
    </section>
  );
}
