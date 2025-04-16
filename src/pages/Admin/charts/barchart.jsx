import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function BarChart({ data, title, height = 300, horizontal = false }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const defaultColors = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];

    const chartData = {
      labels: data.labels,
      datasets: data.datasets.map((dataset, index) => ({
        label: dataset.label,
        data: dataset.data,
        backgroundColor: dataset.color || defaultColors[index % defaultColors.length],
        borderColor: dataset.color || defaultColors[index % defaultColors.length],
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      })),
    };

    const isDark = document.documentElement.classList.contains("dark");
    const textColor = isDark ? "#E5E7EB" : "#111827";
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: horizontal ? "y" : "x",
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            padding: 20,
            font: { 
              size: 12,
              family: "'Inter', sans-serif"
            },
            color: textColor,
          },
        },
        title: {
          display: !!title,
          text: title || "",
          font: { 
            size: 16,
            weight: '600',
            family: "'Inter', sans-serif"
          },
          color: textColor,
          padding: { top: 10, bottom: 20 },
        },
        tooltip: {
          backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: isDark ? "#374151" : "#E5E7EB",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 6,
          displayColors: true,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: gridColor,
            drawBorder: false,
          },
          ticks: {
            color: textColor,
            font: {
              family: "'Inter', sans-serif",
              size: 12,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: gridColor,
            drawBorder: false,
          },
          ticks: {
            color: textColor,
            font: {
              family: "'Inter', sans-serif",
              size: 12,
            },
            callback: function(value) {
              return value;
            }
          },
        },
      },
    };

    const config = {
      type: "bar",
      data: chartData,
      options: options,
    };

    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title, horizontal]);

  return (
    <div style={{ height: `${height}px` }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}