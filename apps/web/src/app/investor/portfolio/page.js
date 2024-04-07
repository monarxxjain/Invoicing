import InvestorPortfolioTab from "@/components/molecules/investor/InverstorPortfolioTab";
import { investorTabs } from "@/content/homeContent";

export default function Home() {
    return (
      <div>
        <InvestorPortfolioTab tabs={investorTabs}/>
      </div>
    );
}
  