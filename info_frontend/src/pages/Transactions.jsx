import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";
import Card from "../components/Card";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ title: "", category: "", amount: "", expense: true });

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const res = await API.get("/api/transactions");
      setTransactions(res.data || []);
    } catch (e) {
      console.error("Failed to load transactions", e);
    }
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.category) {
      alert("Please fill all fields!");
      return;
    }
    try {
      await API.post("/api/transactions", form);
      setForm({ title: "", category: "", amount: "", expense: true });
      loadTransactions();
    } catch (e) {
      alert("Failed to add transaction");
    }
  };

  const deleteTransaction = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    try {
      await API.delete(`/api/transactions/${id}`);
      loadTransactions();
    } catch (e) {
      alert("Failed to delete transaction");
    }
  };

  const editTransaction = async (t) => {
    const newTitle = prompt("Enter new title:", t.title);
    if (newTitle == null) return;
    const newAmount = prompt("Enter new amount:", t.amount);
    if (newAmount == null) return;
    try {
      await API.put(`/api/transactions/${t.id}`, {
        ...t,
        title: newTitle,
        amount: newAmount,
      });
      loadTransactions();
    } catch (e) {
      alert("Failed to update transaction");
    }
  };

  return (
    <Layout title="Transactions">
      <Card>
        <h2 className="text-lg font-semibold mb-3">Add Transaction</h2>
        <form onSubmit={addTransaction} className="space-y-3">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                checked={form.expense}
                onChange={() => setForm({ ...form, expense: true })}
              />
              Expense
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                checked={!form.expense}
                onChange={() => setForm({ ...form, expense: false })}
              />
              Income
            </label>
          </div>
          <button className="btn-accent w-full py-2 rounded">Save Transaction</button>
        </form>
      </Card>

      <Card className="mt-6">
        <h3 className="font-semibold mb-3">Your Transactions</h3>
        <ul className="space-y-3">
          {transactions.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between border-b border-gray-200 pb-2"
            >
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-sm text-gray-500">
                  {t.category} • {t.expense ? "Expense" : "Income"}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`font-semibold ${
                    t.expense ? "text-red-500" : "text-green-600"
                  }`}
                >
                  ${t.amount}
                </div>
                <button
                  onClick={() => editTransaction(t)}
                  className="text-sm px-2 py-1 border rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="text-sm px-2 py-1 border rounded text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </Layout>
  );
}
