import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface RiskScoreDisplayProps {
  data: BackendResponse | null;
}

export const RiskScoreDisplay = ({ data }: RiskScoreDisplayProps) => {
  if (!data) {
    return (
      <Card className="p-6 shadow-card text-center text-muted-foreground">
        Cargando puntaje de riesgo...
      </Card>
    );
  }

  const getScoreBackground = () => {
    switch (data.level) {
      case "low":
        return "bg-gradient-success";
      case "medium":
        return "bg-gradient-warning";
      case "high":
        return "bg-gradient-risk";
    }
  };

  const getBadgeVariant = () => {
    switch (data.level) {
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
        <p className="font-medium">{data.details.nombre}</p>

        <div className="relative">
          <div
            className={`w-32 h-32 mx-auto rounded-full ${getScoreBackground()} flex items-center justify-center shadow-elegant`}
          >
            <span className="text-4xl font-bold text-white">{data.score}</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <Badge variant={getBadgeVariant()} className="capitalize">
              {data.level} Riesgo
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Límite de Crédito Recomendado</p>
          <p className="text-2xl font-bold text-primary">
            ${data.creditLimit.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};
