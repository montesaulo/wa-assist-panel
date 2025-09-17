import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Upload, 
  Calendar, 
  Shield, 
  BarChart3, 
  Bot, 
  Play, 
  Pause, 
  Plus,
  FileText,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Download,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

// Mock data for campaigns
const mockCampaigns = [
  {
    id: '1',
    name: 'Promoção Black Friday',
    status: 'active' as const,
    template: 'Olá {{nome}}! Aproveite nossa super promoção...',
    contacts: [],
    scheduledAt: Date.now() + 86400000,
    createdAt: Date.now() - 86400000,
    sentCount: 1250,
    deliveredCount: 1180,
    failedCount: 70,
    openRate: 85.2,
    clickRate: 12.8,
    antiBlockSettings: {
      enabled: true,
      delayBetweenMessages: 30,
      messagesPerHour: 120,
      randomizeDelay: true,
      useProxies: false,
      rotateNumbers: false,
      respectBusinessHours: true,
      businessHours: { start: '09:00', end: '18:00', timezone: 'America/Sao_Paulo' }
    }
  },
  {
    id: '2',
    name: 'Lembrete de Consulta',
    status: 'scheduled' as const,
    template: 'Oi {{nome}}, lembrando da sua consulta...',
    contacts: [],
    scheduledAt: Date.now() + 172800000,
    createdAt: Date.now() - 3600000,
    sentCount: 0,
    deliveredCount: 0,
    failedCount: 0,
    openRate: 0,
    clickRate: 0,
    antiBlockSettings: {
      enabled: true,
      delayBetweenMessages: 45,
      messagesPerHour: 80,
      randomizeDelay: true,
      useProxies: false,
      rotateNumbers: false,
      respectBusinessHours: true,
      businessHours: { start: '08:00', end: '17:00', timezone: 'America/Sao_Paulo' }
    }
  }
];

const mockTemplates = [
  {
    id: '1',
    name: 'Promoção Padrão',
    content: 'Olá {{nome}}! Temos uma oferta especial para você: {{oferta}}. Válida até {{data_limite}}!',
    variables: ['nome', 'oferta', 'data_limite'],
    category: 'marketing' as const,
    createdAt: Date.now() - 86400000,
    isAI: false
  },
  {
    id: '2',
    name: 'Lembrete Consulta (IA)',
    content: 'Oi {{nome}}! Este é um lembrete amigável sobre sua consulta em {{data_consulta}} às {{hora_consulta}}.',
    variables: ['nome', 'data_consulta', 'hora_consulta'],
    category: 'notification' as const,
    createdAt: Date.now() - 3600000,
    isAI: true
  }
];

