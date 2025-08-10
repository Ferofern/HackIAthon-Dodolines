import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";

interface FinancialData {
  activos: number | null | undefined;
  anio: number | null | undefined;
  expediente: number | null | undefined;
  impuesto_renta: number | null | undefined;
  ingresos_ventas: number | null | undefined;
  n_empleados: number | null | undefined;
  nombre: string;
  patrimonio: number | null | undefined;
  ruc: string;
  utilidad_neta: number | null | undefined;
}

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, change, icon }: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="p-4 shadow-card hover:shadow-elegant transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
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
        </div>
        <div className="bg-gradient-primary p-3 rounded-lg">{icon}</div>
      </div>
    </Card>
  );
};

interface FinancialMetricsProps {
  data?: FinancialData; // Ahora opcional para permitir que no haya datos inicialmente
  previousData?: Partial<FinancialData>; // Para cálculo de cambios, opcional
}

export const FinancialMetrics = ({ data, previousData }: FinancialMetricsProps) => {
  // Valores por defecto si no hay datos
  const safeData: FinancialData = {
    activos: 0,
    anio: 0,
    expediente: 0,
    impuesto_renta: 0,
    ingresos_ventas: 0,
    n_empleados: 0,
    nombre: "",
    patrimonio: 0,
    ruc: "",
    utilidad_neta: 0,
    ...data, // Sobrescribe con datos reales si existen
  };

  const safeNumber = (value: number | null | undefined) => (typeof value === "number" ? value : 0);

  const calcChange = (current: number, previous?: number) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const ingresosVentas = safeNumber(safeData.ingresos_ventas);
  const utilidadNeta = safeNumber(safeData.utilidad_neta);
  const activos = safeNumber(safeData.activos);
  const patrimonio = safeNumber(safeData.patrimonio);

  const metrics = [
    {
      title: "Monthly Revenue",
      value: `$${ingresosVentas.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: calcChange(ingresosVentas, safeNumber(previousData?.ingresos_ventas)),
      icon: <DollarSign className="w-6 h-6 text-white" />,
    },
    {
      title: "Cash Flow",
      value: `$${utilidadNeta.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: calcChange(utilidadNeta, safeNumber(previousData?.utilidad_neta)),
      icon: <Wallet className="w-6 h-6 text-white" />,
    },
    {
      title: "Total Assets",
      value: `$${activos.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: calcChange(activos, safeNumber(previousData?.activos)),
      icon: <TrendingUp className="w-6 h-6 text-white" />,
    },
    {
      title: "Debt Ratio",
      value: activos === 0 ? "0%" : `${(((activos - patrimonio) / activos) * 100).toFixed(1)}%`,
      change: 0,
      icon: <TrendingDown className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};
