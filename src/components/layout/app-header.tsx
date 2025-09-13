import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Monitor, 
  User, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  title: string;
  className?: string;
}

export function AppHeader({ title, className }: AppHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const { theme, setTheme } = useTheme();
  const { notifications, markNotificationAsRead } = useAppStore();
  
  const unreadNotifications = notifications.filter(n => !n.read);
  
  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor
  };
  
  const ThemeIcon = themeIcons[theme];

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  const formatNotificationTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  return (
    <motion.header 
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Left section - Title and search */}
        <div className="flex items-center space-x-4 flex-1">
          <motion.h1 
            className="text-lg font-semibold truncate"
            key={title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h1>
          
          {/* Search - Hidden on mobile */}
          <div className="hidden md:block relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar mensagens, contatos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 focus-ring bg-background text-foreground border-border placeholder:text-muted-foreground"
          />
          </div>
        </div>
        
        {/* Right section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile search toggle */}
          <Button variant="ghost" size="sm" className="md:hidden focus-ring hover:bg-accent">
            <Search className="h-4 w-4 text-foreground" />
          </Button>
          
          {/* Theme switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="focus-ring hover:bg-accent">
                <ThemeIcon className="h-4 w-4 text-foreground" />
                <span className="sr-only">Alternar tema</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 bg-popover border-border">
              <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer hover:bg-accent focus:bg-accent">
                <Sun className="mr-2 h-4 w-4 text-foreground" />
                <span className="text-foreground">Claro</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer hover:bg-accent focus:bg-accent">
                <Moon className="mr-2 h-4 w-4 text-foreground" />
                <span className="text-foreground">Escuro</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer hover:bg-accent focus:bg-accent">
                <Monitor className="mr-2 h-4 w-4 text-foreground" />
                <span className="text-foreground">Sistema</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Notifications */}
          <DropdownMenu 
            open={showNotifications} 
            onOpenChange={setShowNotifications}
          >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative focus-ring hover:bg-accent">
                <Bell className="h-4 w-4 text-foreground" />
                {unreadNotifications.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
                  </Badge>
                )}
                <span className="sr-only">
                  Notificações ({unreadNotifications.length} não lidas)
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-popover border-border">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <h3 className="font-medium text-foreground">Notificações</h3>
                <Badge variant="secondary" className="text-xs">
                  {unreadNotifications.length} novas
                </Badge>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Nenhuma notificação
                  </div>
                ) : (
                  <AnimatePresence>
                    {notifications.slice(0, 10).map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className={cn(
                          "flex items-start space-x-3 p-3 border-b hover:bg-accent cursor-pointer transition-colors",
                          !notification.read && "bg-accent/50"
                        )}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-5">
                            {notification.title}
                          </p>
                          {notification.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {notification.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatNotificationTime(notification.timestamp)}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 bg-primary rounded-full shrink-0 mt-2" />
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
              
              {notifications.length > 10 && (
                <div className="p-3 border-t text-center">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Ver todas as notificações
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full focus-ring">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/user.jpg" alt="Usuario" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-foreground">Administrador</p>
                  <p className="text-xs text-muted-foreground">
                    admin@empresa.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent">
                <User className="mr-2 h-4 w-4 text-foreground" />
                <span className="text-foreground">Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-accent focus:bg-accent">
                <Settings className="mr-2 h-4 w-4 text-foreground" />
                <span className="text-foreground">Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-destructive cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}