export default function Disparos() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [newTemplate, setNewTemplate] = useState('');
  const [delayBetweenMessages, setDelayBetweenMessages] = useState([30]);
  const [messagesPerHour, setMessagesPerHour] = useState([120]);
  const [antiBlockEnabled, setAntiBlockEnabled] = useState(true);
  const [randomizeDelay, setRandomizeDelay] = useState(true);
  const [respectBusinessHours, setRespectBusinessHours] = useState(true);

  const { contacts } = useAppStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'scheduled':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-primary text-primary-foreground';
      case 'paused':
        return 'bg-muted text-muted-foreground';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativa';
      case 'scheduled':
        return 'Agendada';
      case 'completed':
        return 'Concluída';
      case 'paused':
        return 'Pausada';
      case 'failed':
        return 'Falhou';
      case 'draft':
        return 'Rascunho';
      default:
        return status;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate metrics
  const totalSent = mockCampaigns.reduce((sum, campaign) => sum + campaign.sentCount, 0);
  const totalDelivered = mockCampaigns.reduce((sum, campaign) => sum + campaign.deliveredCount, 0);
  const totalFailed = mockCampaigns.reduce((sum, campaign) => sum + campaign.failedCount, 0);
  const avgOpenRate = mockCampaigns.reduce((sum, campaign) => sum + campaign.openRate, 0) / mockCampaigns.length;
  
  const activeCampaigns = mockCampaigns.filter(c => c.status === 'active').length;
  const scheduledCampaigns = mockCampaigns.filter(c => c.status === 'scheduled').length;

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Disparos em Massa
              </h1>
              <p className="text-muted-foreground">
                Gerencie campanhas de mensagens em massa com proteção anti-bloqueio
              </p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Campanha
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importar Contatos
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Section 1: Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card/60 backdrop-blur-md border-t-2 border-t-primary/20 hover:scale-105 transition-all duration-300 hover:shadow-glow-purple/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Enviadas</CardTitle>
                <Send className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSent.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +12% desde ontem
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-md border-t-2 border-t-success/20 hover:scale-105 transition-all duration-300 hover:shadow-glow-purple/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entregues</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalDelivered.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {((totalDelivered/totalSent) * 100).toFixed(1)}% taxa entrega
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-md border-t-2 border-t-warning/20 hover:scale-105 transition-all duration-300 hover:shadow-glow-purple/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
                <Play className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeCampaigns}</div>
                <p className="text-xs text-muted-foreground">
                  {scheduledCampaigns} agendadas
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-md border-t-2 border-t-info/20 hover:scale-105 transition-all duration-300 hover:shadow-glow-purple/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa Abertura</CardTitle>
                <TrendingUp className="h-4 w-4 text-info" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgOpenRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% vs mês anterior
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Section 2: Campaign Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-card/60 backdrop-blur-md border-t-2 border-t-gradient-primary hover:scale-105 transition-all duration-300 hover:shadow-glow-purple/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Gerenciamento de Campanhas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome da Campanha</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Agendamento</TableHead>
                      <TableHead>Enviadas</TableHead>
                      <TableHead>Taxa Entrega</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCampaigns.map((campaign) => (
                      <TableRow key={campaign.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>
                          <Badge className={cn("text-xs", getStatusColor(campaign.status))}>
                            {getStatusText(campaign.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {campaign.scheduledAt ? formatDate(campaign.scheduledAt) : '-'}
                        </TableCell>
                        <TableCell>{campaign.sentCount.toLocaleString()}</TableCell>
                        <TableCell>
                          {campaign.sentCount > 0 ? 
                            `${((campaign.deliveredCount/campaign.sentCount) * 100).toFixed(1)}%` : 
                            '-'
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {campaign.status === 'active' ? (
                              <Button variant="ghost" size="sm">
                                <Pause className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm">
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Section 3: AI Templates */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="bg-card/60 backdrop-blur-md border-t-2 border-t-gradient-secondary hover:scale-105 transition-all duration-300 hover:shadow-glow-purple/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Templates com IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Criar Template com IA</label>
                  <Textarea
                    placeholder="Descreva o tipo de mensagem que deseja criar..."
                    value={newTemplate}
                    onChange={(e) => setNewTemplate(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button className="w-full">
                    <Bot className="h-4 w-4 mr-2" />
                    Gerar com IA
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Templates Existentes</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {mockTemplates.map((template) => (
                      <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm font-medium">{template.name}</span>
                            {template.isAI && (
                              <Badge variant="secondary" className="text-xs">IA</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {template.content}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section 4: Scheduling */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="bg-card/60 backdrop-blur-md border-t-2 border-t-gradient-tertiary hover:scale-105 transition-all duration-300 hover:shadow-glow-purple/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Agendamento Inteligente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data</label>
                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hora</label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Frequência</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Uma vez</SelectItem>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Respeitar horário comercial</label>
                  <Switch 
                    checked={respectBusinessHours}
                    onCheckedChange={setRespectBusinessHours}
                  />
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium">Previsão de Envio</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Baseado em 120 msg/hora: término estimado em 2h 15min
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Section 5: Anti-Blocking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="bg-card/60 backdrop-blur-md border-t-2 border-t-gradient-quaternary hover:scale-105 transition-all duration-300 hover:shadow-glow-purple/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Proteção Anti-Bloqueio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Ativar proteção anti-bloqueio</label>
                  <p className="text-xs text-muted-foreground">Reduz o risco de bloqueio da conta</p>
                </div>
                <Switch 
                  checked={antiBlockEnabled}
                  onCheckedChange={setAntiBlockEnabled}
                />
              </div>

              {antiBlockEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Delay entre mensagens: {delayBetweenMessages[0]}s
                    </label>
                    <Slider
                      value={delayBetweenMessages}
                      onValueChange={setDelayBetweenMessages}
                      max={300}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Mensagens por hora: {messagesPerHour[0]}
                    </label>
                    <Slider
                      value={messagesPerHour}
                      onValueChange={setMessagesPerHour}
                      max={200}
                      min={20}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Delay aleatório</label>
                      <Switch 
                        checked={randomizeDelay}
                        onCheckedChange={setRandomizeDelay}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Usar proxies</label>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>

                  <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">Status da Proteção</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Proteção ativa - Risco baixo de bloqueio
                    </p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Section 6: Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="bg-card/60 backdrop-blur-md border-t-2 border-t-gradient-primary hover:scale-105 transition-all duration-300 hover:shadow-glow-purple/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Analytics Avançado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Performance das Campanhas</h4>
                  <div className="space-y-3">
                    {mockCampaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{campaign.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {campaign.sentCount} enviadas
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{campaign.openRate.toFixed(1)}%</p>
                          <p className="text-xs text-muted-foreground">abertura</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Ações Rápidas</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Relatório
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Gráficos Detalhados
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Análise de Público
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}