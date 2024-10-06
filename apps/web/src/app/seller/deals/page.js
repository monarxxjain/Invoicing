import SellerPortfolioTab from "@/components/molecules/seller/alldeals/SellerPortfolioTab";
import { sellerTabs } from "@/content/homeContent";

export default function Home() {
    return (
      <div className="h-[90vh] overflow-y-scroll bg-gray-100">
        <SellerPortfolioTab tabs={sellerTabs} role={"SELLER"}/>
      </div>
    );
}
  