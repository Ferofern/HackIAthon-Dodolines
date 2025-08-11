//RiskScoreDisplay.tsx
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FinancialData {
  activos: number;
  anio?: number;
  expediente?: number;
  impuesto_renta?: number;
  ingresos_ventas: number;
  n_empleados?: number;
  nombre: string;
  patrimonio?: number;
  ruc: string;
  utilidad_neta: number;
}

interface RiskScoreDisplayProps {
  ruc: string;
}

async function fetchFinancialDataFromApi(ruc: string): Promise<FinancialData | null> {
  try {
    const response = await fetch(`https://tu-backend.com/api/financial-data/${ruc}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch {
    return null;
  }
}

export const RiskScoreDisplay = ({ ruc }: RiskScoreDisplayProps) => {
  const [data, setData] = useState<FinancialData | null>(null);

  useEffect(() => {
    if (!ruc) return;

    fetchFinancialDataFromApi(ruc).then((result) => {
      if (result) {
        setData(result);
      } else {
        setData(null);
      }
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

  const score = data ? calculateScore(data) : 0;
  const level = determineLevel(score);
  const creditLimit = data ? data.activos * 0.1 : 0;

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
        <p className="font-medium">{data?.nombre ?? "Cargando..."}</p>

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
