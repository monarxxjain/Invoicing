import HeroSection from "@/components/molecules/homePage/HeroSection";
import TheProcess from "@/components/molecules/homePage/TheProcess";
import FAQS from "@/components/molecules/homePage/FAQS";
import Footer from "@/components/molecules/common/Footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="flex flex-col gap-16">
        <TheProcess />
        <FAQS />
        <Footer/>
      </div>
    </div>
  );
}
