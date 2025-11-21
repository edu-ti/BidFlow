import React from "react";
import { LayoutGrid, Users, FileText, Globe, Key, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const { user } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { id: "/", icon: LayoutGrid, label: "Dashboard" },
    { id: "/clientes", icon: Users, label: "Clientes" },
    { id: "/docs", icon: FileText, label: "Documentação" },
    { id: "/domain", icon: Globe, label: "Meu Domínio" },
    { id: "/api", icon: Key, label: "Chaves de API" },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="w-64 h-full bg-slate-50 border-r border-slate-200 flex flex-col flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold italic font-mono text-slate-900 tracking-tighter">
          BidFlow
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              location.pathname === item.id
                ? "bg-slate-200 text-slate-900"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-200">
        <div className="bg-orange-100 p-4 rounded-xl mb-4">
          <p className="font-bold text-slate-900 text-sm">
            Indique um Parceiro!
          </p>
          <p className="text-xs text-slate-600 mt-1">Indique e ganhe 10%</p>
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
              {user?.displayName
                ? user.displayName.substring(0, 2).toUpperCase()
                : "US"}
            </div>
            <span className="text-sm font-medium text-slate-700 truncate max-w-[100px]">
              {user?.displayName || "Usuário"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-500"
            title="Sair"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
