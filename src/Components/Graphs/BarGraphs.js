import React from 'react';
import {
  BarChart,
  YAxis,
  XAxis,
  Legend,
  Tooltip,
  Bar,
  CartesianGrid
} from 'recharts';

const renderBars = ({ barProps }) =>
  barProps.map(data => (
    <Bar key={data.id} dataKey={data.dataKey} fill={data.fill} />
  ));

const BarGraphs = ({ data, barProps }) => (
  <BarChart width={730} height={250} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis type="category" dataKey="name" />
    <YAxis type="number" />
    <Tooltip />
    <Legend iconType="circle" />
    {renderBars({ barProps })}
  </BarChart>
);
export default BarGraphs;
