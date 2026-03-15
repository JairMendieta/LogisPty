"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Package, Search, Filter, Plus, MoreHorizontal, Download, Eye, Edit, Trash2, X, MapPin, Calendar, User, Truck, Map, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MOCK_SHIPMENTS = [
  { id: "TRK-8925", client: "Acme Corp", route: "Nueva York &rarr; Boston", status: "En Tránsito", driver: "Mike Johnson", date: "Hoy, 4:00 PM" },
  { id: "TRK-8926", client: "Stark Industries", route: "Los Ángeles &rarr; San Francisco", status: "Pendiente", driver: "Sin asignar", date: "Mañana, 10:00 AM" },
  { id: "TRK-8927", client: "Wayne Enterprises", route: "Chicago &rarr; Detroit", status: "En Tránsito", driver: "Sarah Connor", date: "Hoy, 6:30 PM" },
  { id: "TRK-8928", client: "Globex Corp", route: "Miami &rarr; Orlando", status: "Retrasado", driver: "Tom Smith", date: "Mañana, 2:00 PM" },
  { id: "TRK-8929", client: "Initech", route: "Seattle &rarr; Portland", status: "Entregado", driver: "Alex Chen", date: "Ayer, 1:15 PM" },
  { id: "TRK-8930", client: "Umbrella Corp", route: "Denver &rarr; Salt Lake City", status: "En Tránsito", driver: "John Doe", date: "Hoy, 8:00 PM" },
  { id: "TRK-8931", client: "Cyberdyne Systems", route: "Austin &rarr; Houston", status: "Pendiente", driver: "Sin asignar", date: "Mañana, 11:30 AM" },
  { id: "TRK-8932", client: "Massive Dynamic", route: "Boston &rarr; Nueva York", status: "Entregado", driver: "Olivia Dunham", date: "Ayer, 4:45 PM" },
  { id: "TRK-8933", client: "Soylent Corp", route: "San Diego &rarr; Phoenix", status: "En Tránsito", driver: "Robert Thorn", date: "Hoy, 9:15 PM" },
  { id: "TRK-8934", client: "Tyrell Corp", route: "Las Vegas &rarr; Los Ángeles", status: "Retrasado", driver: "Rick Deckard", date: "Mañana, 8:00 AM" },
  { id: "TRK-8935", client: "Weyland-Yutani", route: "Houston &rarr; Dallas", status: "En Tránsito", driver: "Ellen Ripley", date: "Hoy, 11:00 PM" },
  { id: "TRK-8936", client: "Oscorp", route: "Nueva York &rarr; Filadelfia", status: "Pendiente", driver: "Sin asignar", date: "Pasado mañana, 9:00 AM" },
  { id: "TRK-8937", client: "LexCorp", route: "Metrópolis &rarr; Gotham", status: "Entregado", driver: "Clark Kent", date: "Ayer, 6:00 PM" },
  { id: "TRK-8938", client: "Aperture Science", route: "Cleveland &rarr; Detroit", status: "En Tránsito", driver: "Chell", date: "Hoy, 2:30 PM" },
  { id: "TRK-8939", client: "Black Mesa", route: "Albuquerque &rarr; Santa Fe", status: "Retrasado", driver: "Gordon Freeman", date: "Mañana, 1:00 PM" },
];

const ITEMS_PER_PAGE = 6;

