// CompanyDataForm.tsx
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getCompanyFinancialData } from "@/lib/firebaseUtils";

interface FinancialData {
  activos?: number;
  expediente?: number;
  impuesto_renta?: number;
  ingresos_ventas?: number;
  n_empleados?: number;
  nombre?: string;
  patrimonio?: number;
  ruc?: string;
  utilidad_neta?: number;
  liquidez_corriente?: number;
  deuda_total?: number;
  gastos_financieros?: number;
  margen_bruto?: number;
  rent_neta_ventas?: number;
  roe?: number;
  roa?: number;
}

interface FinancialMetricsData {
  data: FinancialData | null;
  previousData: FinancialData | null;
}

interface BackendResponse {
  score: number;
  level: "low" | "medium" | "high";
  creditLimit: number;
  details: {
    nombre: string;
    ruc: string;
    activos: number;
    ingresos_ventas: number;
    utilidad_neta: number;
  };
}

interface CompanyDataFormProps {
  setFinancialData: React.Dispatch<React.SetStateAction<FinancialMetricsData | undefined>>;
  setRiskData: React.Dispatch<React.SetStateAction<BackendResponse | null>>;
  onDataLoaded?: () => void;
}

export const CompanyDataForm = ({ setFinancialData, setRiskData, onDataLoaded }: CompanyDataFormProps) => {
  const [ruc, setRuc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const sendRiskScoreRequest = async (financialData: FinancialData) => {
    // Limpiar datos para evitar null/undefined
    const safeFinancialData = {
      activos: financialData.activos ?? 0,
      expediente: financialData.expediente ?? 0,
      impuesto_renta: financialData.impuesto_renta ?? 0,
      ingresos_ventas: financialData.ingresos_ventas ?? 0,
      n_empleados: financialData.n_empleados ?? 0,
      nombre: financialData.nombre ?? "",
      patrimonio: financialData.patrimonio ?? 0,
      ruc: financialData.ruc ?? "",
      utilidad_neta: financialData.utilidad_neta ?? 0,
      liquidez_corriente: financialData.liquidez_corriente ?? 0,
      deuda_total: financialData.deuda_total ?? 0,
      gastos_financieros: financialData.gastos_financieros ?? 0,
      margen_bruto: financialData.margen_bruto ?? 0,
      rent_neta_ventas: financialData.rent_neta_ventas ?? 0,
      roe: financialData.roe ?? 0,
      roa: financialData.roa ?? 0,
    };

    try {
      const res = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ financialData: safeFinancialData }),
      });
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      const data = await res.json();
      setRiskData(data);
    } catch (e) {
      console.error("Error enviando al backend IA", e);
      setRiskData(null);
    }
  };

  const handleSearch = async () => {
    if (!ruc) {
      setError("Por favor ingrese un RUC válido.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const result = await getCompanyFinancialData(ruc);
      if (result) {
        setFinancialData({
          data: result.currentYearData,
          previousData: result.previousYearData,
        });
        if (onDataLoaded) onDataLoaded();
        toast({
          title: "Datos cargados",
          description: "Se encontraron datos para el RUC ingresado.",
        });

        if (result.currentYearData) {
          await sendRiskScoreRequest(result.currentYearData);
        } else {
          console.warn("No hay datos actuales para enviar al backend IA");
          setRiskData(null);
        }
      } else {
        setFinancialData(undefined);
        setRiskData(null);
        setError("No se encontró información para ese RUC.");
      }
    } catch (err) {
      setFinancialData(undefined);
      setRiskData(null);
      setError("Error al buscar datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 shadow-card mb-6">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Buscar Empresa por RUC</h3>

        <div className="space-y-4">
          <Label htmlFor="ruc">Número de RUC</Label>
          <Input
            id="ruc"
            value={ruc}
            onChange={(e) => setRuc(e.target.value)}
            placeholder="Ingrese el número de RUC"
          />
          <Button
            type="button"
            className="mt-2 w-full bg-gradient-primary text-white"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar"}
          </Button>
          {error && <p className="text-destructive mt-1">{error}</p>}
        </div>
      </div>
    </Card>
  );
};
