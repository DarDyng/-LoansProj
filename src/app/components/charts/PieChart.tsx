import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { ChartData, Chart as ChartJS, ChartOptions } from "chart.js/auto";
import 'chart.js/auto';


interface PieProps {
  data: ChartData<'pie'>;
  options: ChartOptions<"pie">
}

function PieChart({ data, options}: PieProps) {
  return <Pie data={data} options={options}/>;
}

export default PieChart;