import React from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";

export default function About() {
  return (
    <Layout title="About Us">
      <Card>
        <h2 className="text-lg font-semibold">About BudgetWise</h2>
        <p className="mt-3 text-sm text-slate-600">
          BudgetWise is an AI-driven expense tracker and budget advisor that helps you manage your money.
        </p>
        <p className="mt-3 text-sm">Version: 1.0</p>
      </Card>
    </Layout>
  );
}
