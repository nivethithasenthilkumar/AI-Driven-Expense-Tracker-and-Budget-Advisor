import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/axios';
import Card from '../components/Card';

export default function Budgets() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ category:'Groceries', monthlyLimit: '' });

  const load = async () => {
    try { const res = await API.get('/api/budgets'); setItems(res.data); } catch(e){}
  };
  useEffect(()=>{ load(); }, []);

  const add = async e => {
    e.preventDefault();
    try {
      await API.post('/api/budgets', { category: form.category, monthlyLimit: Number(form.monthlyLimit) });
      setForm({ category:'Groceries', monthlyLimit: '' });
      load();
    } catch(e){}
  };

  const remove = async id => { try { await API.delete(`/api/budgets/${id}`); load(); } catch(e) {} };

  return (
    <Layout title="Budgets">
      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <h3 className="font-semibold mb-3">Budgets</h3>
          <ul className="space-y-3">
            {items.map(b=>(
              <li key={b.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{b.category}</div>
                  <div className="text-sm text-muted">Limit ${b.monthlyLimit}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-semibold">${b.spent || 0}</div>
                  <button onClick={()=>remove(b.id)} className="text-sm text-red-400">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="font-semibold mb-3">Add Budget</h3>
          <form className="space-y-3" onSubmit={add}>
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}
                    className="w-full p-2 rounded bg-[#0b0d0f] border border-[#1f2937]">
              <option>Groceries</option><option>Utilities</option><option>Shopping</option><option>Transport</option>
            </select>
            <input value={form.monthlyLimit} onChange={e=>setForm({...form,monthlyLimit:e.target.value})} placeholder="Monthly limit" type="number"
                   className="w-full p-2 rounded bg-[#0b0d0f] border border-[#1f2937]" />
            <button className="w-full p-2 bg-accent rounded">Add</button>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
