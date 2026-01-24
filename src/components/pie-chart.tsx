"use client";

import { Chart } from "react-google-charts";

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  title?: string;
}

export default function PieChart({ data, title }: PieChartProps) {
  // Transform data for Google Charts format: [["Category", "Value"], ...]
  const chartData = [
    ["Department", "Products"],
    ...data.map((item) => [item.label, item.value]),
  ];

  // Extract colors from data
  const colors = data.map((item) => item.color);

  const options = {
    title: title || "",
    pieHole: 0.4, // Creates donut chart
    colors: colors,
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        fontSize: 14,
      },
    },
    chartArea: {
      width: "90%",
      height: "80%",
    },
    pieSliceTextStyle: {
      color: "white",
      fontSize: 14,
    },
    tooltip: {
      showColorCode: true,
      textStyle: {
        fontSize: 13,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width="100%"
        height="400px"
      />
    </div>
  );
}
