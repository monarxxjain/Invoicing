import CreateDealForm from "@/components/molecules/seller/newdeal/NewDeal";
import { cookies } from "next/headers";

export default function Home( ) {
  const cookieStore = cookies()
  const sellerId = cookieStore.get('SELLER_ID')
  const token = cookieStore.get('access_token')
    return (
      <div className="h-[90vh] overflow-y-scroll bg-gray-100 px-6 py-8">
        <CreateDealForm sellerId={sellerId} token={token}/>
      </div>
    );
}
  