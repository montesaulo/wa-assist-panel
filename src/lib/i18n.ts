// Basic internationalization setup
export const translations = {
  'pt-BR': {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.messages': 'Mensagens', 
    'nav.contacts': 'Contatos',
    'nav.groups': 'Grupos',
    'nav.analytics': 'Analytics',
    'nav.settings': 'Configurações',
    
    // Common
    'common.loading': 'Carregando...',
    'common.search': 'Buscar',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Excluir',
    'common.edit': 'Editar',
    'common.add': 'Adicionar',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Visão geral do WhatsApp Manager e métricas em tempo real',
    'dashboard.messages_sent': 'Mensagens Enviadas',
    'dashboard.messages_received': 'Mensagens Recebidas',
    'dashboard.active_contacts': 'Contatos Ativos',
    'dashboard.active_groups': 'Grupos Gerenciados',
    
    // Connection Status
    'connection.connected': 'Conectado',
    'connection.connecting': 'Conectando...',
    'connection.disconnected': 'Desconectado',
    
    // Messages
    'messages.title': 'Mensagens',
    'messages.subtitle': 'Gerencie todas as conversas do WhatsApp',
    'messages.status.sent': 'Enviada',
    'messages.status.received': 'Recebida',
    'messages.status.failed': 'Falhou',
    'messages.status.pending': 'Pendente',
    
    // Notifications
    'notifications.new_message': 'Nova mensagem recebida',
    'notifications.connection_restored': 'Conexão reestabelecida',
    'notifications.limit_reached': 'Limite de mensagens atingido',
  },
  'en-US': {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.messages': 'Messages',
    'nav.contacts': 'Contacts', 
    'nav.groups': 'Groups',
    'nav.analytics': 'Analytics',
    'nav.settings': 'Settings',
    
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'WhatsApp Manager overview and real-time metrics',
    'dashboard.messages_sent': 'Messages Sent',
    'dashboard.messages_received': 'Messages Received',
    'dashboard.active_contacts': 'Active Contacts',
    'dashboard.active_groups': 'Managed Groups',
    
    // Connection Status
    'connection.connected': 'Connected',
    'connection.connecting': 'Connecting...',
    'connection.disconnected': 'Disconnected',
    
    // Messages
    'messages.title': 'Messages',
    'messages.subtitle': 'Manage all WhatsApp conversations',
    'messages.status.sent': 'Sent',
    'messages.status.received': 'Received',
    'messages.status.failed': 'Failed',
    'messages.status.pending': 'Pending',
    
    // Notifications
    'notifications.new_message': 'New message received',
    'notifications.connection_restored': 'Connection restored',
    'notifications.limit_reached': 'Message limit reached',
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations['pt-BR'];

export const useTranslation = (language: Language = 'pt-BR') => {
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return { t };
};