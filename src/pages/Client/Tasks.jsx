import React from "react";
import { Button } from "../../components/ui/Button";

export default function ClientTasks() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-slate-800">Tarefas</h2>
      <p className="text-slate-500 mt-2">Suas pendências e agendamentos.</p>
      <div className="mt-6">
        <Button>Nova Tarefa</Button>
      </div>
    </div>
  );
}
