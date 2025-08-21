import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import HomeLayout from "@/components/Home";


export default function Home() {
  return (
   <section className="flex flex-col min-h-screen bg-white">
  <main className="flex-grow">
   <NavBar/>
   <HomeLayout/>
  </main>
  <footer className=" text-black text-center p-1">
    <Footer/>
  </footer>
</section>

  );
}
