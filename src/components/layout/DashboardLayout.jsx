import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { LayoutGrid } from "lucide-react";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <LayoutGrid size={16} />
            <span>/</span>
            <span className="text-slate-900 font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              ⚠️ Complete seu cadastro
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
