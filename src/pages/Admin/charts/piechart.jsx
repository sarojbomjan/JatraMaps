import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function PieChart({ data, title, height = 250 }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const defaultColors = [
      "#3B82F6",
      "#6366F1",
      "#10B981",
      "#F59E0B",
      "#EF4444",
    ];
    const colors = data.colors || defaultColors;

    const isDark = () => document.documentElement.classList.contains("dark");

    const textColor = isDark ? "#FFFFFF" : "#000000";
    const borderColor = isDark ? "#374151" : "#D1D5DB";
    const tooltipBg = isDark ? "#111827" : "#FFFFFF";

    const chartData = {
      labels: data.labels,
      datasets: [
        {
          data: data.values,
          backgroundColor: colors.slice(0, data.values.length),
          borderWidth: 1,
          borderColor: borderColor,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: title ? 30 : 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
      },
      plugins: {
        legend: {
          position: "right",
          align: "center",
          labels: {
            usePointStyle: true,
            padding: 16,
            font: {
              size: 12,
              family: "'Inter', sans-serif",
            },
            color: textColor,
            boxWidth: 12,
            boxHeight: 12,
          },
        },
        title: {
          display: !!title,
          text: title || "",
          position: "top",
          align: "center",
          font: {
            size: 16,
            weight: "600",
            family: "'Inter', sans-serif",
          },
          color: textColor,
          padding: {
            top: 10,
            bottom: 20,
          },
        },
        tooltip: {
          backgroundColor: tooltipBg,
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: borderColor,
          borderWidth: 1,
          padding: 10,
          cornerRadius: 6,
          displayColors: false,
          callbacks: {
            label: (context) => {
              const label = context.label || "";
              const value = context.raw;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
    };

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title]);

  return (
    <div style={{ height: `${height}px`, position: "relative" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default PieChart;
