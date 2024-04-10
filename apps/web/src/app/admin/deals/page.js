import AdminDealsList from "@/components/molecules/admin/AdminDealsList";
import { adminDealTabs } from "@/content/homeContent";

export default function Home() {
    return (
      <div className="h-[90vh] overflow-y-hidden bg-gray-100">
        <AdminDealsList tabs={adminDealTabs} />
      </div>
    );
}
  