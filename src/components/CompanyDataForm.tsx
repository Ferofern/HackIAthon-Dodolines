//CompanyDataForm.tsx
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

interface CompanyDataFormProps {
  setFinancialData: React.Dispatch<React.SetStateAction<FinancialMetricsData | undefined>>;
}

export const CompanyDataForm = ({ setFinancialData }: CompanyDataFormProps) => {
  const [ruc, setRuc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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
        setError(null);
        toast({
          title: "Datos cargados",
          description: "Se encontraron datos para el RUC ingresado.",
        });
      } else {
        setFinancialData(undefined);
        setError("No se encontró información para ese RUC.");
      }
    } catch (err) {
      setFinancialData(undefined);
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
