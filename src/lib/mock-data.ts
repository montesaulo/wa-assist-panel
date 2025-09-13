// Mock data for WhatsApp Manager Dashboard

import { 
  Message, 
  Contact, 
  Group, 
  Notification, 
  Metric, 
  Analytics,
  QRCodeData,
  ConnectionStatus 
} from '@/types';

export const mockMessages: Message[] = [
  {
    id: "1",
    from: "João Silva",
    to: "Empresa",
    body: "Olá, gostaria de saber mais sobre os produtos.",
    status: "received",
    timestamp: Date.now() - 300000,
    tags: ["vendas", "produto"]
  },
  {
    id: "2",
    from: "Empresa",
    to: "João Silva",
    body: "Olá João! Claro, posso te ajudar. Que tipo de produto você procura?",
    status: "sent",
    timestamp: Date.now() - 240000,
    tags: ["vendas"]
  },
  {
    id: "3",
    from: "Maria Santos",
    to: "Empresa",
    body: "Preciso de suporte técnico urgente!",
    status: "received",
    timestamp: Date.now() - 180000,
    tags: ["suporte", "urgente"]
  },
  {
    id: "4",
    from: "Empresa",
    to: "Maria Santos",
    body: "Olá Maria, vou te conectar com nossa equipe técnica agora mesmo.",
    status: "sent",
    timestamp: Date.now() - 120000,
    tags: ["suporte"]
  },
  {
    id: "5",
    from: "Carlos Lima",
    to: "Empresa",
    body: "Qual o horário de funcionamento?",
    status: "received",
    timestamp: Date.now() - 60000,
    tags: ["informacao"]
  }
];

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "João Silva",
    phone: "+55 11 99999-1111",
    avatar: "/avatars/joao.jpg",
    lastSeen: Date.now() - 300000,
    labels: ["cliente", "vendas"]
  },
  {
    id: "2",
    name: "Maria Santos",
    phone: "+55 11 99999-2222",
    avatar: "/avatars/maria.jpg",
    lastSeen: Date.now() - 180000,
    labels: ["cliente", "suporte"]
  },
  {
    id: "3",
    name: "Carlos Lima",
    phone: "+55 11 99999-3333",
    lastSeen: Date.now() - 60000,
    labels: ["prospecto"]
  },
  {
    id: "4",
    name: "Ana Costa",
    phone: "+55 11 99999-4444",
    lastSeen: Date.now() - 86400000,
    labels: ["cliente", "vip"],
    isFavorite: true
  }
];

export const mockGroups: Group[] = [
  {
    id: "1",
    name: "Suporte Técnico",
    description: "Grupo para discussões de suporte",
    members: ["1", "2", "support1", "support2"],
    admins: ["support1"],
    createdAt: Date.now() - 2592000000, // 30 days ago
    isActive: true
  },
  {
    id: "2",
    name: "Vendas",
    description: "Equipe de vendas",
    members: ["1", "3", "sales1", "sales2"],
    admins: ["sales1"],
    createdAt: Date.now() - 1296000000, // 15 days ago
    isActive: true
  }
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nova mensagem de João Silva",
    description: "Gostaria de saber mais sobre os produtos.",
    timestamp: Date.now() - 300000,
    read: false,
    type: "info"
  },
  {
    id: "2",
    title: "Conexão reestabelecida",
    description: "WhatsApp foi reconectado com sucesso.",
    timestamp: Date.now() - 600000,
    read: true,
    type: "success"
  },
  {
    id: "3",
    title: "Limite de mensagens atingido",
    description: "Você atingiu 80% do limite mensal.",
    timestamp: Date.now() - 3600000,
    read: false,
    type: "warning"
  }
];

export const mockMetrics: Metric[] = [
  {
    id: "messages_sent",
    label: "Mensagens Enviadas",
    value: 1247,
    delta: 12,
    trend: "up",
    icon: "send"
  },
  {
    id: "messages_received",
    label: "Mensagens Recebidas",
    value: 892,
    delta: -3,
    trend: "down",
    icon: "inbox"
  },
  {
    id: "active_contacts",
    label: "Contatos Ativos",
    value: 156,
    delta: 8,
    trend: "up",
    icon: "users"
  },
  {
    id: "active_groups",
    label: "Grupos Gerenciados",
    value: 12,
    delta: 1,
    trend: "up",
    icon: "users"
  }
];

export const mockQRCode: QRCodeData = {
  code: "whatsapp://qr/ABC123DEF456GHI789",
  url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
  expiresAt: Date.now() + 300000, // 5 minutes from now
  isValid: true
};

export const mockConnectionStatus: ConnectionStatus = {
  state: "connected",
  lastUpdate: Date.now(),
  attempts: 1,
  latency: 45
};

export const mockAnalytics: Analytics = {
  period: "day",
  messageVolume: [
    { date: "2024-01-01", sent: 45, received: 32 },
    { date: "2024-01-02", sent: 52, received: 41 },
    { date: "2024-01-03", sent: 38, received: 29 },
    { date: "2024-01-04", sent: 61, received: 48 },
    { date: "2024-01-05", sent: 44, received: 35 },
    { date: "2024-01-06", sent: 55, received: 42 },
    { date: "2024-01-07", sent: 49, received: 38 }
  ],
  responseRate: 85.6,
  averageSLA: 12.3,
  tagDistribution: [
    { tag: "vendas", count: 45 },
    { tag: "suporte", count: 32 },
    { tag: "informacao", count: 18 },
    { tag: "urgente", count: 12 }
  ]
};

// Utility functions for mock data
export const generateRandomMetric = (): number => {
  return Math.floor(Math.random() * 1000) + 100;
};

export const generateRandomMessage = (): Message => {
  const contacts = ["João Silva", "Maria Santos", "Carlos Lima", "Ana Costa"];
  const messages = [
    "Olá, como posso ajudar?",
    "Obrigado pelo atendimento!",
    "Preciso de informações sobre o produto.",
    "Qual o prazo de entrega?",
    "Gostaria de fazer um pedido."
  ];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    from: contacts[Math.floor(Math.random() * contacts.length)],
    to: "Empresa",
    body: messages[Math.floor(Math.random() * messages.length)],
    status: Math.random() > 0.5 ? "received" : "sent",
    timestamp: Date.now() - Math.floor(Math.random() * 3600000),
    tags: ["automática"]
  };
};