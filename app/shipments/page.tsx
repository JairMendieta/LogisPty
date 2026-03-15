import DashboardLayout from "@/components/dashboard-layout";
import { Package, Search, Filter, Plus, MoreHorizontal, Download } from "lucide-react";

export default function ShipmentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Shipments</h1>
            <p className="text-sm text-zinc-500 mt-1">Manage and track all your active and past shipments.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Shipment
            </button>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-200 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by tracking ID, client, or destination..."
                className="w-full h-9 pl-9 pr-4 rounded-md border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
              />
            </div>
            <button className="px-3 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Tracking ID</th>
                  <th className="px-6 py-3 font-medium">Client</th>
                  <th className="px-6 py-3 font-medium">Origin &rarr; Destination</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Driver</th>
                  <th className="px-6 py-3 font-medium">Est. Delivery</th>
                  <th className="px-6 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <TableRow 
                  id="TRK-8925"
                  client="Acme Corp"
                  route="New York &rarr; Boston"
                  status="In Transit"
                  driver="Mike Johnson"
                  date="Today, 4:00 PM"
                />
                <TableRow 
                  id="TRK-8926"
                  client="Stark Industries"
                  route="Los Angeles &rarr; San Francisco"
                  status="Pending"
                  driver="Unassigned"
                  date="Tomorrow, 10:00 AM"
                />
                <TableRow 
                  id="TRK-8927"
                  client="Wayne Enterprises"
                  route="Chicago &rarr; Detroit"
                  status="In Transit"
                  driver="Sarah Connor"
                  date="Today, 6:30 PM"
                />
                <TableRow 
                  id="TRK-8928"
                  client="Globex Corp"
                  route="Miami &rarr; Orlando"
                  status="Delayed"
                  driver="Tom Smith"
                  date="Tomorrow, 2:00 PM"
                />
                <TableRow 
                  id="TRK-8929"
                  client="Initech"
                  route="Seattle &rarr; Portland"
                  status="Delivered"
                  driver="Alex Chen"
                  date="Yesterday, 1:15 PM"
                />
                <TableRow 
                  id="TRK-8930"
                  client="Umbrella Corp"
                  route="Denver &rarr; Salt Lake City"
                  status="In Transit"
                  driver="John Doe"
                  date="Today, 8:00 PM"
                />
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-zinc-200 flex items-center justify-between text-sm text-zinc-500">
            <div>Showing 1 to 6 of 1,250 results</div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-zinc-200 rounded-md hover:bg-zinc-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border border-zinc-200 rounded-md hover:bg-zinc-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function TableRow({ id, client, route, status, driver, date }: { id: string, client: string, route: string, status: string, driver: string, date: string }) {
  const statusColors: Record<string, string> = {
    "In Transit": "bg-blue-50 text-blue-700 ring-blue-600/20",
    "Pending": "bg-zinc-50 text-zinc-600 ring-zinc-500/20",
    "Delayed": "bg-amber-50 text-amber-700 ring-amber-600/20",
    "Delivered": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  };

  return (
    <tr className="hover:bg-zinc-50/50 transition-colors">
      <td className="px-6 py-4 font-medium text-zinc-900">{id}</td>
      <td className="px-6 py-4 text-zinc-600">{client}</td>
      <td className="px-6 py-4 text-zinc-600" dangerouslySetInnerHTML={{ __html: route }}></td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${statusColors[status] || "bg-zinc-50 text-zinc-600 ring-zinc-500/20"}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-zinc-600">
        <div className="flex items-center gap-2">
          {driver !== "Unassigned" && (
            <div className="w-5 h-5 rounded-full bg-zinc-200 flex items-center justify-center text-[10px] font-medium text-zinc-600">
              {driver.charAt(0)}
            </div>
          )}
          <span className={driver === "Unassigned" ? "text-zinc-400 italic" : ""}>{driver}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-zinc-600">{date}</td>
      <td className="px-6 py-4 text-right">
        <button className="text-zinc-400 hover:text-zinc-900">
          <MoreHorizontal className="w-5 h-5 ml-auto" />
        </button>
      </td>
    </tr>
  );
}
