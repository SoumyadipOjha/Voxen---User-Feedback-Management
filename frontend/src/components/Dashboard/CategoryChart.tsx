import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryData {
  _id: string;
  count: number;
}

interface CategoryChartProps {
  data: CategoryData[];
}

export const CategoryChart = ({ data }: CategoryChartProps) => {
  const colors = ['#d53f8c', '#ed64a6', '#f687b3', '#fbb6ce'];

  const chartData = {
    labels: data.map(item => {
      const categoryNames: { [key: string]: string } = {
        'suggestion': 'Suggestions',
        'bug-report': 'Bug Reports',
        'feature-request': 'Feature Requests',
        'general': 'General'
      };
      return categoryNames[item._id] || item._id;
    }),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          }
        }
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};