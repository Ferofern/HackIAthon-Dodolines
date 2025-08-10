import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RiskScoreDisplayProps {
  score: number;
  level: 'low' | 'medium' | 'high';
  creditLimit: number;
}

export const RiskScoreDisplay = ({ score, level, creditLimit }: RiskScoreDisplayProps) => {
  const getScoreColor = () => {
    switch (level) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
    }
  };

  const getScoreBackground = () => {
    switch (level) {
      case 'low': return 'bg-gradient-success';
      case 'medium': return 'bg-gradient-warning';
      case 'high': return 'bg-gradient-risk';
    }
  };

  const getBadgeVariant = () => {
    switch (level) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Risk Score</h3>
        
        <div className="relative">
          <div className={`w-32 h-32 mx-auto rounded-full ${getScoreBackground()} flex items-center justify-center shadow-elegant`}>
            <span className={`text-4xl font-bold text-white`}>
              {score}
            </span>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <Badge variant={getBadgeVariant()} className="capitalize">
              {level} Risk
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Recommended Credit Limit</p>
          <p className="text-2xl font-bold text-primary">
            ${creditLimit.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};