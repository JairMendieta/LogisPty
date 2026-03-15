import DashboardLayout from "@/components/dashboard-layout";
import { Truck, Search, Filter, Plus, MoreHorizontal, MapPin, Battery, Activity } from "lucide-react";

export default function FleetPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Gestión de Flota</h1>
            <p className="text-sm text-zinc-500 mt-1">Monitorea tus vehículos y conductores en tiempo real.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Añadir Vehículo
            </button>
          </div>
        </div>

        {/* Fleet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <OverviewCard title="Total de Vehículos" value="45" icon={<Truck className="w-5 h-5 text-zinc-500" />} />
          <OverviewCard title="Activos en Ruta" value="28" icon={<Activity className="w-5 h-5 text-emerald-500" />} />
          <OverviewCard title="En Mantenimiento" value="3" icon={<Battery className="w-5 h-5 text-amber-500" />} />
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-200 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar por matrícula, conductor o modelo..."
                className="w-full h-9 pl-9 pr-4 rounded-md border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
              />
            </div>
            <button className="px-3 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Estado: Todos
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Vehículo</th>
                  <th className="px-6 py-3 font-medium">Matrícula</th>
                  <th className="px-6 py-3 font-medium">Conductor Actual</th>
                  <th className="px-6 py-3 font-medium">Estado</th>
                  <th className="px-6 py-3 font-medium">Última Ubicación</th>
                  <th className="px-6 py-3 font-medium text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <VehicleRow 
                  model="Ford Transit 2023"
                  plate="XYZ-1234"
                  driver="Mike Johnson"
                  status="Activo"
                  location="I-95 Norte, NY"
                />
                <VehicleRow 
                  model="Mercedes Sprinter"
                  plate="ABC-9876"
                  driver="Sarah Connor"
                  status="Activo"
                  location="Centro LA, CA"
                />
                <VehicleRow 
                  model="Ram ProMaster"
                  plate="DEF-4567"
                  driver="Sin asignar"
                  status="Inactivo"
                  location="Depósito Central, Chicago"
                />
                <VehicleRow 
                  model="Ford E-Transit"
                  plate="EV-001"
                  driver="Tom Smith"
                  status="Mantenimiento"
                  location="Centro de Servicio A"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function OverviewCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex items-center gap-4">
      <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-zinc-500">{title}</h3>
        <p className="text-2xl font-semibold text-zinc-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function VehicleRow({ model, plate, driver, status, location }: { model: string, plate: string, driver: string, status: string, location: string }) {
  const statusColors: Record<string, string> = {
    "Activo": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    "Inactivo": "bg-zinc-50 text-zinc-600 ring-zinc-500/20",
    "Mantenimiento": "bg-amber-50 text-amber-700 ring-amber-600/20",
  };

  return (
    <tr className="hover:bg-zinc-50/50 transition-colors">
      <td className="px-6 py-4 font-medium text-zinc-900 flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-zinc-100 flex items-center justify-center">
          <Truck className="w-4 h-4 text-zinc-500" />
        </div>
        {model}
      </td>
      <td className="px-6 py-4 font-mono text-xs text-zinc-600">{plate}</td>
      <td className="px-6 py-4 text-zinc-600">
        <div className="flex items-center gap-2">
          {driver !== "Sin asignar" && (
            <div className="w-5 h-5 rounded-full bg-zinc-200 flex items-center justify-center text-[10px] font-medium text-zinc-600">
              {driver.charAt(0)}
            </div>
          )}
          <span className={driver === "Sin asignar" ? "text-zinc-400 italic" : ""}>{driver}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${statusColors[status] || "bg-zinc-50 text-zinc-600 ring-zinc-500/20"}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-zinc-600 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
        {location}
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-zinc-400 hover:text-zinc-900">
          <MoreHorizontal className="w-5 h-5 ml-auto" />
        </button>
      </td>
    </tr>
  );
}
