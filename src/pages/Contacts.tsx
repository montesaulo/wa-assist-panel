import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Download, Upload, MoreHorizontal, Star, Ban, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppStore } from '@/store/useAppStore';

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const { contacts } = useAppStore();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    setSelectedContacts(
      selectedContacts.length === filteredContacts.length
        ? []
        : filteredContacts.map(c => c.id)
    );
  };

  const formatLastSeen = (timestamp?: number) => {
    if (!timestamp) return 'Nunca';
    
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Contatos</h1>
        <p className="text-muted-foreground">
          Gerencie sua lista de contatos do WhatsApp
        </p>
      </motion.div>

      {/* Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar contatos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </motion.div>

      {/* Selected Actions */}
      {selectedContacts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg"
        >
          <span className="text-sm font-medium">
            {selectedContacts.length} contato(s) selecionado(s)
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Star className="h-4 w-4 mr-2" />
              Favoritar
            </Button>
            <Button size="sm" variant="outline">
              <Ban className="h-4 w-4 mr-2" />
              Bloquear
            </Button>
            <Button size="sm" variant="destructive">
              Excluir
            </Button>
          </div>
        </motion.div>
      )}

      {/* Contacts Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lista de Contatos ({filteredContacts.length})</span>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Última Atividade</TableHead>
                  <TableHead>Etiquetas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact, index) => (
                  <motion.tr
                    key={contact.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group hover:bg-muted/50"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={() => handleSelectContact(contact.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {contact.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{contact.name}</span>
                            {contact.isFavorite && (
                              <Star className="h-3 w-3 text-warning fill-warning" />
                            )}
                          </div>
                          {contact.isBlocked && (
                            <Badge variant="destructive" className="text-xs mt-1">
                              Bloqueado
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{contact.phone}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {formatLastSeen(contact.lastSeen)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {contact.labels?.map((label, labelIndex) => (
                          <Badge 
                            key={labelIndex} 
                            variant="outline" 
                            className="text-xs"
                          >
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={contact.lastSeen && (Date.now() - contact.lastSeen) < 3600000 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {contact.lastSeen && (Date.now() - contact.lastSeen) < 3600000 ? "Online" : "Offline"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
            
            {filteredContacts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum contato encontrado</h3>
                <p className="text-muted-foreground text-center">
                  {searchQuery ? 'Tente ajustar os filtros de busca' : 'Adicione seu primeiro contato'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}