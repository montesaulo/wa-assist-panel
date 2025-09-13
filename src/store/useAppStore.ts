import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  ConnectionState, 
  Message, 
  Contact, 
  Group, 
  Notification, 
  Metric,
  QRCodeData,
  ConnectionStatus,
  UserPreferences,
  Analytics
} from '@/types';
import { 
  mockMessages, 
  mockContacts, 
  mockGroups, 
  mockNotifications, 
  mockMetrics,
  mockQRCode,
  mockConnectionStatus,
  mockAnalytics
} from '@/lib/mock-data';

interface AppState {
  // Connection
  connectionStatus: ConnectionStatus;
  qrCode: QRCodeData;
  
  // Data
  messages: Message[];
  contacts: Contact[];
  groups: Group[];
  notifications: Notification[];
  metrics: Metric[];
  analytics: Analytics;
  
  // UI State
  sidebarCollapsed: boolean;
  currentPage: string;
  
  // User Preferences
  preferences: UserPreferences;
  
  // Actions
  setConnectionStatus: (status: Partial<ConnectionStatus>) => void;
  updateQRCode: (qr: QRCodeData) => void;
  addMessage: (message: Message) => void;
  updateMetrics: (metrics: Metric[]) => void;
  markNotificationAsRead: (id: string) => void;
  addNotification: (notification: Notification) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setCurrentPage: (page: string) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetData: () => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  language: 'pt-BR',
  notifications: {
    email: true,
    push: true,
    desktop: false
  },
  autoResponse: false,
  workingHours: {
    enabled: false,
    start: '09:00',
    end: '18:00',
    timezone: 'America/Sao_Paulo'
  }
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      connectionStatus: mockConnectionStatus,
      qrCode: mockQRCode,
      messages: mockMessages,
      contacts: mockContacts,
      groups: mockGroups,
      notifications: mockNotifications,
      metrics: mockMetrics,
      analytics: mockAnalytics,
      sidebarCollapsed: false,
      currentPage: 'dashboard',
      preferences: defaultPreferences,
      
      // Actions
      setConnectionStatus: (status) => 
        set((state) => ({
          connectionStatus: { ...state.connectionStatus, ...status }
        })),
      
      updateQRCode: (qr) => 
        set({ qrCode: qr }),
      
      addMessage: (message) => 
        set((state) => ({
          messages: [message, ...state.messages].slice(0, 1000) // Keep last 1000 messages
        })),
      
      updateMetrics: (metrics) => 
        set({ metrics }),
      
      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
          )
        })),
      
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications].slice(0, 100) // Keep last 100
        })),
      
      setSidebarCollapsed: (collapsed) => 
        set({ sidebarCollapsed: collapsed }),
      
      setCurrentPage: (page) => 
        set({ currentPage: page }),
      
      updatePreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences }
        })),
      
      resetData: () => 
        set({
          messages: mockMessages,
          contacts: mockContacts,
          groups: mockGroups,
          notifications: mockNotifications,
          metrics: mockMetrics,
          connectionStatus: mockConnectionStatus,
          qrCode: mockQRCode
        })
    }),
    {
      name: 'whatsapp-manager-storage',
      partialize: (state) => ({
        preferences: state.preferences,
        sidebarCollapsed: state.sidebarCollapsed
      })
    }
  )
);