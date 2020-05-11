import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ chartData }) => {
  const cdata = {
    labels: chartData.map(e => e.objectID),
    datasets: [
      {
        label: "Votes",
        fill: false,
        lineTension: 0.5,
        borderWidth: 4,
        borderColor: "#55bae7",
        backgroundColor: "#e755ba",
        pointBackgroundColor: "#bae755",
        pointBorderColor: "#bae755",
        pointHoverBackgroundColor: "#55bae7",
        pointHoverBorderColor: "#55bae7",

        data: chartData.map(e => e.points)
      }
    ]
  };

  return (
    <>
      <Line
        width={100}
        height={280}
        data={cdata}
        options={{
          legend: {
            display: true,
            position: "left"
          },
          maintainAspectRatio: false
        }}
      />
    </>
  );
};

export default LineChart;
