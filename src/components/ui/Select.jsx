import React from "react";

export const Select = ({ label, options = [], ...props }) => (
  <div className="space-y-1 w-full">
    {label && (
      <label className="text-xs font-semibold text-slate-500 uppercase">
        {label}
      </label>
    )}
    <select
      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white transition-all"
      {...props}
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
