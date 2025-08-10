import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCompanyFinancialData } from "@/lib/firebaseUtils";

interface FinancialData {
  activos: number;
  anio: number;
  expediente: number;
  impuesto_renta: number;
  ingresos_ventas: number;
  n_empleados: number;
  nombre: string;
  patrimonio: number;
  ruc: string;
  utilidad_neta: number;
}

interface RiskScoreDisplayProps {
  ruc: string;
}

export const RiskScoreDisplay = ({ ruc }: RiskScoreDisplayProps) => {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ruc) return;

    setLoading(true);
    setError(null);

    getCompanyFinancialData(ruc)
      .then((result) => {
        if (result) {
          setData(result);
        } else {
          setError("No se encontró información para ese RUC.");
        }
      })
      .catch(() => {
        setError("Error al cargar datos de Firebase.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ruc]);

  const calculateScore = (d: FinancialData) => {
    if (!d.ingresos_ventas) return 0;
    const ratio = d.utilidad_neta / d.ingresos_ventas;
    if (ratio > 0.2) return 90;
    if (ratio > 0.1) return 70;
    if (ratio > 0) return 50;
    return 30;
  };

  const determineLevel = (score: number): "low" | "medium" | "high" => {
    if (score >= 80) return "low";
    if (score >= 50) return "medium";
    return "high";
  };

  if (loading) {
    return (
      <Card className="p-6 shadow-card text-center">
        <p>Cargando datos financieros...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 shadow-card text-center text-destructive">
        <p>{error}</p>
      </Card>
    );
  }

  if (!data) return null;

  const score = calculateScore(data);
  const level = determineLevel(score);
  const creditLimit = data.activos * 0.1;

  const getScoreColor = () => {
    switch (level) {
      case "low":
        return "text-success";
      case "medium":
        return "text-warning";
      case "high":
        return "text-destructive";
    }
  };

  const getScoreBackground = () => {
    switch (level) {
      case "low":
        return "bg-gradient-success";
      case "medium":
        return "bg-gradient-warning";
      case "high":
        return "bg-gradient-risk";
    }
  };

  const getBadgeVariant = () => {
    switch (level) {
      case "low":
        return "default";
      case "medium":
        return "secondary";
      case "high":
        return "destructive";
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Puntaje de Riesgo</h3>
        <p className="font-medium">{data.nombre}</p>

        <div className="relative">
          <div
            className={`w-32 h-32 mx-auto rounded-full ${getScoreBackground()} flex items-center justify-center shadow-elegant`}
          >
            <span className="text-4xl font-bold text-white">{score}</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <Badge variant={getBadgeVariant()} className="capitalize">
              {level} Riesgo
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Límite de Crédito Recomendado</p>
          <p className="text-2xl font-bold text-primary">${creditLimit.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
};
