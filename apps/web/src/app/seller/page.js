import WelcomeUser from "@/components/atoms/WelcomeUser";
import SellerHomeAnalytics from "@/components/molecules/seller/SellerHomeAnalytics";

export default function Home() {


  return (
      <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8 flex flex-col gap-6">
        <WelcomeUser />
        <SellerHomeAnalytics />
      </div>
    );
  }
  