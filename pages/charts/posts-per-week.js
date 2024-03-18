// pages/charts/posts-per-week-chart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { format, addWeeks } from "date-fns";

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

        const movingAverageData = formattedData.map((item, index, array) => {
          const startOfWeek = addWeeks(new Date(item.week), -4);
          const monthData = array.filter(
            (data) =>
              new Date(data.week) > startOfWeek &&
              new Date(data.week) <= new Date(item.week)
          );
          const average =
            monthData.reduce((acc, curr) => acc + Number(curr.post_count), 0) /
            (monthData.length || 1); // Avoid division by zero
          return {
            week: item.week,
            average: average,
          };
        });

        setChartData({
          labels: formattedData.map((item) => item.week),
          datasets: [
            {
              label: "Number of posts per week",
              data: formattedData.map((item) => item.post_count),
              backgroundColor: "#E9496F",
              type: "bar", // This will be displayed as bars
            },
            {
              label: "Moving Average",
              data: movingAverageData.map((item) => item.average),
              backgroundColor: "#808080",
              borderColor: "#808080",
              fill: false,
              type: "line", // This will be displayed as a line
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
    <Bar
      data={chartData}
      options={{
        scales: {
          x: {
            display: false,
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  ) : null;
};

export default PostsPerWeekChart;
