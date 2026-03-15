import DashboardLayout from "@/components/dashboard-layout";
import { Users, Search, Filter, Plus, MoreHorizontal, Building2, Mail, Phone, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ClientsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Clientes</h1>
            <p className="text-sm text-zinc-500 mt-1">Gestiona tus clientes B2B y sus perfiles de envío.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Añadir Cliente
            </button>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-200 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar por empresa, contacto o email..."
                className="w-full h-9 pl-9 pr-4 rounded-md border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
              />
            </div>
            <button className="px-3 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Ordenar: Más recientes
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Empresa</th>
                  <th className="px-6 py-3 font-medium">Contacto Principal</th>
                  <th className="px-6 py-3 font-medium">Envíos Activos</th>
                  <th className="px-6 py-3 font-medium">Volumen Total</th>
                  <th className="px-6 py-3 font-medium">Estado</th>
                  <th className="px-6 py-3 font-medium text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <ClientRow 
                  company="Acme Corp"
                  contact="Jane Doe"
                  email="jane@acme.com"
                  phone="+1 (555) 123-4567"
                  activeShipments={12}
                  totalVolume="1,240 kg"
                  status="Activo"
                />
                <ClientRow 
                  company="Stark Industries"
                  contact="Tony Stark"
                  email="tony@stark.com"
                  phone="+1 (555) 987-6543"
                  activeShipments={5}
                  totalVolume="8,500 kg"
                  status="Activo"
                />
                <ClientRow 
                  company="Wayne Enterprises"
                  contact="Bruce Wayne"
                  email="bruce@wayne.com"
                  phone="+1 (555) 555-0199"
                  activeShipments={0}
                  totalVolume="450 kg"
                  status="Inactivo"
                />
                <ClientRow 
                  company="Globex Corp"
                  contact="Hank Scorpio"
                  email="hank@globex.com"
                  phone="+1 (555) 888-9999"
                  activeShipments={28}
                  totalVolume="12,000 kg"
                  status="Activo"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ClientRow({ company, contact, email, phone, activeShipments, totalVolume, status }: { company: string, contact: string, email: string, phone: string, activeShipments: number, totalVolume: string, status: string }) {
  const statusColors: Record<string, string> = {
    "Activo": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    "Inactivo": "bg-zinc-50 text-zinc-600 ring-zinc-500/20",
  };

  return (
    <tr className="hover:bg-zinc-50/50 transition-colors">
      <td className="px-6 py-4 font-medium text-zinc-900 flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <p className="font-semibold text-zinc-900">{company}</p>
          <p className="text-xs text-zinc-500 font-normal mt-0.5">ID: CLI-{Math.abs(company.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)) % 9000 + 1000}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-zinc-900 font-medium">{contact}</p>
        <div className="flex flex-col gap-1 mt-1">
          <span className="text-xs text-zinc-500 flex items-center gap-1.5"><Mail className="w-3 h-3" /> {email}</span>
          <span className="text-xs text-zinc-500 flex items-center gap-1.5"><Phone className="w-3 h-3" /> {phone}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-zinc-600">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 text-xs font-medium text-zinc-900 ring-1 ring-inset ring-zinc-200">
          {activeShipments}
        </span>
      </td>
      <td className="px-6 py-4 text-zinc-600 font-mono text-xs">{totalVolume}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${statusColors[status] || "bg-zinc-50 text-zinc-600 ring-zinc-500/20"}`}>
          {status}
        </span>
      </td>
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
              <span>Ver perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar cliente</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Eliminar cliente</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
