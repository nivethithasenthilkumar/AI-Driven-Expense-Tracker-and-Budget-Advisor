import { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionHistory() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/transactions").then((res) => {
      setList(res.data);
    });
  }, []);

  return (
    <div className="history-box">
      <h2>Transaction History</h2>
      {list.map((t) => (
        <div key={t.id} className="history-item">
          <p>{t.type.toUpperCase()} - ₹{t.amount}</p>
          <p>{t.category}</p>
          <p>{t.note}</p>
        </div>
      ))}
    </div>
  );
}
