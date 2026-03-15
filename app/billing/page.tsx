import DashboardLayout from "@/components/dashboard-layout";
import { CreditCard, Check, Zap, Building2, ShieldCheck } from "lucide-react";

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Facturación y Planes</h1>
          <p className="text-sm text-zinc-500 mt-1">Gestiona tu suscripción, métodos de pago e historial de facturación.</p>
        </div>

        {/* Current Plan */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Plan Pro
              </h2>
              <p className="text-sm text-zinc-500 mt-1">Actualmente estás en el plan Pro, facturado mensualmente.</p>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 font-medium">Envíos usados este mes</span>
                  <span className="text-zinc-900 font-medium">842 / 1,000</span>
                </div>
                <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-900 rounded-full" style={{ width: '84%' }}></div>
                </div>
                <p className="text-xs text-zinc-500">Se reinicia el 1 de Oct, 2026</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-zinc-900 tracking-tight">$99<span className="text-base font-normal text-zinc-500">/mes</span></div>
              <button className="mt-4 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm w-full">
                Gestionar Suscripción
              </button>
            </div>
          </div>
        </div>

        {/* Upgrade Options */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Planes Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PlanCard 
              name="Básico"
              price="$29"
              description="Perfecto para pequeñas empresas que recién comienzan."
              features={["Hasta 100 envíos/mes", "Rastreo básico", "Soporte por email", "1 usuario Admin"]}
              current={false}
            />
            <PlanCard 
              name="Pro"
              price="$99"
              description="Para empresas de logística en crecimiento con flotas activas."
              features={["Hasta 1,000 envíos/mes", "Rastreo GPS en tiempo real", "Soporte prioritario", "5 usuarios Admin", "Optimización de rutas"]}
              current={true}
              highlight={true}
            />
            <PlanCard 
              name="Empresarial"
              price="Personalizado"
              description="Funciones avanzadas para operaciones a gran escala."
              features={["Envíos ilimitados", "Integración API personalizada", "Soporte telefónico 24/7", "Usuarios ilimitados", "Gerente de cuenta dedicado"]}
              current={false}
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-zinc-900">Métodos de Pago</h2>
              <p className="text-sm text-zinc-500">Gestiona cómo pagas tu suscripción.</p>
            </div>
            <button className="text-sm font-medium text-zinc-900 hover:underline">
              Añadir Método
            </button>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between p-4 border border-zinc-200 rounded-lg bg-zinc-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-white border border-zinc-200 rounded flex items-center justify-center shadow-sm">
                  <CreditCard className="w-5 h-5 text-zinc-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900">Visa terminada en 4242</p>
                  <p className="text-xs text-zinc-500">Expira 12/2028</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-zinc-100 text-zinc-600">Predeterminado</span>
                <button className="text-sm text-zinc-500 hover:text-zinc-900">Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function PlanCard({ name, price, description, features, current, highlight }: { name: string, price: string, description: string, features: string[], current: boolean, highlight?: boolean }) {
  return (
    <div className={`relative bg-white rounded-xl border p-6 flex flex-col ${highlight ? 'border-zinc-900 shadow-md' : 'border-zinc-200 shadow-sm'}`}>
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
          Más Popular
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-zinc-900">{name}</h3>
        <p className="text-sm text-zinc-500 mt-1 h-10">{description}</p>
      </div>
      <div className="mb-6">
        <span className="text-3xl font-bold text-zinc-900 tracking-tight">{price}</span>
        {price !== "Personalizado" && <span className="text-sm text-zinc-500 font-medium">/mes</span>}
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
            <Check className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        className={`w-full py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm ${
          current 
            ? 'bg-zinc-100 text-zinc-500 cursor-default border border-zinc-200' 
            : highlight 
              ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
              : 'bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50'
        }`}
        disabled={current}
      >
        {current ? 'Plan Actual' : price === "Personalizado" ? 'Contactar Ventas' : 'Mejorar'}
      </button>
    </div>
  );
}