export default function ShipmentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [selectedShipment, setSelectedShipment] = useState<typeof MOCK_SHIPMENTS[0] | null>(null);
  const [sortColumn, setSortColumn] = useState<"client" | "date" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originError, setOriginError] = useState("");
  const [destinationError, setDestinationError] = useState("");

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    
    if (!origin.trim()) {
      setOriginError("El origen no puede estar vacío");
      isValid = false;
    } else if (origin.trim().length < 3) {
      setOriginError("El origen debe tener al menos 3 caracteres");
      isValid = false;
    } else {
      setOriginError("");
    }
    
    if (!destination.trim()) {
      setDestinationError("El destino no puede estar vacío");
      isValid = false;
    } else if (destination.trim().length < 3) {
      setDestinationError("El destino debe tener al menos 3 caracteres");
      isValid = false;
    } else {
      setDestinationError("");
    }

    if (isValid) {
      // Handle creation logic here
      setIsCreateModalOpen(false);
      setOrigin("");
      setDestination("");
    }
  };

  const filteredShipments = MOCK_SHIPMENTS.filter((shipment) => {
    const matchesStatus = statusFilter === "Todos" || shipment.status === statusFilter;
    const shipmentDestination = shipment.route.split(" &rarr; ")[1] || "";
    const matchesDestination = shipmentDestination.toLowerCase().includes(destinationFilter.toLowerCase());
    return matchesStatus && matchesDestination;
  });

  const sortedShipments = [...filteredShipments].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (sortColumn === "date") {
      const getDayValue = (dateStr: string) => {
        if (dateStr.startsWith("Ayer")) return -1;
        if (dateStr.startsWith("Hoy")) return 0;
        if (dateStr.startsWith("Mañana")) return 1;
        if (dateStr.startsWith("Pasado mañana")) return 2;
        return 3;
      };
      const dayDiff = getDayValue(aValue) - getDayValue(bValue);
      if (dayDiff !== 0) return sortDirection === "asc" ? dayDiff : -dayDiff;
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    return sortDirection === "asc" 
      ? aValue.localeCompare(bValue) 
      : bValue.localeCompare(aValue);
  });

  const totalPages = Math.ceil(sortedShipments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentShipments = sortedShipments.slice(startIndex, endIndex);

  const handleSort = (column: "client" | "date") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleViewMap = () => {
    if (!selectedShipment) return;
    const parts = selectedShipment.route.split(" &rarr; ");
    if (parts.length === 2) {
      const origin = parts[0];
      const dest = parts[1];
      window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(dest)}`, '_blank');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Envíos</h1>
            <p className="text-sm text-zinc-500 mt-1">Gestiona y rastrea todos tus envíos activos y pasados.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Crear Envío
            </button>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-200 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar por destino..."
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-md border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 rounded-md border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
            >
              <option value="Todos">Todos los estados</option>
              <option value="En Tránsito">En Tránsito</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Retrasado">Retrasado</option>
              <option value="Entregado">Entregado</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 font-medium">ID Rastreo</th>
                  <th 
                    className="px-6 py-3 font-medium cursor-pointer hover:text-zinc-900 transition-colors group"
                    onClick={() => handleSort("client")}
                  >
                    <div className="flex items-center gap-1">
                      Cliente
                      {sortColumn === "client" ? (
                        sortDirection === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 font-medium">Origen &rarr; Destino</th>
                  <th className="px-6 py-3 font-medium">Estado</th>
                  <th className="px-6 py-3 font-medium">Conductor</th>
                  <th 
                    className="px-6 py-3 font-medium cursor-pointer hover:text-zinc-900 transition-colors group"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center gap-1">
                      Entrega Est.
                      {sortColumn === "date" ? (
                        sortDirection === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 font-medium text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <TooltipProvider>
                  {currentShipments.map((shipment) => (
                    <TableRow
                      key={shipment.id}
                      id={shipment.id}
                      client={shipment.client}
                      route={shipment.route}
                      status={shipment.status}
                      driver={shipment.driver}
                      date={shipment.date}
                      isSelected={selectedShipment?.id === shipment.id}
                      onClick={() => setSelectedShipment(shipment)}
                    />
                  ))}
                </TooltipProvider>
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-zinc-200 flex items-center justify-between text-sm text-zinc-500">
            <div>Mostrando {filteredShipments.length === 0 ? 0 : startIndex + 1} a {Math.min(endIndex, filteredShipments.length)} de {filteredShipments.length} resultados</div>
            <div className="flex items-center gap-2">
              <button 
                className="px-3 py-1 border border-zinc-200 rounded-md hover:bg-zinc-50 disabled:opacity-50 transition-colors" 
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
              >
                Anterior
              </button>
              <button 
                className="px-3 py-1 border border-zinc-200 rounded-md hover:bg-zinc-50 disabled:opacity-50 transition-colors"
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail View Side Panel */}
      {selectedShipment && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl border-l border-zinc-200 z-50 flex flex-col animate-in slide-in-from-right">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/50">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Detalles del Envío</h2>
              <p className="text-sm text-zinc-500 font-mono mt-1">{selectedShipment.id}</p>
            </div>
            <button 
              onClick={() => setSelectedShipment(null)}
              className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            <div>
              <h3 className="text-sm font-medium text-zinc-500 mb-3 uppercase tracking-wider">Información General</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Cliente</p>
                    <p className="text-sm text-zinc-600">{selectedShipment.client}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Ruta</p>
                    <p className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: selectedShipment.route }}></p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Fecha Estimada</p>
                    <p className="text-sm text-zinc-600">{selectedShipment.date}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-zinc-200">
              <h3 className="text-sm font-medium text-zinc-500 mb-3 uppercase tracking-wider">Logística</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Conductor Asignado</p>
                    <p className="text-sm text-zinc-600">{selectedShipment.driver}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Estado Actual</p>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 text-zinc-800 mt-1">
                      {selectedShipment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex gap-3">
            <button 
              onClick={handleViewMap}
              className="flex-1 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Map className="w-4 h-4" />
              Ver en Mapa
            </button>
            <button className="flex-1 px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm">
              Rastrear
            </button>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">Crear Nuevo Envío</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateShipment} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Origen</label>
                <input 
                  type="text" 
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className={`w-full h-10 px-3 rounded-md border ${originError ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 focus:ring-zinc-900'} bg-white text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                  placeholder="Ej. Nueva York"
                />
                {originError && <p className="text-xs text-red-500 mt-1">{originError}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Destino</label>
                <input 
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className={`w-full h-10 px-3 rounded-md border ${destinationError ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 focus:ring-zinc-900'} bg-white text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                  placeholder="Ej. Boston"
                />
                {destinationError && <p className="text-xs text-red-500 mt-1">{destinationError}</p>}
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  Guardar Envío
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function TableRow({ id, client, route, status, driver, date, isSelected, onClick }: { id: string, client: string, route: string, status: string, driver: string, date: string, isSelected?: boolean, onClick?: () => void }) {
  const statusColors: Record<string, string> = {
    "En Tránsito": "bg-blue-100 text-blue-800 ring-blue-600/30",
    "Pendiente": "bg-zinc-100 text-zinc-800 ring-zinc-500/30",
    "Retrasado": "bg-amber-100 text-amber-800 ring-amber-600/30",
    "Entregado": "bg-emerald-100 text-emerald-800 ring-emerald-600/30",
  };

  return (
    <tr 
      onClick={onClick}
      className={`transition-all cursor-pointer border-l-4 ${isSelected ? 'bg-blue-50/60 border-blue-600 shadow-sm' : 'border-transparent hover:bg-zinc-100/80'}`}
    >
      <td className="px-6 py-4 font-medium text-zinc-900">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="truncate max-w-[100px] block cursor-help">{id}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{id}</p>
          </TooltipContent>
        </Tooltip>
      </td>
      <td className="px-6 py-4 text-zinc-600">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="truncate max-w-[120px] block cursor-help">{client}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{client}</p>
          </TooltipContent>
        </Tooltip>
      </td>
      <td className="px-6 py-4 text-zinc-600" dangerouslySetInnerHTML={{ __html: route }}></td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${statusColors[status] || "bg-zinc-100 text-zinc-800 ring-zinc-500/30"}`}>
          {status}
        </span>
      </td>
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
