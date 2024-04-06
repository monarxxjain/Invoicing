import InvestorStats from "@/components/molecules/investor/InvestorStats";
import WalletOverview from "@/components/molecules/investor/WalletOverview";

export default function Home() {
    return (
      <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-32 py-8">
        {/* <WalletOverview/> */}
        <InvestorStats />
      </div>
    );
}