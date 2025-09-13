import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreHorizontal, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const { messages } = useAppStore();

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.from.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || message.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-success text-success-foreground';
      case 'received':
        return 'bg-primary text-primary-foreground';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Enviada';
      case 'received':
        return 'Recebida';
      case 'failed':
        return 'Falhou';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
        <p className="text-muted-foreground">
          Gerencie todas as conversas do WhatsApp
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar mensagens ou contatos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={selectedStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('all')}
          >
            Todas
          </Button>
          <Button
            variant={selectedStatus === 'received' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('received')}
          >
            Recebidas
          </Button>
          <Button
            variant={selectedStatus === 'sent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('sent')}
          >
            Enviadas
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </motion.div>

      {/* Messages List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Send className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma mensagem encontrada</h3>
              <p className="text-muted-foreground text-center">
                {searchQuery ? 'Tente ajustar os filtros de busca' : 'Suas mensagens aparecerão aqui'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="hover-lift cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback>
                        {message.from.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium truncate">
                            {message.status === 'sent' ? `Para: ${message.to}` : `De: ${message.from}`}
                          </h4>
                          <Badge 
                            className={cn("text-xs", getStatusColor(message.status))}
                            variant="secondary"
                          >
                            {getStatusText(message.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{formatTime(message.timestamp)}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-foreground mb-2 line-clamp-2">
                        {message.body}
                      </p>
                      
                      {message.tags && message.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {message.tags.map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex} 
                              variant="outline" 
                              className="text-xs px-2 py-0"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Load More Button */}
      {filteredMessages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex justify-center"
        >
          <Button variant="outline">
            Carregar mais mensagens
          </Button>
        </motion.div>
      )}
    </div>
  );
}