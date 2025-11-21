import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { Plus, MoreHorizontal } from "lucide-react";

export default function FunnelTool({ modelId }) {
  const { user } = useAuth();
  const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
  const [columns] = useState([
    { id: "c1", title: "Novo contato", color: "bg-blue-500" },
    { id: "c2", title: "Em contato", color: "bg-yellow-500" },
    { id: "c3", title: "Apresentação", color: "bg-purple-500" },
    { id: "c4", title: "Negociação", color: "bg-orange-500" },
    { id: "c5", title: "Fechamento", color: "bg-green-500" },
  ]);
  const [cards, setCards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCardData, setNewCardData] = useState({ name: "", value: "" });

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "artifacts", appId, "users", user.uid, "opportunities")
    );
    const unsub = onSnapshot(q, (snap) => {
      setCards(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user, appId]);

  const handleAddCard = async () => {
    if (!newCardData.name) return;
    await addDoc(
      collection(db, "artifacts", appId, "users", user.uid, "opportunities"),
      {
        ...newCardData,
        columnId: "c1",
        priority: "Média",
        createdAt: serverTimestamp(),
      }
    );
    setShowAddModal(false);
    setNewCardData({ name: "", value: "" });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-lg">Funil de Vendas</h1>
        </div>
        <Button
          variant="primary"
          className="text-xs h-8"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={14} /> Adicionar
        </Button>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 bg-slate-100">
        <div className="flex h-full gap-4">
          {columns.map((col) => (
            <div
              key={col.id}
              className="w-72 flex-shrink-0 flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-3 px-1">
                <span className="font-bold text-slate-700 text-sm">
                  {col.title}
                </span>
                <span className="bg-slate-200 text-slate-600 text-[10px] px-1.5 rounded-full">
                  {cards.filter((c) => c.columnId === col.id).length}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 pb-4">
                {cards
                  .filter((c) => c.columnId === col.id)
                  .map((card) => (
                    <div
                      key={card.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-sm text-slate-800">
                          {card.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <span className="text-green-600 font-bold text-sm">
                          R${card.value || "0,00"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Novo Registro"
      >
        <div className="space-y-4">
          <Input
            label="Nome do Lead"
            value={newCardData.name}
            onChange={(e) =>
              setNewCardData({ ...newCardData, name: e.target.value })
            }
          />
          <Input
            label="Valor Estimado"
            value={newCardData.value}
            onChange={(e) =>
              setNewCardData({ ...newCardData, value: e.target.value })
            }
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAddCard}>Salvar</Button>
        </div>
      </Modal>
    </div>
  );
}
