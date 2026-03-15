import DashboardLayout from "@/components/dashboard-layout";
import { OverviewChart } from "@/components/overview-chart";
import { Package, TrendingUp, Truck, AlertCircle, ArrowUpRight, MoreHorizontal } from "lucide-react";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-zinc-500 mt-1">Welcome back. Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm">
              Download Report
            </button>
            <button className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2">
              <Package className="w-4 h-4" />
              New Shipment
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Shipments"
            value="1,250"
            trend="+12.5%"
            trendUp={true}
            icon={<Package className="w-4 h-4 text-zinc-500" />}
          />
          <MetricCard
            title="In Transit"
            value="342"
            trend="+4.2%"
            trendUp={true}
            icon={<Truck className="w-4 h-4 text-zinc-500" />}
          />
          <MetricCard
            title="Delivered (Today)"
            value="89"
            trend="-2.1%"
            trendUp={false}
            icon={<TrendingUp className="w-4 h-4 text-zinc-500" />}
          />
          <MetricCard
            title="Issues Reported"
            value="3"
            trend="-1"
            trendUp={true} // Less issues is good
            icon={<AlertCircle className="w-4 h-4 text-zinc-500" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-zinc-900">Shipment Volume</h2>
                <p className="text-sm text-zinc-500">Last 7 days performance</p>
              </div>
              <button className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-1">
                View Details <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <OverviewChart />
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-zinc-900">Recent Activity</h2>
              <button className="text-zinc-400 hover:text-zinc-900">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              <ActivityItem 
                title="Shipment #TRK-8921 delivered"
                time="10 mins ago"
                status="success"
              />
              <ActivityItem 
                title="Driver Mike picked up #TRK-8924"
                time="45 mins ago"
                status="neutral"
              />
              <ActivityItem 
                title="Delay reported on Route A4"
                time="2 hours ago"
                status="warning"
              />
              <ActivityItem 
                title="New order received from Acme Corp"
                time="3 hours ago"
                status="neutral"
              />
              <ActivityItem 
                title="Shipment #TRK-8910 delivered"
                time="5 hours ago"
                status="success"
              />
            </div>
          </div>
        </div>

        {/* Active Shipments Table */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-zinc-900">Active Shipments</h2>
              <p className="text-sm text-zinc-500">Currently in transit or pending pickup.</p>
            </div>
            <button className="text-sm font-medium text-zinc-900 hover:underline">
              View All
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
                  date="Today, 4:00 PM"
                />
                <TableRow 
                  id="TRK-8926"
                  client="Stark Industries"
                  route="Los Angeles &rarr; San Francisco"
                  status="Pending"
                  date="Tomorrow, 10:00 AM"
                />
                <TableRow 
                  id="TRK-8927"
                  client="Wayne Enterprises"
                  route="Chicago &rarr; Detroit"
                  status="In Transit"
                  date="Today, 6:30 PM"
                />
                <TableRow 
                  id="TRK-8928"
                  client="Globex Corp"
                  route="Miami &rarr; Orlando"
                  status="Delayed"
                  date="Tomorrow, 2:00 PM"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MetricCard({ title, value, trend, trendUp, icon }: { title: string, value: string, trend: string, trendUp: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-zinc-500">{title}</h3>
        {icon}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-zinc-900 tracking-tight">{value}</span>
        <span className={`text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function ActivityItem({ title, time, status }: { title: string, time: string, status: 'success' | 'warning' | 'neutral' }) {
  const colors = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    neutral: 'bg-zinc-300'
  };

  return (
    <div className="flex gap-4">
      <div className="mt-1.5 relative">
        <div className={`w-2 h-2 rounded-full ${colors[status]} ring-4 ring-white`}></div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-10 bg-zinc-200 -z-10"></div>
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-900">{title}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function TableRow({ id, client, route, status, date }: { id: string, client: string, route: string, status: string, date: string }) {
  const statusColors: Record<string, string> = {
    "In Transit": "bg-blue-50 text-blue-700 ring-blue-600/20",
    "Pending": "bg-zinc-50 text-zinc-600 ring-zinc-500/20",
    "Delayed": "bg-amber-50 text-amber-700 ring-amber-600/20",
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
      <td className="px-6 py-4 text-zinc-600">{date}</td>
      <td className="px-6 py-4 text-right">
        <button className="text-zinc-400 hover:text-zinc-900">
          <MoreHorizontal className="w-5 h-5 ml-auto" />
        </button>
      </td>
    </tr>
  );
}
