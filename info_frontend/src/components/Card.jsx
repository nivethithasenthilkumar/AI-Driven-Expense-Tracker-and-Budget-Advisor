import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white/70 backdrop-blur rounded-xl p-4 shadow ${className}`}>
      {children}
    </div>
  );
}
