// ParentComponent.tsx
import React, { useState, useEffect } from "react";
import { CompanyDataForm } from "./CompanyDataForm";
import { FinancialMetrics } from "./FinancialMetrics";
import { RiskScoreDisplay } from "./RiskScoreDisplay";
import { RiskSimulator } from "./RiskSimulator";

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

export const ParentComponent = () => {
  const [financialData, setFinancialData] = useState(null);
  const [backendResponse, setBackendResponse] = useState<BackendResponse | null>(null);
  const [rucParaScore, setRucParaScore] = useState<string>("");

  useEffect(() => {
    if (!rucParaScore) return;

    async function fetchRiskScore() {
      try {
        const response = await fetch(`/api/risk-score?ruc=${rucParaScore}`);
        if (!response.ok) throw new Error("Error al obtener score");
        const data: BackendResponse = await response.json();
        setBackendResponse(data);
      } catch (error) {
        console.error(error);
        setBackendResponse(null);
      }
    }

    fetchRiskScore();
  }, [rucParaScore]);

  const handleRiskScoreRequest = (ruc: string) => {
    setRucParaScore(ruc);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Consulta Financiera</h1>
      <CompanyDataForm
        setFinancialData={setFinancialData}
        onRiskScoreRequest={handleRiskScoreRequest}
      />
      <FinancialMetrics
        data={financialData?.data ?? undefined}
        previousData={financialData?.previousData ?? undefined}
      />

      {/* Pasamos la misma data al display y simulador */}
      {backendResponse && <RiskScoreDisplay data={backendResponse} />}
      {backendResponse && <RiskSimulator initialData={backendResponse} />}
    </div>
  );
};
