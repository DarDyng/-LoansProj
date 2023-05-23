import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { ChartData, Chart as ChartJS } from "chart.js/auto";
import 'chart.js/auto';


interface LineProps {
    data: ChartData<'line'>;
  }

function LineChart({ data } : LineProps) {
  return <Line data={data} options={{aspectRatio: 2}}/>;
}

export default LineChart;