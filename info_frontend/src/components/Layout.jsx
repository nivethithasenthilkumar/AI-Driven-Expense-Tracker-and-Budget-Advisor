import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function Layout({ children, title }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("bw_user");
    localStorage.removeItem("userProfile");
    navigate("/login");
  };

  
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-purple-700 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          <li><Link to="/dashboard" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/dashboard/profile" className="hover:text-gray-300">Profile</Link></li>
          <li><Link to="/dashboard/transactions" className="hover:text-gray-300">Transactions</Link></li>
          <li>
            <button
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
              className="mt-4 bg-red-500 px-2 py-1 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}


/* -------------------------------------
   STYLES 
-------------------------------------- */
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    background: "#f5f5f5",
  },
  sidebar: {
    width: "230px",
    background: "#222",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    padding: "8px 5px",
    borderRadius: "5px",
    transition: "0.2s",
  },
  logout: {
    marginTop: "20px",
    background: "red",
    border: "none",
    padding: "10px",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    padding: "25px",
  },
  title: {
    marginBottom: "15px",
    color: "#333",
  },
  content: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    height: "calc(100vh - 130px)",
    overflowY: "auto",
  },
};
   