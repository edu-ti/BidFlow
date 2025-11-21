import React from "react";
import { Button } from "../../components/ui/Button";

export default function ClientContacts() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-slate-800">Contatos</h2>
      <p className="text-slate-500 mt-2">Gerencie seus contatos aqui.</p>
      <div className="mt-6">
        <Button>Novo Contato</Button>
      </div>
    </div>
  );
}
