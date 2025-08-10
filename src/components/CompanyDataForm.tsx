import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getCompanyFinancialData } from "@/lib/firebaseUtils";

import { FinancialMetrics } from "./FinancialMetrics";

interface CompanyData {
  companyName: string;
  ruc: string;
  industry: string;
  employees: string;
  yearsOperation: string;
  monthlyRevenue: string;
  socialMediaLinks: string;
  description: string;
}

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

export const CompanyDataForm = () => {
  const [formData, setFormData] = useState<CompanyData>({
    companyName: "",
    ruc: "",
    industry: "",
    employees: "",
    yearsOperation: "",
    monthlyRevenue: "",
    socialMediaLinks: "",
    description: "",
  });

  // Inicializar financialData con valores en cero para que al montar el componente muestre 0
  const [financialData, setFinancialData] = useState<FinancialData>({
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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    if (!formData.ruc) {
      setError("Por favor ingrese un RUC válido.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const data = await getCompanyFinancialData(formData.ruc);
      if (data) {
        setFormData((prev) => ({
          ...prev,
          companyName: data.nombre || "",
          employees: data.n_empleados ? data.n_empleados.toString() : "",
          monthlyRevenue: data.ingresos_ventas ? data.ingresos_ventas.toString() : "",
          ruc: data.ruc || prev.ruc,
        }));

        setFinancialData({
          activos: data.activos ?? 0,
          anio: data.anio ?? 0,
          expediente: data.expediente ?? 0,
          impuesto_renta: data.impuesto_renta ?? 0,
          ingresos_ventas: data.ingresos_ventas ?? 0,
          n_empleados: data.n_empleados ?? 0,
          nombre: data.nombre || "",
          patrimonio: data.patrimonio ?? 0,
          ruc: data.ruc || "",
          utilidad_neta: data.utilidad_neta ?? 0,
        });

        setError(null);
      } else {
        setError("No se encontró información para ese RUC.");
        setFinancialData({
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
        });
      }
    } catch (err) {
      setError("Error al buscar datos.");
      setFinancialData({
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
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Datos de la empresa guardados",
      description: "La información de su empresa ha sido actualizada correctamente.",
    });
  };

  return (
    <>
      <Card className="p-6 shadow-card mb-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Información de la Empresa</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nombre de la Empresa</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Ingrese el nombre de la empresa"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ruc">Número de RUC</Label>
                <Input
                  id="ruc"
                  value={formData.ruc}
                  onChange={(e) => handleInputChange("ruc", e.target.value)}
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

            {/* Otros campos opcionales */}

          </form>
        </div>
      </Card>

      <FinancialMetrics data={financialData} />
    </>
  );
};