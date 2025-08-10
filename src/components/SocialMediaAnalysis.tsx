import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, ThumbsUp, MessageCircle, Users } from "lucide-react";

export const SocialMediaAnalysis = () => {
  const socialMetrics = [
    {
      platform: "Facebook",
      followers: 2450,
      engagement: 85,
      sentiment: "positive",
      rating: 4.2
    },
    {
      platform: "Instagram",
      followers: 1850,
      engagement: 92,
      sentiment: "positive",
      rating: 4.5
    },
    {
      platform: "LinkedIn",
      followers: 890,
      engagement: 78,
      sentiment: "neutral",
      rating: 4.0
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'success';
      case 'neutral': return 'warning';
      case 'negative': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Social Media Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialMetrics.map((metric, index) => (
            <div key={index} className="p-4 bg-secondary rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">{metric.platform}</h4>
                <Badge variant={getSentimentColor(metric.sentiment) as any}>
                  {metric.sentiment}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {metric.followers.toLocaleString()} followers
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium">{metric.rating}/5.0</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Engagement</span>
                    <span className="font-medium">{metric.engagement}%</span>
                  </div>
                  <Progress value={metric.engagement} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ThumbsUp className="w-5 h-5 text-success" />
            </div>
            <div className="text-2xl font-bold text-foreground">94%</div>
            <div className="text-sm text-muted-foreground">Positive Reviews</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">156</div>
            <div className="text-sm text-muted-foreground">Recent Comments</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-warning" />
            </div>
            <div className="text-2xl font-bold text-foreground">4.2</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div className="text-2xl font-bold text-foreground">5.2K</div>
            <div className="text-sm text-muted-foreground">Total Reach</div>
          </div>
        </div>
      </div>
    </Card>
  );
};