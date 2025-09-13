import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  delta?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
  className?: string;
  isLoading?: boolean;
}

export function StatCard({ 
  title, 
  value, 
  delta, 
  trend = 'neutral', 
  icon: Icon,
  className,
  isLoading = false
}: StatCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return TrendingUp;
      case 'down':
        return TrendingDown;
      default:
        return Minus;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const TrendIcon = getTrendIcon();

  if (isLoading) {
    return (
      <Card className={cn("hover-lift", className)}>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-6 w-6 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-8 w-16 bg-muted animate-pulse rounded" />
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("hover-lift cursor-pointer", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            {Icon && (
              <Icon className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
              {delta !== undefined && (
                <div className="flex items-center space-x-1 text-xs">
                  <TrendIcon className={cn("h-3 w-3", getTrendColor())} />
                  <span className={getTrendColor()}>
                    {delta > 0 ? '+' : ''}{delta}%
                  </span>
                  <span className="text-muted-foreground">vs. último período</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}