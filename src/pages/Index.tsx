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
                <p className="text-sm text-muted-foreground">AI-Powered Credit Risk Assessment for Ecuador</p>
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
        <Tabs defaultValue="data" className="space-y-6">
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
              <CompanyDataForm />
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Risk Score - Takes up 1 column */}
              <div>
                <RiskScoreDisplay 
                  score={72} 
                  level="medium" 
                  creditLimit={144000} 
                />
              </div>

              {/* Key Factors - Takes up 2 columns */}
              <div className="lg:col-span-2">
                <Card className="p-6 shadow-card h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Key Risk Factors</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="text-foreground">Financial Performance</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-border rounded-full h-2">
                          <div className="bg-gradient-success h-2 rounded-full" style={{width: '78%'}}></div>
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="text-foreground">Online Reputation</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-border rounded-full h-2">
                          <div className="bg-gradient-success h-2 rounded-full" style={{width: '92%'}}></div>
                        </div>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="text-foreground">Payment History</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-border rounded-full h-2">
                          <div className="bg-gradient-warning h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="text-foreground">Industry Comparison</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-border rounded-full h-2">
                          <div className="bg-gradient-primary h-2 rounded-full" style={{width: '84%'}}></div>
                        </div>
                        <span className="text-sm font-medium">84%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <FinancialMetrics />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Risk Assessment Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Overall Risk Level:</span>
                    <span className="font-medium text-warning">Medium Risk</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Recommended Action:</span>
                    <span className="font-medium text-success">Approve with conditions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Next Review:</span>
                    <span className="font-medium">6 months</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Interest Rate Range:</span>
                    <span className="font-medium">12% - 15%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Improvement Recommendations</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-sm text-foreground font-medium">• Improve payment punctuality to suppliers</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-sm text-foreground font-medium">• Increase social media engagement</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-sm text-foreground font-medium">• Maintain current revenue growth trend</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-sm text-foreground font-medium">• Document formal credit references</p>
                  </div>
                </div>
              </Card>
            </div>
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
