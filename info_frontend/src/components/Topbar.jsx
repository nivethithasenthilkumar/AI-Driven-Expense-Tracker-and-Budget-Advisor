import React from 'react';

const Topbar = ({ title }) => {
  return (
    <div className="w-full bg-panel px-6 py-4 flex items-center justify-between border-b border-[#111213]">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="text-muted text-sm">Welcome</div>
    </div>
  );
};

export default Topbar;
