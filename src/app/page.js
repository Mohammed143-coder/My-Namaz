import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import HomeLayout from "@/components/Home/Home";


export default function Home() {
  return (
   <section className="flex flex-col min-h-screen bg-white">
  <main className="flex-grow overflow-y-auto">
   <NavBar/>
   <HomeLayout/>
  </main>

</section>

  );
}
