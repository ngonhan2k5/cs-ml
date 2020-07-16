import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function ResultBarChart(props) {
  return (
    <BarChart
      width={800}
      height={500}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="dog" stackId="a" fill="#8884d8" />
      <Bar dataKey="cat" stackId="a" fill="#82ca9d" />
    </BarChart>
  );
}
