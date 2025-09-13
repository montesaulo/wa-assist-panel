import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  Users2, 
  Settings, 
  Smartphone,
  Badge as BadgeIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  useSidebar 
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
    description: "Visão geral e métricas"
  },
  {
    title: "Mensagens",
    url: "/messages",
    icon: MessageSquare,
    description: "Gerenciar conversas",
    badge: true
  },
  {
    title: "Contatos",
    url: "/contacts",
    icon: Users,
    description: "Lista de contatos"
  },
  {
    title: "Grupos",
    url: "/groups",
    icon: Users2,
    description: "Gerenciar grupos"
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    description: "Relatórios e análises"
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
    description: "Preferências do sistema"
  }
];

export function AppSidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const { connectionStatus, notifications } = useAppStore();
  
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const getConnectionStatusColor = () => {
    switch (connectionStatus.state) {
      case 'connected':
        return 'bg-success';
      case 'connecting':
        return 'bg-warning animate-pulse-soft';
      case 'disconnected':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={false}
            animate={{ 
              opacity: isCollapsed ? 0 : 1,
              scale: isCollapsed ? 0.8 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Smartphone className="h-4 w-4 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-semibold">WhatsApp Manager</h2>
                <p className="text-xs text-muted-foreground">Dashboard v1.0</p>
              </div>
            )}
          </motion.div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={cn(
              "h-6 w-6 p-0 hover:bg-sidebar-accent",
              isCollapsed && "ml-auto"
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Connection Status */}
        <div className={cn(
          "flex items-center space-x-2 mt-3 p-2 rounded-md bg-sidebar-accent/50",
          isCollapsed && "justify-center"
        )}>
          <div className={cn("h-2 w-2 rounded-full", getConnectionStatusColor())} />
          {!isCollapsed && (
            <span className="text-xs text-sidebar-foreground">
              {connectionStatus.state === 'connected' && 'Conectado'}
              {connectionStatus.state === 'connecting' && 'Conectando...'}
              {connectionStatus.state === 'disconnected' && 'Desconectado'}
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "px-2 text-xs font-medium text-sidebar-foreground/70",
            isCollapsed && "sr-only"
          )}>
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = currentPath === item.url;
                const showBadge = item.badge && item.title === "Mensagens" && unreadCount > 0;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "relative group transition-all duration-200",
                        isActive && "bg-sidebar-accent text-sidebar-primary font-medium"
                      )}
                      tooltip={isCollapsed ? item.title : undefined}
                    >
                      <NavLink 
                        to={item.url}
                        className={({ isActive }) => cn(
                          "flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200",
                          "hover:bg-sidebar-accent/70 focus:bg-sidebar-accent focus:outline-none focus:ring-2 focus:ring-sidebar-primary",
                          isActive 
                            ? "bg-sidebar-accent text-sidebar-primary font-medium shadow-sm" 
                            : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <item.icon className={cn(
                          "h-4 w-4 shrink-0 transition-colors duration-200",
                          currentPath === item.url 
                            ? "text-sidebar-primary" 
                            : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
                        )} />
                        
                        {!isCollapsed && (
                          <>
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-sm font-medium truncate transition-colors duration-200",
                                currentPath === item.url 
                                  ? "text-sidebar-primary" 
                                  : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
                              )}>
                                {item.title}
                              </p>
                              <p className={cn(
                                "text-xs truncate transition-colors duration-200",
                                currentPath === item.url 
                                  ? "text-sidebar-primary/70" 
                                  : "text-sidebar-foreground/60 group-hover:text-sidebar-accent-foreground/80"
                              )}>
                                {item.description}
                              </p>
                            </div>
                            
                            {showBadge && (
                              <Badge 
                                variant="destructive" 
                                className="h-5 w-5 p-0 flex items-center justify-center text-xs"
                              >
                                {unreadCount > 99 ? '99+' : unreadCount}
                              </Badge>
                            )}
                          </>
                        )}
                        
                        {isCollapsed && showBadge && (
                          <div className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Quick Stats */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-6 px-2"
          >
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-xs font-medium text-sidebar-foreground/70">
                Status Rápido
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-2 px-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sidebar-foreground/60">Mensagens hoje</span>
                    <span className="font-medium">247</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sidebar-foreground/60">Contatos ativos</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sidebar-foreground/60">Taxa resposta</span>
                    <span className="font-medium text-success">85.6%</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </motion.div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}