import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface MessageVolumeChartProps {
  data: { date: string; sent: number; received: number }[];
  className?: string;
}

export function MessageVolumeChart({ data, className }: MessageVolumeChartProps) {
  const totalSent = data.reduce((acc, day) => acc + day.sent, 0);
  const totalReceived = data.reduce((acc, day) => acc + day.received, 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="inline-block w-3 h-3 bg-primary rounded mr-2"></span>
              Enviadas: {payload[0]?.value}
            </p>
            <p className="text-sm">
              <span className="inline-block w-3 h-3 bg-success rounded mr-2"></span>
              Recebidas: {payload[1]?.value}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Volume de Mensagens</span>
          </CardTitle>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span>Enviadas: {totalSent}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span>Recebidas: {totalReceived}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs text-muted-foreground"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                />
                <YAxis className="text-xs text-muted-foreground" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sent"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="url(#colorSent)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="received"
                  stackId="1"
                  stroke="hsl(var(--success))"
                  fill="url(#colorReceived)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}