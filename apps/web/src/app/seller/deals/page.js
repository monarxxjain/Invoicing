import SellerPortfolioTab from "@/components/molecules/seller/alldeals/SellerPortfolioTab";
import { sellerTabs } from "@/content/homeContent";
import { cookies } from 'next/headers'

export default function Home() {
  const cookieStore = cookies()
  const role = cookieStore.get('ROLE')
    return (
      <div className="h-[90vh] overflow-y-scroll bg-gray-100">
        <SellerPortfolioTab tabs={sellerTabs} role={role.value}/>
      </div>
    );
}
  