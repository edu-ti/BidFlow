import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "Bem vindo ao BidFlow!",
      desc: "É muito bom tê-lo conosco! Vamos começar!",
      icon: "👋",
    },
    {
      title: "Seu CRM, seu preço",
      desc: "A plataforma permite criar CRMs customizados.",
      icon: "💻",
    },
    {
      title: "Modelos",
      desc: "Crie modelos padronizados para seus segmentos de clientes.",
      icon: "📋",
    },
    {
      title: "Ferramentas",
      desc: "Ative WhatsApp, Funil, Tarefas e muito mais.",
      icon: "🛠️",
    },
  ];

  const handleComplete = () => {
    navigate("/");
  };

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-pink-300 rounded-t-[50%] scale-150 opacity-50 pointer-events-none" />

      <div className="z-10 max-w-xl text-center space-y-6 bg-white/80 backdrop-blur p-10 rounded-3xl shadow-lg border border-slate-100">
        <div className="text-6xl animate-bounce">{steps[step].icon}</div>
        <h2 className="text-2xl font-bold text-slate-800">
          {steps[step].title}
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed">
          {steps[step].desc}
        </p>

        <div className="flex items-center justify-center gap-2 mt-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i === step ? "w-8 bg-orange-500" : "bg-slate-300"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={() =>
            step < steps.length - 1 ? setStep(step + 1) : handleComplete()
          }
          variant="orange"
          className="w-full mt-8 rounded-full"
        >
          {step < steps.length - 1 ? "Próximo" : "Vamos lá!"}
        </Button>
      </div>
    </div>
  );
}
