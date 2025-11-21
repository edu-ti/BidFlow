import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  CheckSquare,
  ShoppingBag,
  Phone,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";

export default function ClientLayout() {
  const { user } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/app/funnel", icon: BarChart3, label: "Funil de Vendas" },
    { path: "/app/contacts", icon: Users, label: "Contatos" },
    { path: "/app/tasks", icon: CheckSquare, label: "Tarefas" },
    { path: "/app/products", icon: ShoppingBag, label: "Produtos" },
    { path: "/app/whatsapp", icon: Phone, label: "WhatsApp" },
  ];

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="font-bold text-xl text-slate-800">BidFlow</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Ferramentas
          </p>
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                location.pathname.includes(item.path)
                  ? "bg-orange-50 text-orange-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm w-full px-2 py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut size={16} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
          <h2 className="font-semibold text-slate-800">
            {menuItems.find((i) => location.pathname.includes(i.path))?.label ||
              "Dashboard"}
          </h2>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">
                {user?.displayName || "Usuário"}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold">
              {user?.email?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
