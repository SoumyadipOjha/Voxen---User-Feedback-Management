import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RatingData {
  _id: number;
  count: number;
}

interface RatingChartProps {
  data: RatingData[];
}

export const RatingChart = ({ data }: RatingChartProps) => {
  // Ensure we have data for all ratings 1-5
  const fullRatingData = [1, 2, 3, 4, 5].map(rating => ({
    rating,
    count: data.find(item => item._id === rating)?.count || 0
  }));

  const chartData = {
    labels: fullRatingData.map(item => `${item.rating} Star${item.rating !== 1 ? 's' : ''}`),
    datasets: [
      {
        label: 'Number of Ratings',
        data: fullRatingData.map(item => item.count),
        backgroundColor: [
          '#fed7d7', // 1 star - light red
          '#fbb6ce', // 2 stars - light pink
          '#f687b3', // 3 stars - medium pink
          '#ed64a6', // 4 stars - dark pink
          '#d53f8c', // 5 stars - darkest pink
        ],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        border: {
          display: false,
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};