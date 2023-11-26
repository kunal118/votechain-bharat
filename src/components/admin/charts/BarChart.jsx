"use client";
import React, { useState } from "react";
import Chart from "react-apexcharts";
const BarChart = ({ options, series }) => {
  console.log(options);
  console.log(series);
  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width={500}
      height={320}
    />
  );
};

export default BarChart;
