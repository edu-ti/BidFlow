import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { ArrowRight } from "lucide-react";

export default function ProductsTool() {
  const { user } = useAuth();
  const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: "" });

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "artifacts", appId, "users", user.uid, "products")
    );
    const unsub = onSnapshot(q, (snap) =>
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => unsub();
  }, [user, appId]);

  const handleSave = async () => {
    await addDoc(
      collection(db, "artifacts", appId, "users", user.uid, "products"),
      formData
    );
    setShowModal(false);
    setFormData({ name: "", price: "" });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between">
        <h1 className="font-bold text-lg">Produtos</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Produto
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3 text-right">Preço</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">{p.name}</td>
                <td className="px-6 py-4 text-right">R$ {p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Novo Produto"
      >
        <div className="space-y-4">
          <Input
            label="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Preço"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
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
