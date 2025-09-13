# WhatsApp Manager Dashboard

Um dashboard moderno e profissional para gerenciar operações do WhatsApp Business, construído com React 18, TypeScript, Tailwind CSS e shadcn/ui.

## 🚀 Características

### ✨ Interface Moderna
- Design responsivo e acessível (WCAG 2.2 AA)
- Dark/Light theme com detecção automática do sistema
- Animações suaves com Framer Motion
- Componentes reutilizáveis com shadcn/ui

### 📊 Dashboard Completo
- **Métricas em tempo real**: Mensagens enviadas/recebidas, contatos ativos, grupos
- **QR Code**: Conexão visual com WhatsApp Web
- **Status de conexão**: Monitoramento em tempo real
- **Analytics**: Gráficos de volume de mensagens e performance

### 💬 Gestão de Mensagens
- Lista completa de conversas
- Filtros por status (enviadas, recebidas, falharam)
- Busca por conteúdo e contatos
- Sistema de tags e etiquetas

### 👥 Gestão de Contatos
- Tabela completa com seleção múltipla
- Import/Export CSV e JSON
- Sistema de favoritos e bloqueios
- Histórico de atividade

### 🔧 Recursos Técnicos
- **Estado Global**: Zustand para gerenciamento de estado
- **WebSocket Mock**: Simulação de eventos em tempo real
- **Internacionalização**: Suporte a PT-BR e EN-US
- **Performance**: Code splitting e otimizações
- **Acessibilidade**: Navegação por teclado, aria-labels, contraste adequado

## 🛠 Stack Tecnológica

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** (animações)
- **Zustand** (estado global)
- **React Hook Form** + **Zod** (formulários)
- **Recharts** (gráficos)
- **Lucide React** (ícones)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint

# Testes
npm run test
```

## 🏗 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components (Sidebar, Header)
│   └── charts/         # Componentes de gráficos
├── pages/              # Páginas da aplicação
├── hooks/              # Custom hooks
├── store/              # Estado global (Zustand)
├── lib/                # Utilitários e configurações
├── types/              # Definições TypeScript
└── mocks/              # Dados simulados
```

## 🎨 Design System

### Cores Principais
- **Primary**: Purple (`#8B5CF6`)
- **Secondary**: Dark Gray (`#1F2937`)
- **Success**: Green (`#10B981`)
- **Warning**: Yellow (`#F59E0B`)
- **Error**: Red (`#EF4444`)
- **WhatsApp**: Green (`#25D366`)

### Tipografia
- **Font**: Inter (sistema)
- **Escalas**: 12px - 32px
- **Weights**: 400, 500, 600, 700

### Espaçamento
- **Base**: 4px (0.25rem)
- **Escalas**: 4, 8, 12, 16, 24, 32, 48, 64px

## 🔐 Segurança e Privacidade

⚠️ **IMPORTANTE**: Este é um projeto de demonstração que **NÃO** conecta ao WhatsApp real.

- Todos os dados são simulados (mock)
- Não há conexão com APIs reais do WhatsApp
- WebSocket simulado para demonstração
- Não armazena dados pessoais sensíveis

## 📱 Responsividade

- **Mobile First**: Design otimizado para mobile
- **Breakpoints**: 640px, 768px, 1024px, 1280px
- **Touch targets**: Mínimo 44px para acessibilidade
- **Sidebar adaptável**: Colapsa em telas pequenas

## ♿ Acessibilidade

- **WCAG 2.2 AA**: Contraste mínimo 4.5:1
- **Navegação por teclado**: Suporte completo
- **Screen readers**: aria-labels e estrutura semântica
- **Focus visível**: Indicadores claros
- **Skip links**: Navegação rápida

## 🌐 Internacionalização

```typescript
// Uso básico
import { useTranslation } from '@/lib/i18n';

const { t } = useTranslation('pt-BR');
const title = t('dashboard.title'); // "Dashboard"
```

## 📊 Performance

- **Bundle size**: < 250KB inicial
- **LCP**: < 2.0s (dados mockados)
- **CLS**: < 0.1
- **Code splitting**: Por rota
- **Lazy loading**: Imagens e componentes

## 🧪 Testes

```bash
# Rodar testes
npm run test

# Coverage
npm run test:coverage

# Testes E2E (se configurado)
npm run test:e2e
```

## 🚀 Deploy

```bash
# Build otimizado
npm run build

# Deploy (exemplo com Vercel)
vercel --prod
```

## 📝 Roadmap

### Próximas Funcionalidades
- [ ] Página de Grupos completa
- [ ] Analytics avançados com mais gráficos
- [ ] Configurações de usuário
- [ ] Sistema de templates de mensagem
- [ ] Relatórios PDF
- [ ] Integração com webhooks (mock)

### Melhorias Técnicas
- [ ] Testes unitários completos
- [ ] Testes E2E com Playwright
- [ ] PWA (Progressive Web App)
- [ ] Service Worker para cache
- [ ] Storybook para documentação

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

Para dúvidas e suporte:
- Abra uma [Issue](https://github.com/seu-usuario/whatsapp-manager/issues)
- Consulte a [Documentação](https://docs.whatsapp-manager.com)

---

**Nota**: Este é um projeto de demonstração. Para uso em produção, certifique-se de implementar autenticação adequada, validação de dados e conexões reais com APIs oficiais.