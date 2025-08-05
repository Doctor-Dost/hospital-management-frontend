 import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaUsers, FaUserMd, FaBed, FaDownload } from 'react-icons/fa';
import api from '../../utils/api';
import type { DashboardStats } from '../../types';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/dashboard');
      const data = response.data;
       const stats: DashboardStats = {
        totalPatients: data.cards.totalAdmissionsThisWeek ?? 0,
        admittedPatients: data.cards.admittedToday ?? 0,
        dischargedPatients: data.cards.dischargedToday ?? 0,
        totalDoctors: data.cards.totalDoctors ?? 0,
        totalBeds: data.cards.totalBeds ?? 0,
        occupiedBeds: data.cards.occupiedBeds ?? 0,
        availableBeds: data.cards.availableBeds ?? 0,
        totalRooms: data.cards.totalRooms ?? 0,
      };
      setStats(stats);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

   
  const exportData = async () => {
    try {
      const response = await api.get('/dashboard/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `dashboard-data-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Failed to export dashboard data:', err);
    }
  };

  if (loading) return <div className="flex justify-center items-center py-10"><LoadingSpinner /></div>;
  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!stats) return <div className="p-4">No data available</div>;

   
  const barChartData = {
    labels: ['Occupied Beds', 'Available Beds'],
    datasets: [
      {
        label: 'Occupied Beds',
        data: [stats.occupiedBeds, stats.availableBeds],
        backgroundColor: ['#EF4444', '#10B981'],
        borderColor: ['#DC2626', '#059669'],
        borderWidth: 1,
      },
     
    ],
  };

  const lineChartData = {
    labels: ['Last 7 days', 'Last 6 days', 'Last 5 days', 'Last 4 days', 'Last 3 days', 'Last 2 days', 'Today'],
    datasets: [
      {
        label: 'Admissions',
        data: [5, 8, 12, 6, 9, 15, stats.admittedPatients],  
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
      },
      {
        label: 'Discharges',
        data: [3, 6, 8, 4, 7, 11, stats.dischargedPatients],  
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-6">
         
        <div className="flex justify-end">
          <button
            onClick={exportData}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition-colors"
          >
            <FaDownload className="mr-2" />
            Export Data
          </button>
        </div>

         
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPatients}</p>
              </div>
              <FaUsers className="text-blue-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admitted Patients</p>
                <p className="text-3xl font-bold text-green-600">{stats.admittedPatients}</p>
              </div>
              <FaUsers className="text-green-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalDoctors}</p>
              </div>
              <FaUserMd className="text-purple-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupied Beds</p>
                <p className="text-3xl font-bold text-red-600">{stats.occupiedBeds}/{stats.totalBeds}</p>
              </div>
              <FaBed className="text-red-500 text-3xl" />
            </div>
          </div>
        </div>

         
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bed Occupancy</h3>
            <div className="h-64">
              <Bar 
                data={barChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { stepSize: 1 }
                    },
                  },
                }}
              />
            </div>
          </div>

           
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admissions vs Discharges</h3>
            <div className="h-64">
              <Line 
                data={lineChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

         
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">New patient admitted to Room 101</span>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Dr. Smith assigned to new patient</span>
              </div>
              <span className="text-xs text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Patient discharged from Room 205</span>
              </div>
              <span className="text-xs text-gray-500">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;