import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Inbox, Users, Users2 } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { QRCard } from '@/components/ui/qr-card';
import { ConnectionStatus } from '@/components/ui/connection-status';
import { MessageVolumeChart } from '@/components/charts/message-volume-chart';
import { useAppStore } from '@/store/useAppStore';
import { useWebSocket } from '@/hooks/useWebSocket';
import { generateRandomMessage } from '@/lib/mock-data';

export default function Dashboard() {
  const { 
    metrics, 
    connectionStatus, 
    qrCode, 
    analytics,
    updateMetrics,
    setConnectionStatus,
    addMessage,
    addNotification
  } = useAppStore();

  // WebSocket connection for real-time updates
  const { isConnected } = useWebSocket({
    onMessage: (event) => {
      switch (event.type) {
        case 'connection_status':
          setConnectionStatus(event.data);
          break;
        case 'message_count':
          // Update metrics with new message count
          const newMetrics = metrics.map(metric => {
            if (metric.id === 'messages_received') {
              return { ...metric, value: metric.value + event.data.count };
            }
            return metric;
          });
          updateMetrics(newMetrics);
          break;
        case 'new_message':
          const newMessage = generateRandomMessage();
          addMessage(newMessage);
          addNotification({
            id: Math.random().toString(36).substr(2, 9),
            title: 'Nova mensagem recebida',
            description: `De: ${newMessage.from}`,
            timestamp: Date.now(),
            read: false,
            type: 'info'
          });
          break;
      }
    },
    onConnect: () => {
      setConnectionStatus({ state: 'connected', lastUpdate: Date.now() });
    },
    onDisconnect: () => {
      setConnectionStatus({ state: 'disconnected', lastUpdate: Date.now() });
    }
  });

  const handleRefreshQR = () => {
    // Simulate QR refresh
    console.log('Refreshing QR code...');
  };

  const metricIcons = {
    messages_sent: Send,
    messages_received: Inbox,
    active_contacts: Users,
    active_groups: Users2
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      
      <div id="main-content">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do WhatsApp Manager e métricas em tempo real
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {metrics.map((metric, index) => {
            const IconComponent = metricIcons[metric.id as keyof typeof metricIcons];
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <StatCard
                  title={metric.label}
                  value={metric.value}
                  delta={metric.delta}
                  trend={metric.trend}
                  icon={IconComponent}
                  className="hover-lift"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <MessageVolumeChart 
              data={analytics.messageVolume}
              className="hover-lift"
            />
          </div>
          
          {/* Right Column - Status Cards */}
          <div className="space-y-6">
            <QRCard
              qrData={qrCode}
              onRefresh={handleRefreshQR}
              className="hover-lift"
            />
            
            <ConnectionStatus
              status={connectionStatus}
              className="hover-lift"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-8 p-6 rounded-lg border bg-card"
        >
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-md bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer">
              <Send className="h-8 w-8 text-primary mb-2" />
              <h4 className="font-medium">Enviar Mensagem</h4>
              <p className="text-sm text-muted-foreground">Envie uma nova mensagem para um contato</p>
            </div>
            
            <div className="p-4 rounded-md bg-success/5 border border-success/20 hover:bg-success/10 transition-colors cursor-pointer">
              <Users className="h-8 w-8 text-success mb-2" />
              <h4 className="font-medium">Adicionar Contato</h4>
              <p className="text-sm text-muted-foreground">Cadastre um novo contato na lista</p>
            </div>
            
            <div className="p-4 rounded-md bg-warning/5 border border-warning/20 hover:bg-warning/10 transition-colors cursor-pointer">
              <Users2 className="h-8 w-8 text-warning mb-2" />
              <h4 className="font-medium">Criar Grupo</h4>
              <p className="text-sm text-muted-foreground">Crie um novo grupo de WhatsApp</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}