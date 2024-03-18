// pages/charts/posts-per-week-chart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { format } from "date-fns";

Chart.register(...registerables);

const PostsPerWeekChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const response = await fetch("/api/posts-per-week");
      const rawData = await response.json();
      if (isMounted && rawData && Array.isArray(rawData)) {
        const formattedData = rawData.map((item) => {
          const date = new Date(item.week);
          const formattedDate = format(date, "yyyy-MM-dd");
          return {
            ...item,
            week: formattedDate,
          };
        });

        setChartData({
          labels: formattedData.map((item) => item.week),
          datasets: [
            {
              label: "Number of Posts",
              data: formattedData.map((item) => item.post_count),
              backgroundColor: "#E9496F",
            },
          ],
        });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return chartData && chartData.labels && chartData.labels.length > 0 ? (
    <Bar data={chartData} />
  ) : null;
};

export default PostsPerWeekChart;
