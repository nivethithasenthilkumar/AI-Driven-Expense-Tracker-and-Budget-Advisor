import React from 'react';

export default function AvatarPlaceholder({ name, size = 48 }) {
  const initials = (name || 'U').split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
  return (
    <div style={{ width: size, height: size }} className="rounded-full bg-gradient-to-br from-sky-400 to-purple-400 text-white flex items-center justify-center font-bold">
      {initials}
    </div>
  );
}
