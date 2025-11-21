import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { Plus, Settings, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [showNewModelModal, setShowNewModelModal] = useState(false);
  const [newModelName, setNewModelName] = useState("");
  const appId = "default-app-id"; // Use uma constante ou variável de ambiente real

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "artifacts", appId, "users", user.uid, "models"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setModels(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user]);

  const handleCreateModel = async () => {
    if (!newModelName.trim()) return;
    await addDoc(
      collection(db, "artifacts", appId, "users", user.uid, "models"),
      {
        name: newModelName,
        createdAt: serverTimestamp(),
        usersCount: 0,
        price: 20.0,
        tools: ["funnel", "contacts"],
      }
    );
    setNewModelName("");
    setShowNewModelModal(false);
  };

  const handleSelectModel = (id) => {
    navigate(`/model/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Modelos</h2>
        <Button onClick={() => setShowNewModelModal(true)} variant="primary">
          <Plus size={16} /> Modelo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div
            key={model.id}
            className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow group relative"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg">{model.name}</h3>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button className="p-1 hover:bg-slate-100 rounded">
                  <Settings size={14} />
                </button>
              </div>
            </div>

            <div className="h-32 bg-slate-50 rounded-lg flex flex-col items-center justify-center text-slate-400 mb-4 border border-dashed border-slate-200">
              <Package size={32} className="mb-2" />
              <span className="text-xs">Ainda não há projetos</span>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-xl font-bold text-slate-800">
                  R${Number(model.price).toFixed(2)}
                </p>
                <p className="text-xs text-slate-500">Preço por usuário</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSelectModel(model.id)}
                  variant="ghost"
                  className="text-xs px-2"
                >
                  Acessar
                </Button>
                <Button variant="primary" className="text-xs px-3 h-8">
                  Convidar!
                </Button>
              </div>
            </div>
          </div>
        ))}

        {models.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-400">
            Nenhum modelo criado ainda. Clique em "+ Modelo" para começar.
          </div>
        )}
      </div>

      <Modal
        isOpen={showNewModelModal}
        onClose={() => setShowNewModelModal(false)}
        title="Novo Modelo"
      >
        <div className="space-y-4">
          <Input
            label="Nome do projeto"
            value={newModelName}
            onChange={(e) => setNewModelName(e.target.value)}
            placeholder="Ex: CRM Imobiliário"
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xs cursor-pointer ring-2 ring-offset-2 ring-orange-500">
              Cor no Modo Claro
            </div>
            <div className="h-20 bg-slate-800 rounded-lg flex items-center justify-center text-white text-xs cursor-pointer opacity-50">
              Cor no Modo Escuro
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowNewModelModal(false)}
          >
            Cancelar
          </Button>
          <Button onClick={handleCreateModel}>+ Modelo</Button>
        </div>
      </Modal>
    </div>
  );
}
