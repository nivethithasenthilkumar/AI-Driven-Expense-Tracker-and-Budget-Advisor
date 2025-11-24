import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";

export default function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem("bw_theme") || "sky");
  useEffect(() => { localStorage.setItem("bw_theme", theme); document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  return (
    <Layout title="Settings">
      <Card>
        <h3 className="font-semibold mb-3">Theme</h3>
        <div className="flex gap-3">
          <button className={`px-3 py-2 rounded ${theme==="sky"?"bg-sky-400 text-white": "border"}`} onClick={()=>setTheme("sky")}>Sky / Purple</button>
          <button className={`px-3 py-2 rounded ${theme==="light"?"bg-slate-200": "border"}`} onClick={()=>setTheme("light")}>Light</button>
          <button className={`px-3 py-2 rounded ${theme==="dark"?"bg-slate-800 text-white": "border"}`} onClick={()=>setTheme("dark")}>Dark</button>
        </div>

        <h3 className="mt-6 font-semibold mb-3">Other</h3>
        <div className="text-sm">You can add more toggles here (notifications, data export, etc.).</div>
      </Card>
    </Layout>
  );
}
