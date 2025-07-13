'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaUsers, FaBox, FaTruck, FaChartBar, FaMapMarkedAlt, FaCog, FaClipboardList, FaSearch, FaArrowRight } from 'react-icons/fa';

const AdminDashboard = () => {
  const router = useRouter();

  const dashboardCards = [
    {
      title: 'User Management',
      description: 'View and manage all users, customers, and delivery agents',
      icon: FaUsers,
      path: '/admin/users',
      color: 'bg-blue-500',
      stats: '1,234 Users'
    },
    {
      title: 'Booking History',
      description: 'Track all parcel bookings and their current status',
      icon: FaClipboardList,
      path: '/admin/bookings',
      color: 'bg-green-500',
      stats: '856 Bookings'
    },
    {
      title: 'Track Parcel',
      description: 'Real-time tracking of any parcel in the system',
      icon: FaSearch,
      path: '/admin/track',
      color: 'bg-purple-500',
      stats: 'Live Tracking'
    },
    {
      title: 'Parcel Management',
      description: 'Manage all parcels, update status, and handle issues',
      icon: FaBox,
      path: '/admin/parcels',
      color: 'bg-orange-500',
      stats: '2,341 Parcels'
    },
    {
      title: 'Delivery Agents',
      description: 'Manage delivery agents, assignments, and performance',
      icon: FaTruck,
      path: '/admin/agents',
      color: 'bg-red-500',
      stats: '45 Agents'
    },
    {
      title: 'Route Management',
      description: 'Optimize delivery routes and manage logistics',
      icon: FaMapMarkedAlt,
      path: '/admin/routes',
      color: 'bg-teal-500',
      stats: '12 Routes'
    },
    {
      title: 'Reports & Analytics',
      description: 'Business insights, performance metrics, and analytics',
      icon: FaChartBar,
      path: '/admin/reports',
      color: 'bg-indigo-500',
      stats: 'Live Data'
    },
    {
      title: 'System Settings',
      description: 'Configure system settings and preferences',
      icon: FaCog,
      path: '/admin/settings',
      color: 'bg-gray-500',
      stats: 'Configure'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the Courier Management System admin panel. Monitor and manage all aspects of your courier service.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
            <FaUsers className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Parcels</p>
              <p className="text-2xl font-bold text-gray-900">856</p>
            </div>
            <FaBox className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivery Agents</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
            <FaTruck className="text-orange-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$12.5K</p>
            </div>
            <FaChartBar className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              onClick={() => router.push(card.path)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.color} text-white`}>
                    <IconComponent size={24} />
                  </div>
                  <FaArrowRight className="text-gray-400 group-hover:text-gray-600 transition-colors" size={16} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{card.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{card.stats}</span>
                  <span className="text-xs text-blue-600 group-hover:text-blue-800 transition-colors">View Details →</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">New parcel booking #PKG-2024-001 created</span>
            <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Delivery agent John assigned to route R-001</span>
            <span className="text-xs text-gray-500 ml-auto">5 min ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Parcel #PKG-2024-002 delivered successfully</span>
            <span className="text-xs text-gray-500 ml-auto">10 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
