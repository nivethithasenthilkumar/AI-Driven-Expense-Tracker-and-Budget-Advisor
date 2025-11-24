import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale);

export default function Charts({ income, expense }) {
  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
      },
    ],
  };

  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
      },
    ],
  };

  return (
    <div className="chart-box">
      <h2>Financial Overview</h2>
      <Pie data={pieData} />

      <h3>Bar Chart</h3>
      <Bar data={barData} />
    </div>
  );
}
