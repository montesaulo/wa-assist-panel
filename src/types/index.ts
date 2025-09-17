// WhatsApp Manager Dashboard Types

export type ConnectionState = "connected" | "connecting" | "disconnected";

export interface Metric {
  id: string;
  label: string;
  value: number;
  delta?: number;
  icon?: string;
  trend?: "up" | "down" | "neutral";
}

export interface Message {
  id: string;
  from: string;
  to: string;
  body: string;
  status: "sent" | "received" | "failed" | "pending";
  timestamp: number;
  groupId?: string;
  tags?: string[];
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: "image" | "document" | "audio" | "video";
  name: string;
  url: string;
  size: number;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastSeen?: number;
  labels?: string[];
  isBlocked?: boolean;
  isFavorite?: boolean;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  members: string[];
  admins: string[];
  createdAt: number;
  isActive: boolean;
}

export interface Notification {
  id: string;
  title: string;
  description?: string;
  timestamp: number;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
  action?: {
    label: string;
    url: string;
  };
}

export interface QRCodeData {
  code: string;
  url: string;
  expiresAt: number;
  isValid: boolean;
}

export interface ConnectionStatus {
  state: ConnectionState;
  lastUpdate: number;
  attempts: number;
  latency?: number;
  error?: string;
}

export interface Analytics {
  period: "hour" | "day" | "week" | "month";
  messageVolume: { date: string; sent: number; received: number }[];
  responseRate: number;
  averageSLA: number;
  tagDistribution: { tag: string; count: number }[];
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: "pt-BR" | "en-US";
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  autoResponse: boolean;
  workingHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
}

export interface WebSocketEvent {
  type: "connection_status" | "qr_updated" | "message_count" | "new_message" | "notification";
  data: any;
  timestamp: number;
}

// Mass Messaging Types
export interface Campaign {
  id: string;
  name: string;
  status: "draft" | "scheduled" | "active" | "paused" | "completed" | "failed";
  template: string;
  contacts: Contact[];
  scheduledAt?: number;
  createdAt: number;
  sentCount: number;
  deliveredCount: number;
  failedCount: number;
  openRate: number;
  clickRate: number;
  antiBlockSettings: AntiBlockSettings;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  variables: string[];
  category: "marketing" | "transactional" | "notification" | "custom";
  createdAt: number;
  isAI: boolean;
}

export interface AntiBlockSettings {
  enabled: boolean;
  delayBetweenMessages: number; // in seconds
  messagesPerHour: number;
  randomizeDelay: boolean;
  useProxies: boolean;
  rotateNumbers: boolean;
  respectBusinessHours: boolean;
  businessHours: {
    start: string;
    end: string;
    timezone: string;
  };
}

export interface BulkUpload {
  id: string;
  filename: string;
  totalContacts: number;
  validContacts: number;
  invalidContacts: number;
  status: "processing" | "completed" | "failed";
  uploadedAt: number;
  errors: string[];
}