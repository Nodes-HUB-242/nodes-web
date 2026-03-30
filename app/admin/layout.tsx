import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Dashboard Admin | Nodes Technologie",
  description: "Tableau de bord d'administration Nodes Technologie",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#fafafe" }}
    >
      <Sidebar />
      <main className="lg:pl-64">
        {children}
      </main>
    </div>
  );
}
