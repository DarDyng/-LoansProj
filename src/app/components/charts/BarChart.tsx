import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartData, Chart as ChartJS } from "chart.js/auto";
import 'chart.js/auto';


interface BarProps {
    data: ChartData<'bar'>;
  }

function BarChart({ data } : BarProps) {
  return <Bar data={data} options={{aspectRatio: 2}}/>;
}

export default BarChart;