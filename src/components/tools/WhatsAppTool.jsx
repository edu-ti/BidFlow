import React from "react";

export default function WhatsAppTool() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-white p-8">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Conecte seu WhatsApp!</h2>
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 inline-block mb-6">
          <div className="w-48 h-48 bg-slate-900 flex items-center justify-center text-white">
            [QR Code]
          </div>
        </div>
        <p className="text-slate-600">Escaneie para conectar</p>
      </div>
    </div>
  );
}
