import InvestorPortfolioTab from "@/components/atoms/InverstorPortfolioTab";
import { sellerTabs } from "@/content/homeContent";

export default function Home() {
    return (
      <div>
        <InvestorPortfolioTab tabs={sellerTabs}/>
      </div>
    );
}
  