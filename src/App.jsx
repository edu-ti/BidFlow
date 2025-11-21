import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Layouts
import DashboardLayout from "./components/layout/DashboardLayout";
import ClientLayout from "./components/layout/ClientLayout";

// Pages - Auth & Partner
import Login from "./pages/Auth/Login";
import DashboardHome from "./pages/Dashboard/Home";
import ModelEditor from "./pages/Dashboard/ModelEditor";
import Onboarding from "./pages/Onboarding/Wizard";

// Pages - Client Area (CRM Real)
import ClientFunnel from "./pages/Client/Funnel";
import ClientContacts from "./pages/Client/Contacts";
import ClientTasks from "./pages/Client/Tasks";
import ClientProducts from "./pages/Client/Products";
import ClientWhatsApp from "./pages/Client/WhatsApp";

// Componente para proteger rotas privadas
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-orange-500 animate-pulse font-medium">
          Carregando BidFlow...
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />

          {/* Rota de Onboarding (Boas-vindas) */}
          <Route
            path="/onboarding"
            element={
              <PrivateRoute>
                <Onboarding />
              </PrivateRoute>
            }
          />

          {/* Área do Parceiro (Dashboard Principal - Criação de Modelos) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="model/:id" element={<ModelEditor />} />

            {/* Placeholders para menu lateral do parceiro */}
            <Route
              path="clientes"
              element={
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Gestão de Clientes
                  </h2>
                  <p className="text-slate-500 mt-2">
                    Em breve: Visualize e gerencie todos os seus clientes aqui.
                  </p>
                </div>
              }
            />
            <Route
              path="docs"
              element={
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Documentação
                  </h2>
                  <p className="text-slate-500 mt-2">
                    Em breve: Manuais e guias para parceiros.
                  </p>
                </div>
              }
            />
            <Route
              path="domain"
              element={
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Meu Domínio
                  </h2>
                  <p className="text-slate-500 mt-2">
                    Em breve: Configure seu domínio personalizado.
                  </p>
                </div>
              }
            />
            <Route
              path="api"
              element={
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Chaves de API
                  </h2>
                  <p className="text-slate-500 mt-2">
                    Em breve: Gerencie suas chaves de integração.
                  </p>
                </div>
              }
            />
          </Route>

          {/* Área do Cliente Final (O CRM Funcional) */}
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <ClientLayout />
              </PrivateRoute>
            }
          >
            <Route path="funnel" element={<ClientFunnel />} />
            <Route path="contacts" element={<ClientContacts />} />
            <Route path="tasks" element={<ClientTasks />} />
            <Route path="products" element={<ClientProducts />} />
            <Route path="whatsapp" element={<ClientWhatsApp />} />

            {/* Redirecionamento padrão: se acessar /app, vai para o funil */}
            <Route index element={<Navigate to="/app/funnel" replace />} />
          </Route>

          {/* Rota 404 - Redireciona para home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
