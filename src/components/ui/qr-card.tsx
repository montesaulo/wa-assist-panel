import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, RefreshCw, Copy, Download, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QRCodeData } from '@/types';
import { cn } from '@/lib/utils';

interface QRCardProps {
  qrData: QRCodeData;
  onRefresh?: () => void;
  className?: string;
  isLoading?: boolean;
}

export function QRCard({ qrData, onRefresh, className, isLoading = false }: QRCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrData.url;
    link.download = 'whatsapp-qr-code.png';
    link.click();
  };

  const timeRemaining = Math.max(0, qrData.expiresAt - Date.now());
  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  if (isLoading) {
    return (
      <Card className={cn("hover-lift", className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <QrCode className="h-5 w-5" />
            <span>Código QR WhatsApp</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <div className="h-48 w-48 bg-muted animate-pulse rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className={cn("hover-lift", className)}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <QrCode className="h-5 w-5 text-primary" />
              <span>Código QR WhatsApp</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="hover-glow"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={qrData.url}
                alt="WhatsApp QR Code"
                className="h-48 w-48 rounded-lg border bg-white p-2"
              />
              {!qrData.isValid && (
                <div className="absolute inset-0 bg-destructive/20 rounded-lg flex items-center justify-center">
                  <span className="text-destructive font-medium">Expirado</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              Escaneie este código com seu WhatsApp para conectar
            </p>
            
            {qrData.isValid && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Expira em: {minutes}:{seconds.toString().padStart(2, '0')}
                </p>
                <div className="w-full bg-muted rounded-full h-1 mt-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all duration-1000"
                    style={{ width: `${(timeRemaining / 300000) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex-1 hover-glow"
            >
              {copied ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex-1 hover-glow"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}