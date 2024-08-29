"use client";
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import api from '@/lib/axios-instance';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const BurnDownChart = ({ projectId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/burndown/${projectId}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching burn down data', error);
      }
    };

    fetchData();
  }, [projectId]);

  if (!data) return <p>Loading...</p>;

  const labels = data.map(snapshot => new Date(snapshot.date).toLocaleDateString());

  // Calculate the total work based on the initial state
  const totalWork = data[0].todoCount + data[0].inProgressCount + data[0].inReviewCount;

  // Calculate the ideal line (linear decrease from total work to 0)
  const idealData = data.map((snapshot, index) => {
    const daysRemaining = data.length - index;
    return totalWork - (totalWork / data.length) * (data.length - daysRemaining);
  });

  // Calculate the actual remaining work each day
  const actualData = data.map(snapshot => {
    return snapshot.todoCount + snapshot.inProgressCount + snapshot.inReviewCount;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Ideal',
        data: idealData,
        borderColor: '#4A90E2', // Custom color for Ideal line
        backgroundColor: 'rgba(74, 144, 226, 0.2)', // Custom background color for Ideal line
        borderWidth: 2,
        pointRadius: 4, // Custom point radius for Ideal line
        pointBackgroundColor: '#4A90E2', // Custom point color for Ideal line
        fill: false,
      },
      {
        label: 'Actual',
        data: actualData,
        borderColor: '#E94E77', // Custom color for Actual line
        backgroundColor: 'rgba(233, 78, 119, 0.2)', // Custom background color for Actual line
        borderWidth: 2,
        pointRadius: 4, // Custom point radius for Actual line
        pointBackgroundColor: '#E94E77', // Custom point color for Actual line
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} hours`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide grid lines on x-axis
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Light grid color for y-axis
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold',
          },
          callback: function(value) {
            return `${value} hours`; // Customize y-axis labels
          },
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default BurnDownChart;
