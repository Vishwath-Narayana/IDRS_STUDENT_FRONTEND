import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, BarElement, Tooltip, Legend, Filler);

function Analytics({ attendanceData, submissionData }) {
  const isAttendanceReady = attendanceData && attendanceData.labels?.length > 0;
  const isSubmissionsReady = submissionData && submissionData.labels?.length > 0;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        padding: 16,
        borderRadius: 12,
        titleFont: {
          size: 13,
          weight: '600',
          family: 'Inter',
        },
        bodyFont: {
          size: 14,
          family: 'Inter',
        },
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}${context.dataset.label.includes('%') ? '%' : ''}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter',
            weight: '500',
          },
          color: '#9CA3AF',
          padding: 8,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.03)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter',
            weight: '500',
          },
          color: '#9CA3AF',
          padding: 8,
        },
        beginAtZero: true,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  const enhancedAttendanceData = isAttendanceReady ? {
    ...attendanceData,
    datasets: attendanceData.datasets.map(dataset => ({
      ...dataset,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      fill: true,
    }))
  } : null;

  const enhancedSubmissionData = isSubmissionsReady ? {
    ...submissionData,
    datasets: submissionData.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: '#8B5CF6',
      borderRadius: 8,
      borderSkipped: false,
    }))
  } : null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up" role="region" aria-label="Performance Charts" style={{ animationDelay: '100ms' }}>
      {/* Attendance Chart */}
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardDescription className="text-xs uppercase tracking-wider font-semibold">Attendance Trend</CardDescription>
              <div className="flex items-baseline gap-3">
                <CardTitle className="text-3xl font-bold">92%</CardTitle>
                <Badge variant="success" className="gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +5%
                </Badge>
              </div>
              <p className="text-xs text-gray-500 font-medium">vs last month</p>
            </div>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 relative">
            {isAttendanceReady ? (
              <Line data={enhancedAttendanceData} options={chartOptions} />
            ) : (
              <div className="text-gray-400 text-sm flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  <span>Loading attendance data...</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submission Chart */}
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardDescription className="text-xs uppercase tracking-wider font-semibold">Assignment Submissions</CardDescription>
              <div className="flex items-baseline gap-3">
                <CardTitle className="text-3xl font-bold">18</CardTitle>
                <Badge variant="warning" className="gap-1">
                  <TrendingDown className="w-3 h-3" />
                  -3%
                </Badge>
              </div>
              <p className="text-xs text-gray-500 font-medium">vs last month</p>
            </div>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 relative">
            {isSubmissionsReady ? (
              <Bar data={enhancedSubmissionData} options={chartOptions} />
            ) : (
              <div className="text-gray-400 text-sm flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  <span>Loading submission data...</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default Analytics;
