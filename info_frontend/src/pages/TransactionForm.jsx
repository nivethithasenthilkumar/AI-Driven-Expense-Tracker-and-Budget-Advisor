import { useState } from "react";
import axios from "axios";

export default function TransactionForm() {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/transactions", {
      type,
      amount,
      category,
      note
    });
    alert("Transaction added!");
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <select onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        placeholder="Note"
        onChange={(e) => setNote(e.target.value)}
      />

      <button>Add Transaction</button>
    </form>
  );
}
