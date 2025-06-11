import React from "react";

export default function ToggleSwitch({ checked, onChange, disabled }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all duration-200"></div>
      <div className={`absolute left-1 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full shadow transition-all duration-200 peer-checked:translate-x-5`}></div>
    </label>
  );
} 