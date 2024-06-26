import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { ForeCastHour } from "../../definitions/interfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  forecast: ForeCastHour[];
}

const ModalChart: React.FC<Props> = ({ forecast }) => {
  useEffect(() => {}, [forecast]);

  if (!forecast || forecast.length === 0) {
    return <div>Loading chart...</div>; // just for debugging (kind of)
  }
  const labels = forecast.map((hour: ForeCastHour) => `${hour.hour}:00`);
  const temperatures = forecast.map((hour: ForeCastHour) => hour.temperatureC);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: temperatures,
        borderWidth: 2,
        pointStyle: "line",
        pointRadius: 0,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Horário",
        },
        border: {
          color: "#00000",
          width: 1.5,
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperatura (°C)",
        },
        border: {
          color: "#00000",
          width: 1.5,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: "Poppins",
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return <Line data={data} options={options} />;
};

export default ModalChart;
