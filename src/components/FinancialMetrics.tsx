import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, change, icon }: MetricCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card className="p-4 shadow-card hover:shadow-elegant transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
            <span className={`text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? '+' : ''}{change}%
            </span>
          </div>
        </div>
        <div className="bg-gradient-primary p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export const FinancialMetrics = () => {
  const metrics = [
    {
      title: "Monthly Revenue",
      value: "$85,000",
      change: 12.5,
      icon: <DollarSign className="w-6 h-6 text-white" />
    },
    {
      title: "Cash Flow",
      value: "$23,000",
      change: 8.2,
      icon: <Wallet className="w-6 h-6 text-white" />
    },
    {
      title: "Total Assets",
      value: "$450,000",
      change: 5.1,
      icon: <TrendingUp className="w-6 h-6 text-white" />
    },
    {
      title: "Debt Ratio",
      value: "32%",
      change: -2.3,
      icon: <TrendingDown className="w-6 h-6 text-white" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};