import DashboardLayout from "@/components/dashboard-layout";
import { OverviewChart } from "@/components/overview-chart";
import { Package, TrendingUp, Truck, AlertCircle, ArrowUpRight, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Panel de Control</h1>
            <p className="text-sm text-zinc-500 mt-1">Bienvenido de nuevo. Esto es lo que sucede hoy.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm">
              Descargar Reporte
            </button>
            <button className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2">
              <Package className="w-4 h-4" />
              Nuevo Envío
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total de Envíos"
            value="1,250"
            trend="+12.5%"
            trendUp={true}
            icon={<Package className="w-4 h-4 text-zinc-500" />}
          />
          <MetricCard
            title="En Tránsito"
            value="342"
            trend="+4.2%"
            trendUp={true}
            icon={<Truck className="w-4 h-4 text-zinc-500" />}
          />
          <MetricCard
            title="Entregados (Hoy)"
            value="89"
            trend="-2.1%"
            trendUp={false}
            icon={<TrendingUp className="w-4 h-4 text-zinc-500" />}
          />
          <MetricCard
            title="Problemas Reportados"
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
                <h2 className="text-base font-semibold text-zinc-900">Volumen de Envíos</h2>
                <p className="text-sm text-zinc-500">Rendimiento de los últimos 7 días</p>
              </div>
              <button className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-1">
                Ver Detalles <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <OverviewChart />
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-zinc-900">Actividad Reciente</h2>
              <button className="text-zinc-400 hover:text-zinc-900">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              <ActivityItem 
                title="Envío #TRK-8921 entregado"
                time="Hace 10 mins"
                status="success"
              />
              <ActivityItem 
                title="Conductor Mike recogió #TRK-8924"
                time="Hace 45 mins"
                status="neutral"
              />
              <ActivityItem 
                title="Retraso reportado en Ruta A4"
                time="Hace 2 horas"
                status="warning"
              />
              <ActivityItem 
                title="Nuevo pedido de Acme Corp"
                time="Hace 3 horas"
                status="neutral"
              />
              <ActivityItem 
                title="Envío #TRK-8910 entregado"
                time="Hace 5 horas"
                status="success"
              />
            </div>
          </div>
        </div>

        {/* Active Shipments Table */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-zinc-900">Envíos Activos</h2>
              <p className="text-sm text-zinc-500">Actualmente en tránsito o pendientes de recolección.</p>
            </div>
            <button className="text-sm font-medium text-zinc-900 hover:underline">
              Ver Todos
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 font-medium">ID Rastreo</th>
                  <th className="px-6 py-3 font-medium">Cliente</th>
                  <th className="px-6 py-3 font-medium">Origen &rarr; Destino</th>
                  <th className="px-6 py-3 font-medium">Estado</th>
                  <th className="px-6 py-3 font-medium">Entrega Est.</th>
                  <th className="px-6 py-3 font-medium text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <TableRow 
                  id="TRK-8925"
                  client="Acme Corp"
                  route="Nueva York &rarr; Boston"
                  status="En Tránsito"
                  date="Hoy, 4:00 PM"
                />
                <TableRow 
                  id="TRK-8926"
                  client="Stark Industries"
                  route="Los Ángeles &rarr; San Francisco"
                  status="Pendiente"
                  date="Mañana, 10:00 AM"
                />
                <TableRow 
                  id="TRK-8927"
                  client="Wayne Enterprises"
                  route="Chicago &rarr; Detroit"
                  status="En Tránsito"
                  date="Hoy, 6:30 PM"
                />
                <TableRow 
                  id="TRK-8928"
                  client="Globex Corp"
                  route="Miami &rarr; Orlando"
                  status="Retrasado"
                  date="Mañana, 2:00 PM"
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
    "En Tránsito": "bg-blue-50 text-blue-700 ring-blue-600/20",
    "Pendiente": "bg-zinc-50 text-zinc-600 ring-zinc-500/20",
    "Retrasado": "bg-amber-50 text-amber-700 ring-amber-600/20",
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-zinc-400 hover:text-zinc-900 outline-none">
              <MoreHorizontal className="w-5 h-5 ml-auto" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              <span>Ver detalles</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar envío</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Cancelar envío</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
