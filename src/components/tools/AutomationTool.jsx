import React from "react";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Select } from "../ui/Select";

export default function AutomationTool() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-slate-50 p-8">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Zap className="text-orange-500" /> Nova Automação
        </h3>
        <div className="space-y-4 relative">
          <div className="border rounded-lg p-4 bg-slate-50">
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
              Gatilho
            </label>
            <Select options={[{ label: "Novo Lead", value: "new_lead" }]} />
          </div>
          <div className="flex justify-center text-slate-300">
            <ArrowRight className="rotate-90" />
          </div>
          <div className="border rounded-lg p-4 bg-slate-50">
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
              Ação
            </label>
            <Select
              options={[{ label: "Enviar Mensagem", value: "send_msg" }]}
            />
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end gap-2">
          <Button variant="secondary">Cancelar</Button>
          <Button>+ Automação</Button>
        </div>
      </div>
    </div>
  );
}
