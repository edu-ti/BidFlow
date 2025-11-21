import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import {
  ChevronLeft,
  Settings,
  Package,
  Users,
  BarChart3,
  CheckSquare,
  ShoppingBag,
  Phone,
  Zap,
  Edit2,
  Trash2,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

// Import Tools
import FunnelTool from "../../components/tools/FunnelTool";
import ContactsTool from "../../components/tools/ContactsTool";
import ProductsTool from "../../components/tools/ProductsTool";
import TasksTool from "../../components/tools/TasksTool";
import AutomationTool from "../../components/tools/AutomationTool";
import WhatsAppTool from "../../components/tools/WhatsAppTool";

export default function ModelEditor() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [activeTab, setActiveTab] = useState("tools");
  const [activeTool, setActiveTool] = useState(null);
  const appId = "default-app-id";

  useEffect(() => {
    if (!id || !user) return;
    const unsub = onSnapshot(
      doc(db, "artifacts", appId, "users", user.uid, "models", id),
      (doc) => {
        if (doc.exists()) setModel({ id: doc.id, ...doc.data() });
      }
    );
    return () => unsub();
  }, [id, user]);

  const toolsList = [
    {
      id: "funnel",
      name: "Funil de vendas",
      type: "Opportunity management",
      icon: BarChart3,
    },
    {
      id: "contacts",
      name: "Contatos",
      type: "Contact management",
      icon: Users,
    },
    {
      id: "tasks",
      name: "Tarefas",
      type: "Task management",
      icon: CheckSquare,
    },
    {
      id: "products",
      name: "Produtos",
      type: "Product management",
      icon: ShoppingBag,
    },
    { id: "whatsapp", name: "WhatsApp", type: "WhatsApp", icon: Phone },
    { id: "automation", name: "Automação", type: "Automation", icon: Zap },
  ];

  const renderTool = () => {
    switch (activeTool) {
      case "funnel":
        return <FunnelTool modelId={id} />;
      case "contacts":
        return <ContactsTool modelId={id} />;
      case "products":
        return <ProductsTool modelId={id} />;
      case "tasks":
        return <TasksTool modelId={id} />;
      case "automation":
        return <AutomationTool modelId={id} />;
      case "whatsapp":
        return <WhatsAppTool />;
      default:
        return <div>Ferramenta não encontrada</div>;
    }
  };

  // View: Tool Specific
  if (activeTool) {
    return (
      <div className="flex h-full bg-slate-50 -m-8 min-h-screen">
        {" "}
        {/* -m-8 to counteract dashboard padding if needed, or adjust layout */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-4">
            <button
              onClick={() => setActiveTool(null)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-4 text-xs font-bold uppercase tracking-wider"
            >
              <ChevronLeft size={14} /> Configurações
            </button>
            <h2 className="font-bold text-xl text-slate-900 mb-6 capitalize">
              {activeTool}
            </h2>

            <div className="space-y-1">
              <button className="w-full text-left px-3 py-2 rounded-lg bg-orange-50 text-orange-700 font-medium text-sm flex items-center gap-2">
                <Settings size={16} /> Geral
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-sm flex items-center gap-2">
                <Zap size={16} /> Ações!
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col">
          {renderTool()}
        </div>
      </div>
    );
  }

  // View: Model Settings
  return (
    <div className="flex h-full bg-slate-50 -m-8 min-h-screen">
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-4 text-sm"
          >
            <ChevronLeft size={16} /> Voltar
          </button>
          <h2 className="font-bold text-lg truncate">
            {model?.name || "Carregando..."}
          </h2>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          <button
            onClick={() => setActiveTab("info")}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
              activeTab === "info"
                ? "bg-orange-50 text-orange-600"
                : "hover:bg-slate-50"
            }`}
          >
            <Settings size={16} /> Informações
          </button>
          <button
            onClick={() => setActiveTab("tools")}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
              activeTab === "tools"
                ? "bg-orange-50 text-orange-600"
                : "hover:bg-slate-50"
            }`}
          >
            <Package size={16} /> Ferramentas
            <span className="ml-auto bg-slate-100 text-slate-600 text-xs px-1.5 py-0.5 rounded">
              5
            </span>
          </button>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
              activeTab === "pricing"
                ? "bg-orange-50 text-orange-600"
                : "hover:bg-slate-50"
            }`}
          >
            <div className="font-bold text-xs">$</div> Precificação
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
              activeTab === "clients"
                ? "bg-orange-50 text-orange-600"
                : "hover:bg-slate-50"
            }`}
          >
            <Users size={16} /> Clientes
          </button>
        </nav>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === "tools" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold">Componentes</h3>
              <Button variant="primary" className="text-xs h-8">
                + Componente
              </Button>
            </div>
            <div className="divide-y divide-slate-100">
              {toolsList.map((tool) => (
                <div
                  key={tool.id}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                      <tool.icon size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-900">
                        {tool.name}
                      </p>
                      <p className="text-xs text-slate-500">{tool.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setActiveTool(tool.id)}
                      className="p-2 hover:bg-orange-100 text-orange-600 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-20 h-20 bg-slate-100 mx-auto rounded-xl flex items-center justify-center mb-4">
              <img
                src="https://placehold.co/100x100/png"
                alt="Logo"
                className="opacity-50"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Configurações</h3>
            <p className="text-slate-500 mb-6">
              Personalize o nome e a aparência do seu modelo.
            </p>
            <Input label="Nome do Projeto" defaultValue={model?.name} />
            <div className="mt-6 flex justify-end">
              <Button>Atualizar Modelo</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
