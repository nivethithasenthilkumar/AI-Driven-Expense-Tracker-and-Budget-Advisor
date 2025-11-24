import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const loc = useLocation();
  const user = JSON.parse(localStorage.getItem("bw_user") || "{}");

  const logout = () => {
    if (!confirm("Logout?")) return;
    localStorage.removeItem("bw_token");
    localStorage.removeItem("bw_user");
    window.location.href = "/login";
  };

  const navItem = (to, label) => (
    <Link to={to} className={`block px-3 py-2 rounded-md ${loc.pathname === to ? "bg-sky-200/60 text-sky-900 font-semibold" : "text-slate-700"}`}>
      {label}
    </Link>
  );

  return (
    <aside className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={user?.avatar || "/default-avatar.png"} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-semibold">Hi, {user?.fullName || user?.name || "User"}</div>
            <div className="text-xs text-slate-500">Welcome back</div>
          </div>
        </div>

        <nav className="space-y-2">
          {navItem("/", "Dashboard")}
          {navItem("/profile", "Profile")}
          {navItem("/settings", "Settings")}
          {navItem("/upgrade", "Upgrade Plan")}
          {navItem("/about", "About Us")}
        </nav>
      </div>

      <div className="mt-6">
        <button onClick={logout} className="w-full text-left px-3 py-2 rounded-md border text-red-600">Log out</button>
      </div>
    </aside>
  );
}
