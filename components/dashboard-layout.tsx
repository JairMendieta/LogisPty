import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
  Settings,
  CreditCard,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] text-zinc-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 bg-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200">
          <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
            <div className="w-8 h-8 bg-zinc-900 rounded-md flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            LogisSaaS
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            <NavItem href="/" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" active />
            <NavItem href="/shipments" icon={<Package className="w-4 h-4" />} label="Shipments" />
            <NavItem href="/fleet" icon={<Truck className="w-4 h-4" />} label="Fleet" />
            <NavItem href="/clients" icon={<Users className="w-4 h-4" />} label="Clients" />
            <NavItem href="/billing" icon={<CreditCard className="w-4 h-4" />} label="Billing" />
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-200">
          <nav className="space-y-1 mb-4">
            <NavItem href="/settings" icon={<Settings className="w-4 h-4" />} label="Settings" />
          </nav>
          <div className="flex items-center gap-3 px-2">
            <Avatar className="w-9 h-9 border border-zinc-200">
              <AvatarImage src="https://picsum.photos/seed/user/100/100" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 truncate">Admin User</p>
              <p className="text-xs text-zinc-500 truncate">admin@logissaas.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search shipments, drivers, or clients..."
                className="w-full h-9 pl-9 pr-4 rounded-md border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-500 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? "bg-zinc-100 text-zinc-900"
          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
