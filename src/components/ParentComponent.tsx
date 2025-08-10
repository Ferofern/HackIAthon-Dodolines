// ParentComponent.tsx
import React, { useState } from "react";
import { CompanyDataForm } from "./CompanyDataForm";
import { FinancialMetrics } from "./FinancialMetrics";

export const ParentComponent = () => {
  const [financialData, setFinancialData] = useState<any | null>(null);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Consulta Financiera</h1>
      <CompanyDataForm setFinancialData={setFinancialData} />
      <FinancialMetrics data={financialData} />
    </div>
  );
};
