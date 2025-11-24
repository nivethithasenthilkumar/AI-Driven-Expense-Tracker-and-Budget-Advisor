import React from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";

export default function Upgrade() {
  return (
    <Layout title="Upgrade Plan">
      <Card>
        <h2 className="text-lg font-semibold">Upgrade to Pro</h2>
        <p className="mt-3 text-sm text-slate-600">Pro features: advanced analytics, exported reports, premium avatars.</p>
        <div className="mt-4 flex gap-3">
          <button className="btn-accent px-4 py-2 rounded">Upgrade (Monthly)</button>
          <button className="px-4 py-2 border rounded">Compare Plans</button>
        </div>
      </Card>
    </Layout>
  );
}
