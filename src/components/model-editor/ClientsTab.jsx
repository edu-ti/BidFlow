import React from "react";
import { Package } from "lucide-react";
import { Button } from "../ui/Button";

export default function ClientsTab() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 rounded-xl border border-slate-200 shadow-sm text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Package className="text-slate-400" size={32} />
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-2">
        Ainda não há projetos usando este modelo
      </h3>
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        Envie um link para seu projeto para seus clientes. Assim que se
        inscreverem, eles serão listados aqui!
      </p>

      <Button className="mx-auto">Convidar Cliente</Button>
    </div>
  );
}
