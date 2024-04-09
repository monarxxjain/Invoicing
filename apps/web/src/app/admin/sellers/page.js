import AdminSellerList from "@/components/molecules/admin/AdminSellerList";
import { adminSellerListTabs } from "@/content/homeContent";

export default function Home() {
    return (
      <div className="h-[90vh] overflow-y-hidden bg-gray-100">
        <AdminSellerList tabs={adminSellerListTabs} />
      </div>
    );
}
  