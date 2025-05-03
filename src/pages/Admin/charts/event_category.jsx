import { useEffect, useState } from "react";
import PieChart from "./piechart";
import { getEvents } from "../../../utils/eventService";

const EventCategoryPieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await getEvents();

        // Count events by category
        const categoryCounts = events.reduce((acc, event) => {
          const category = event.category || "Uncategorized";
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        const pieData = {
          labels: Object.keys(categoryCounts),
          values: Object.values(categoryCounts),
          colors: ["#6366F1", "#EF4444", "#10B981", "#F59E0B"],
        };

        setChartData(pieData);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load event data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="h-80 flex items-center justify-center">Loading...</div>
    );
  if (error)
    return (
      <div className="h-80 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  if (!chartData)
    return (
      <div className="h-80 flex items-center justify-center">
        No data available
      </div>
    );

  return <PieChart data={chartData} height={320} />;
};

export default EventCategoryPieChart;
