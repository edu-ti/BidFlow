import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";

export default function Funnel() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    title: "",
    value: "",
    contactName: "",
  });
  const appId = "default-app-id";

  // Colunas fixas do Kanban (Poderiam vir do banco de dados)
  const columns = [
    { id: "new", title: "Novo Lead", color: "border-blue-500" },
    { id: "contact", title: "Em Contato", color: "border-yellow-500" },
    { id: "proposal", title: "Proposta", color: "border-purple-500" },
    { id: "negotiation", title: "Negociação", color: "border-orange-500" },
    { id: "closed", title: "Fechado", color: "border-green-500" },
  ];

  // Buscar Cards em Tempo Real
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "artifacts", appId, "users", user.uid, "deals")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dealsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(dealsData);
    });
    return () => unsubscribe();
  }, [user]);

  // Criar Card
  const handleCreateCard = async () => {
    if (!newCard.title) return;
    await addDoc(
      collection(db, "artifacts", appId, "users", user.uid, "deals"),
      {
        ...newCard,
        columnId: "new",
        createdAt: serverTimestamp(),
      }
    );
    setIsModalOpen(false);
    setNewCard({ title: "", value: "", contactName: "" });
  };

  // Mover Card (Simulação simples de drag-and-drop via clique para demo)
  const moveCard = async (cardId, currentColumn) => {
    const currentIndex = columns.findIndex((c) => c.id === currentColumn);
    const nextColumn = columns[currentIndex + 1]?.id;
    if (nextColumn) {
      await updateDoc(
        doc(db, "artifacts", appId, "users", user.uid, "deals", cardId),
        {
          columnId: nextColumn,
        }
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">{/* Filtros poderiam vir aqui */}</div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Novo Negócio
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div
            key={col.id}
            className="w-80 flex-shrink-0 flex flex-col bg-slate-100/50 rounded-xl border border-slate-200"
          >
            {/* Column Header */}
            <div
              className={`p-3 border-b-2 ${col.color} bg-white rounded-t-xl flex justify-between items-center`}
            >
              <span className="font-semibold text-slate-700">{col.title}</span>
              <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold">
                {cards.filter((c) => c.columnId === col.id).length}
              </span>
            </div>

            {/* Column Body */}
            <div className="p-3 flex-1 overflow-y-auto space-y-3">
              {cards
                .filter((c) => c.columnId === col.id)
                .map((card) => (
                  <div
                    key={card.id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group relative"
                    onClick={() => moveCard(card.id, col.id)} // Clique move para a próxima (demo)
                    title="Clique para avançar etapa"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-slate-900">
                        {card.title}
                      </h4>
                      <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>

                    {card.contactName && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                          {card.contactName[0]}
                        </div>
                        {card.contactName}
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                      <span className="font-bold text-green-600 text-sm">
                        {card.value ? `R$ ${card.value}` : "-"}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {/* Data poderia vir aqui */}
                        Hoje
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Negócio"
      >
        <div className="space-y-4">
          <Input
            label="Título do Negócio"
            placeholder="Ex: Venda de Software"
            value={newCard.title}
            onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
          />
          <Input
            label="Valor (R$)"
            placeholder="0,00"
            type="number"
            value={newCard.value}
            onChange={(e) => setNewCard({ ...newCard, value: e.target.value })}
          />
          <Input
            label="Nome do Contato"
            placeholder="Ex: João Silva"
            value={newCard.contactName}
            onChange={(e) =>
              setNewCard({ ...newCard, contactName: e.target.value })
            }
          />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCreateCard}>Criar Negócio</Button>
        </div>
      </Modal>
    </div>
  );
}
