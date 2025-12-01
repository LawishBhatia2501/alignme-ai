import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PostureStatsProps {
  historyData: Array<{
    timestamp: number;
    neck: number;
    shoulder: number;
    back: number;
    status: string;
  }>;
  goodCount: number;
  okayCount: number;
  badCount: number;
}

const PostureStats = ({ historyData, goodCount, okayCount, badCount }: PostureStatsProps) => {
  const total = goodCount + okayCount + badCount;
  const goodPercentage = total > 0 ? Math.round((goodCount / total) * 100) : 0;
  const okayPercentage = total > 0 ? Math.round((okayCount / total) * 100) : 0;
  const badPercentage = total > 0 ? Math.round((badCount / total) * 100) : 0;

  const chartData = useMemo(() => {
    // Take last 20 data points for the chart
    return historyData.slice(-20).map((item, index) => ({
      time: index + 1,
      neck: item.neck,
      shoulder: item.shoulder,
      back: item.back,
    }));
  }, [historyData]);

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-success">{goodPercentage}%</div>
            <div className="text-xs text-muted-foreground mt-1">Good Posture</div>
            <div className="text-xs text-muted-foreground">({goodCount} frames)</div>
          </CardContent>
        </Card>
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-warning">{okayPercentage}%</div>
            <div className="text-xs text-muted-foreground mt-1">Okay Posture</div>
            <div className="text-xs text-muted-foreground">({okayCount} frames)</div>
          </CardContent>
        </Card>
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-destructive">{badPercentage}%</div>
            <div className="text-xs text-muted-foreground mt-1">Bad Posture</div>
            <div className="text-xs text-muted-foreground">({badCount} frames)</div>
          </CardContent>
        </Card>
      </div>

      {/* Angle Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Real-time Angle Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
                domain={[0, 200]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="neck" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
                name="Neck Angle"
              />
              <Line 
                type="monotone" 
                dataKey="back" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                dot={false}
                name="Back Angle"
              />
              <Line 
                type="monotone" 
                dataKey="shoulder" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                dot={false}
                name="Shoulder Level"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostureStats;
