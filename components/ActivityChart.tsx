import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const ActivityChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ posts: any[] }>("/api/getPosts");
        const posts = response.data.posts;

        // Calculate the number of posts per day
        const postsPerDay = posts.reduce((acc, post) => {
          const date = new Date(post.postdate).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += 1;
          return acc;
        }, {});

        // Determine the date range
        const dates = posts.map((post) => new Date(post.postdate));
        const minDate = new Date(
          Math.min(...dates.map((date) => date.getTime()))
        );
        const maxDate = new Date(
          Math.max(...dates.map((date) => date.getTime()))
        );

        // Fill in missing days
        const data = [];
        for (let d = minDate; d <= maxDate; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toLocaleDateString();
          data.push({
            date: dateStr,
            count: postsPerDay[dateStr] || 0,
          });
        }

        setChartData([...data].reverse());
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full bg-black p-6 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Activity Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="date" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
