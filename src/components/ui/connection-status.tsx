import { motion } from 'framer-motion';
import { Wifi, WifiOff, Loader2, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ConnectionStatus as ConnectionStatusType } from '@/types';
import { cn } from '@/lib/utils';

interface ConnectionStatusProps {
  status: ConnectionStatusType;
  className?: string;
}

export function ConnectionStatus({ status, className }: ConnectionStatusProps) {
  const getStatusIcon = () => {
    switch (status.state) {
      case 'connected':
        return Wifi;
      case 'connecting':
        return Loader2;
      case 'disconnected':
        return WifiOff;
      default:
        return WifiOff;
    }
  };

  const getStatusColor = () => {
    switch (status.state) {
      case 'connected':
        return 'success';
      case 'connecting':
        return 'warning';
      case 'disconnected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusText = () => {
    switch (status.state) {
      case 'connected':
        return 'Conectado';
      case 'connecting':
        return 'Conectando...';
      case 'disconnected':
        return 'Desconectado';
      default:
        return 'Desconhecido';
    }
  };

  const StatusIcon = getStatusIcon();
  const statusColor = getStatusColor();
  const statusText = getStatusText();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className={cn("hover-lift", className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Status da Conexão</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <StatusIcon 
                className={cn(
                  "h-6 w-6",
                  status.state === 'connecting' && "animate-spin",
                  status.state === 'connected' && "text-success animate-pulse-soft"
                )} 
              />
              <div>
                <Badge variant={statusColor as any} className="mb-1">
                  {statusText}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Última atualização: {formatTime(status.lastUpdate)}
                </p>
              </div>
            </div>
          </div>

          {status.state === 'connected' && (
            <div className="grid grid-cols-2 gap-4 pt-2 border-t">
              {status.latency && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Latência</p>
                  <p className="text-sm font-medium">{status.latency}ms</p>
                </div>
              )}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Tentativas</p>
                <p className="text-sm font-medium">{status.attempts}</p>
              </div>
            </div>
          )}

          {status.state === 'disconnected' && status.error && (
            <div className="p-2 bg-destructive/10 rounded-md">
              <p className="text-xs text-destructive">{status.error}</p>
            </div>
          )}

          {status.state === 'connecting' && (
            <div className="flex items-center justify-center py-2">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-warning rounded-full animate-bounce" />
                <div className="h-2 w-2 bg-warning rounded-full animate-bounce [animation-delay:0.1s]" />
                <div className="h-2 w-2 bg-warning rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}