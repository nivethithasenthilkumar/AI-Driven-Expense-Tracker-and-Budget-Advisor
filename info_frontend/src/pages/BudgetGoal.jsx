import { useState } from "react";

export default function BudgetGoal() {
  const [budget, setBudget] = useState("");
  const [saved, setSaved] = useState("");

  return (
    <div className="budget-box">
      <h2>Budget & Savings Goal</h2>

      <input
        type="number"
        placeholder="Monthly Budget"
        onChange={(e) => setBudget(e.target.value)}
      />

      <input
        type="number"
        placeholder="Savings Target"
        onChange={(e) => setSaved(e.target.value)}
      />

      <p>Budget set: ₹{budget}</p>
      <p>Savings target: ₹{saved}</p>
    </div>
  );
}
