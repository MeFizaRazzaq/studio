import { AdminSidebar } from "@/components/admin-sidebar";

export const metadata = {
  title: "Admin | Meem Artisan",
  description: "Admin panel for Meem Artisan",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
