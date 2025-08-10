import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, TrendingUp } from "lucide-react";

interface SimulationData {
  revenue: number;
  cashFlow: number;
  socialRating: number;
  paymentReliability: number;
}

export const RiskSimulator = () => {
  const [simulation, setSimulation] = useState<SimulationData>({
    revenue: 85000,
    cashFlow: 23000,
    socialRating: 4.2,
    paymentReliability: 85
  });

  const [originalScore] = useState(72);
  
  // Calculate new risk score based on simulation parameters
  const calculateRiskScore = () => {
    const revenueScore = Math.min((simulation.revenue / 100000) * 30, 30);
    const cashFlowScore = Math.min((simulation.cashFlow / 30000) * 25, 25);
    const socialScore = (simulation.socialRating / 5) * 20;
    const paymentScore = (simulation.paymentReliability / 100) * 25;
    
    return Math.round(revenueScore + cashFlowScore + socialScore + paymentScore);
  };

  const newScore = calculateRiskScore();
  const scoreDifference = newScore - originalScore;
  const newCreditLimit = Math.round((newScore / 100) * 200000);

  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'low';
    if (score >= 60) return 'medium';
    return 'high';
  };

  const resetSimulation = () => {
    setSimulation({
      revenue: 85000,
      cashFlow: 23000,
      socialRating: 4.2,
      paymentReliability: 85
    });
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Risk Scenario Simulator</h3>
          <Button variant="outline" size="sm" onClick={resetSimulation}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Monthly Revenue: ${simulation.revenue.toLocaleString()}</Label>
              <Slider
                value={[simulation.revenue]}
                onValueChange={([value]) => setSimulation(prev => ({ ...prev, revenue: value }))}
                max={150000}
                min={20000}
                step={5000}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Cash Flow: ${simulation.cashFlow.toLocaleString()}</Label>
              <Slider
                value={[simulation.cashFlow]}
                onValueChange={([value]) => setSimulation(prev => ({ ...prev, cashFlow: value }))}
                max={50000}
                min={5000}
                step={1000}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Social Media Rating: {simulation.socialRating.toFixed(1)}/5.0</Label>
              <Slider
                value={[simulation.socialRating * 10]}
                onValueChange={([value]) => setSimulation(prev => ({ ...prev, socialRating: value / 10 }))}
                max={50}
                min={10}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Payment Reliability: {simulation.paymentReliability}%</Label>
              <Slider
                value={[simulation.paymentReliability]}
                onValueChange={([value]) => setSimulation(prev => ({ ...prev, paymentReliability: value }))}
                max={100}
                min={50}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-secondary p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-3">Simulation Results</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Original Score:</span>
                  <span className="font-medium">{originalScore}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">New Score:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">{newScore}</span>
                    <Badge variant={getRiskLevel(newScore) === 'low' ? 'default' : getRiskLevel(newScore) === 'medium' ? 'secondary' : 'destructive'}>
                      {getRiskLevel(newScore)} risk
                    </Badge>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Score Change:</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`w-4 h-4 ${scoreDifference >= 0 ? 'text-success' : 'text-destructive'}`} />
                    <span className={`font-medium ${scoreDifference >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {scoreDifference >= 0 ? '+' : ''}{scoreDifference}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm text-muted-foreground">New Credit Limit:</span>
                  <span className="font-bold text-primary">${newCreditLimit.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h5 className="font-medium text-foreground mb-2">Impact Analysis</h5>
              <div className="space-y-2 text-sm">
                {scoreDifference > 5 && (
                  <p className="text-success">• Significant improvement in risk profile</p>
                )}
                {scoreDifference > 0 && scoreDifference <= 5 && (
                  <p className="text-warning">• Moderate improvement in risk score</p>
                )}
                {scoreDifference < 0 && (
                  <p className="text-destructive">• Risk score has decreased</p>
                )}
                {simulation.socialRating >= 4.5 && (
                  <p className="text-success">• Excellent social media reputation</p>
                )}
                {simulation.paymentReliability >= 90 && (
                  <p className="text-success">• Outstanding payment reliability</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};