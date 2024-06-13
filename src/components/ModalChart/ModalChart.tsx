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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ModalChart = ({ forecast }) => {
  useEffect(() => {}, [forecast]);

  console.log("forecastaaaaa", forecast);
  if (!forecast || forecast.length === 0) {
    return <div>Loading chart...</div>; // Adicionando uma mensagem de carregamento enquanto os dados não estão disponíveis
  }
  // Preparando os dados para o gráfico
  const labels = forecast.map((hour: any) => `${hour.hour}:00`);
  const temperatures = forecast.map((hour: any) => hour.temperatureC);
  console.log("temperatures", temperatures);
  console.log("labels", labels);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: temperatures,
        pointStyle: "line",
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.9,
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
