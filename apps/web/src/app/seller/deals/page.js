import InvestorPortfolioTab from "@/components/atoms/InverstorPortfolioTab";
import { sellerTabs } from "@/content/homeContent";

export default function Home() {
    return (
      <div className="h-[90vh] overflow-y-scroll bg-gray-100">
        <InvestorPortfolioTab tabs={sellerTabs}/>
      </div>
    );
}
  