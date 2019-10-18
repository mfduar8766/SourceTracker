import React from 'react';
import PropTypes from 'prop-types';
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

const BarGraphs = ({ data, barProps, barGraphWidth, barGraphHeight }) => (
  <BarChart width={barGraphWidth} height={barGraphHeight} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis type="category" dataKey="name" />
    <YAxis type="number" />
    <Tooltip />
    <Legend iconType="circle" />
    {renderBars({ barProps })}
  </BarChart>
);

BarGraphs.defaultProps = {
  barGraphWidth: 600,
  barGraphHeight: 250
};

BarGraphs.propTypes = {
  data: PropTypes.array,
  barProps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      dataKey: PropTypes.string,
      fill: PropTypes.string
    })
  ),
  barGraphWidth: PropTypes.number,
  barGraphHeight: PropTypes.number
};

export default BarGraphs;
