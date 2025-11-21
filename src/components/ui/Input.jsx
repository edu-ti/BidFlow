import React from "react";

export const Input = ({ label, ...props }) => (
  <div className="space-y-1 w-full">
    {label && (
      <label className="text-xs font-semibold text-slate-500 uppercase">
        {label}
      </label>
    )}
    <input
      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
      {...props}
    />
  </div>
);
