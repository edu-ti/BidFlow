import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export default function PricingTab({ model }) {
  const [price, setPrice] = useState(model?.price || 0);
  const [loading, setLoading] = useState(false);
  const appId = "default-app-id"; // Em produção, use contexto

  useEffect(() => {
    if (model) setPrice(model.price);
  }, [model]);

  const handleSave = async () => {
    if (!model) return;
    setLoading(true);
    try {
      await updateDoc(
        doc(db, "artifacts", appId, "users", model.userId, "models", model.id),
        {
          price: parseFloat(price),
        }
      );
      alert("Preço atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar preço:", error);
      alert("Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Precificação</h3>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6">
        <p className="text-sm text-slate-600 mb-4">
          * Preço por usuário do CRM (min. R$20)
        </p>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-bold">R$</span>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="max-w-[200px]"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Salvando..." : "Definir Preço"}
        </Button>
      </div>
    </div>
  );
}
