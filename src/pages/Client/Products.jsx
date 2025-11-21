import React from "react";
import { Button } from "../../components/ui/Button";

export default function ClientProducts() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-slate-800">Produtos</h2>
      <p className="text-slate-500 mt-2">Catálogo de produtos e serviços.</p>
      <div className="mt-6">
        <Button>Adicionar Produto</Button>
      </div>
    </div>
  );
}
