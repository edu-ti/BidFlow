import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Modal } from "../ui/Modal";
import { CheckSquare } from "lucide-react";

export default function TasksTool() {
  const { user } = useAuth();
  const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", status: "Pendente" });

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "artifacts", appId, "users", user.uid, "tasks")
    );
    const unsub = onSnapshot(q, (snap) =>
      setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => unsub();
  }, [user, appId]);

  const handleSave = async () => {
    await addDoc(
      collection(db, "artifacts", appId, "users", user.uid, "tasks"),
      { ...newTask, date: new Date().toISOString() }
    );
    setShowModal(false);
    setNewTask({ title: "", status: "Pendente" });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between">
        <h1 className="font-bold text-lg">Tarefas</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Tarefa
        </Button>
      </div>
      <div className="p-6 grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 border border-slate-200 rounded-lg flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <CheckSquare
                size={20}
                className={
                  task.status === "Pendente"
                    ? "text-slate-300"
                    : "text-green-500"
                }
              />
              <span className="text-slate-800">{task.title}</span>
            </div>
            <span className="text-xs bg-slate-100 px-2 py-1 rounded">
              {task.status}
            </span>
          </div>
        ))}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Nova Tarefa"
      >
        <div className="space-y-4">
          <Input
            label="Título"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <Select
            label="Status"
            options={[
              { label: "Pendente", value: "Pendente" },
              { label: "Em Progresso", value: "Em Progresso" },
            ]}
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </Modal>
    </div>
  );
}
