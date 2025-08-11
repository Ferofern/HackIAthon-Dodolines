// ParentComponent.tsx
import React, { useState } from "react";
import { CompanyDataForm } from "./CompanyDataForm";
import { FinancialMetrics } from "./FinancialMetrics";
import { RiskScoreDisplay } from "./RiskScoreDisplay";

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

export const ParentComponent = () => {
  const [financialData, setFinancialData] = useState<FinancialMetricsData | null>(null);
  const [rucParaScore, setRucParaScore] = useState<string>("");

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
      {rucParaScore && <RiskScoreDisplay ruc={rucParaScore} />}
    </div>
  );
};
