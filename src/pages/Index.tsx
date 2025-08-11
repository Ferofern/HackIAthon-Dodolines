import { useState, useEffect } from "react";
import { RiskScoreDisplay } from "@/components/RiskScoreDisplay";
import { FinancialMetrics } from "@/components/FinancialMetrics";
import { SocialMediaAnalysis } from "@/components/SocialMediaAnalysis";
import { FileUpload } from "@/components/FileUpload";
import { CompanyDataForm } from "@/components/CompanyDataForm";
import { RiskSimulator } from "@/components/RiskSimulator";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, BarChart3, Share2, Upload, Zap } from "lucide-react";

const Index = () => {
  const [financialData, setFinancialData] = useState(undefined);
  const [selectedYear, setSelectedYear] = useState<"2023" | "2024">("2024");

  // Estado para pestaña activa
  const [tabValue, setTabValue] = useState("data");

  // Cambia a dashboard al cargar datos
  useEffect(() => {
    if (financialData) {
      setTabValue("dashboard");
    }
  }, [financialData]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SME Risk Evaluator</h1>
                <p className="text-sm text-muted-foreground">
                  AI-Powered Credit Risk Assessment for Ecuador
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Empresa Demo S.A.</p>
              <p className="text-xs text-muted-foreground">RUC: 1791234567001</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <Tabs value={tabValue} onValueChange={setTabValue} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="data" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Data Input</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Social Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="simulator" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Simulator</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="data" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FileUpload />
              <CompanyDataForm
                setFinancialData={setFinancialData}
                onDataLoaded={() => setTabValue("dashboard")}
              />
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded ${
                    selectedYear === "2024" ? "bg-gradient-primary text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedYear("2024")}
                >
                  Año 2024
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    selectedYear === "2023" ? "bg-gradient-primary text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedYear("2023")}
                >
                  Año 2023
                </button>
              </div>

              <div className="text-lg font-semibold text-foreground">
                {financialData?.data?.nombre ?? ""}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <RiskScoreDisplay score={72} level="medium" creditLimit={144000} />
              </div>

              <div className="lg:col-span-2">
                <Card className="p-6 shadow-card h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Key Risk Factors</h3>
                  {/* Contenido omitido para brevedad */}
                </Card>
              </div>
            </div>

            <FinancialMetrics
              data={selectedYear === "2024" ? financialData?.data : financialData?.previousData}
              previousData={selectedYear === "2024" ? financialData?.previousData : undefined}
            />
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <SocialMediaAnalysis />
          </TabsContent>

          <TabsContent value="simulator" className="space-y-6">
            <RiskSimulator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
