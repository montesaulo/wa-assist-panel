import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import { useAppStore } from "@/store/useAppStore";
import { useTheme } from "@/hooks/useTheme";

const queryClient = new QueryClient();

const pageTitle: Record<string, string> = {
  "/": "Dashboard",
  "/messages": "Mensagens", 
  "/contacts": "Contatos",
  "/groups": "Grupos",
  "/analytics": "Analytics",
  "/settings": "Configurações"
};

const App = () => {
  // Initialize theme
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <Routes>
                  <Route path="/" element={
                    <>
                      <AppHeader title={pageTitle["/"]} />
                      <Dashboard />
                    </>
                  } />
                  <Route path="/messages" element={
                    <>
                      <AppHeader title={pageTitle["/messages"]} />
                      <Messages />
                    </>
                  } />
                  <Route path="/contacts" element={
                    <>
                      <AppHeader title={pageTitle["/contacts"]} />
                      <Contacts />
                    </>
                  } />
                  <Route path="/groups" element={
                    <>
                      <AppHeader title={pageTitle["/groups"]} />
                      <div className="flex-1 p-6">
                        <h1 className="text-3xl font-bold">Grupos</h1>
                        <p className="text-muted-foreground mt-2">Em breve...</p>
                      </div>
                    </>
                  } />
                  <Route path="/analytics" element={
                    <>
                      <AppHeader title={pageTitle["/analytics"]} />
                      <div className="flex-1 p-6">
                        <h1 className="text-3xl font-bold">Analytics</h1>
                        <p className="text-muted-foreground mt-2">Em breve...</p>
                      </div>
                    </>
                  } />
                  <Route path="/settings" element={
                    <>
                      <AppHeader title={pageTitle["/settings"]} />
                      <div className="flex-1 p-6">
                        <h1 className="text-3xl font-bold">Configurações</h1>
                        <p className="text-muted-foreground mt-2">Em breve...</p>
                      </div>
                    </>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;