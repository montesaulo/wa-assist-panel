import { useEffect, useRef, useState } from 'react';
import { WebSocketEvent } from '@/types';

interface UseWebSocketOptions {
  url?: string;
  onMessage?: (event: WebSocketEvent) => void;
  onError?: (error: Event) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

export const useWebSocket = (options: UseWebSocketOptions = {}) => {
  const {
    url = 'ws://localhost:8080/ws',
    onMessage,
    onError,
    onConnect,
    onDisconnect,
    autoReconnect = true,
    reconnectInterval = 5000
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const connect = () => {
    if (!isMountedRef.current) return;

    try {
      // For demo purposes, we'll simulate WebSocket events
      // In a real implementation, this would connect to an actual WebSocket server
      setIsConnected(true);
      setConnectionAttempts(prev => prev + 1);
      onConnect?.();

      // Simulate periodic events
      const eventInterval = setInterval(() => {
        if (!isMountedRef.current) {
          clearInterval(eventInterval);
          return;
        }

        // Simulate random events
        const events: WebSocketEvent[] = [
          {
            type: 'message_count',
            data: { count: Math.floor(Math.random() * 10) + 1 },
            timestamp: Date.now()
          },
          {
            type: 'connection_status',
            data: { 
              state: 'connected',
              latency: Math.floor(Math.random() * 100) + 20
            },
            timestamp: Date.now()
          },
          {
            type: 'new_message',
            data: {
              id: Math.random().toString(36).substr(2, 9),
              from: 'Cliente Simulado',
              body: 'Mensagem de teste em tempo real'
            },
            timestamp: Date.now()
          }
        ];

        const randomEvent = events[Math.floor(Math.random() * events.length)];
        onMessage?.(randomEvent);
      }, 10000); // Send event every 10 seconds

      // Store the interval in wsRef for cleanup
      wsRef.current = { close: () => clearInterval(eventInterval) } as any;

    } catch (error) {
      console.error('WebSocket connection failed:', error);
      setIsConnected(false);
      onError?.(error as Event);

      if (autoReconnect && isMountedRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, reconnectInterval);
      }
    }
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    setIsConnected(false);
    onDisconnect?.();
  };

  const sendMessage = (message: any) => {
    if (isConnected && wsRef.current) {
      // In a real implementation, this would send the message via WebSocket
      console.log('Sending message:', message);
      return true;
    }
    return false;
  };

  useEffect(() => {
    isMountedRef.current = true;
    connect();

    return () => {
      isMountedRef.current = false;
      disconnect();
    };
  }, [url]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    isConnected,
    connectionAttempts,
    connect,
    disconnect,
    sendMessage
  };
};