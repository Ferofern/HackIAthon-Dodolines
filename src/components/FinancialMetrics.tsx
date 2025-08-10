// components/FinancialMetrics.tsx
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";

interface FinancialData {
  activos: number | null | undefined;
  patrimonio: number | null | undefined;
  ingresos_ventas: number | null | undefined;
  utilidad_neta: number | null | undefined;
  impuesto_renta: number | null | undefined;
  n_empleados: number | null | undefined;
  ruc: string;
  nombre: string;
}

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;  // Opcional, algunos indicadores no tienen cambio
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, change = 0, icon }: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="p-4 shadow-card hover:shadow-elegant transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change !== 0 && (
            <div className="flex items-center space-x-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className={`text-sm ${isPositive ? "text-success" : "text-destructive"}`}>
                {isPositive ? "+" : ""}
                {change.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        <div className="bg-gradient-primary p-3 rounded-lg">{icon}</div>
      </div>
    </Card>
  );
};

interface FinancialMetricsProps {
  data?: FinancialData;
  previousData?: Partial<FinancialData>;
}

export const FinancialMetrics = ({ data, previousData }: FinancialMetricsProps) => {
  const safeNumber = (value: number | null | undefined) => (typeof value === "number" ? value : 0);

  const calcChange = (current: number, previous?: number) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Valores seguros (0 si no existe)
  const ingresosVentas = safeNumber(data?.ingresos_ventas);
  const utilidadNeta = safeNumber(data?.utilidad_neta);
  const activos = safeNumber(data?.activos);
  const patrimonio = safeNumber(data?.patrimonio);

  // Indicadores calculados

  // Margen neto = utilidad_neta / ingresos_ventas * 100 (indica rentabilidad)
  const margenNeto = ingresosVentas === 0 ? 0 : (utilidadNeta / ingresosVentas) * 100;

  // Razón de endeudamiento = (activos - patrimonio) / activos * 100
  const razonEndeudamiento = activos === 0 ? 0 : ((activos - patrimonio) / activos) * 100;

  // Liquidez simple (aquí no hay info de pasivos corrientes ni activos corrientes, 
  // pero podrías agregar si tienes datos)
  // Por ahora omitido.

  // Cambios respecto a datos previos (si disponibles)
  const changeIngresos = calcChange(ingresosVentas, safeNumber(previousData?.ingresos_ventas));
  const changeUtilidad = calcChange(utilidadNeta, safeNumber(previousData?.utilidad_neta));
  const changeActivos = calcChange(activos, safeNumber(previousData?.activos));

  const metrics: MetricCardProps[] = [
    {
      title: "Ventas Mensuales",
      value: `$${ingresosVentas.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: changeIngresos,
      icon: <DollarSign className="w-6 h-6 text-white" />,
    },
    {
      title: "Flujo de Caja (Utilidad Neta)",
      value: `$${utilidadNeta.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: changeUtilidad,
      icon: <Wallet className="w-6 h-6 text-white" />,
    },
    {
      title: "Activos Totales",
      value: `$${activos.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: changeActivos,
      icon: <TrendingUp className="w-6 h-6 text-white" />,
    },
    {
      title: "Margen Neto (%)",
      value: `${margenNeto.toFixed(2)}%`,
      icon: <TrendingUp className={`w-6 h-6 text-white ${margenNeto >= 0 ? "text-success" : "text-destructive"}`} />,
    },
    {
      title: "Razón de Endeudamiento (%)",
      value: `${razonEndeudamiento.toFixed(2)}%`,
      icon: <TrendingDown className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};
