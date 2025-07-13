'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUsers, FaBox, FaTruck, FaChartBar, FaMapMarkedAlt, FaCog, FaClipboardList, FaSearch, FaArrowRight, FaPlus, FaEye, FaRoute } from 'react-icons/fa';

const UnifiedDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getDashboardConfig = (userRole) => {
    const baseConfig = {
      admin: {
        title: 'Admin Dashboard',
        description: 'Welcome to the Courier Management System admin panel. Monitor and manage all aspects of your courier service.',
        cards: [
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
        ],
        quickStats: [
          { label: 'Total Users', value: '1,234', icon: FaUsers, color: 'text-blue-500' },
          { label: 'Active Parcels', value: '856', icon: FaBox, color: 'text-green-500' },
          { label: 'Delivery Agents', value: '45', icon: FaTruck, color: 'text-orange-500' },
          { label: 'Revenue', value: '$12.5K', icon: FaChartBar, color: 'text-purple-500' }
        ]
      },
      customer: {
        title: 'Customer Dashboard',
        description: 'Welcome to your personal courier dashboard. Book parcels, track shipments, and manage your deliveries.',
        cards: [
          {
            title: 'Book Parcel',
            description: 'Create a new parcel booking for delivery',
            icon: FaPlus,
            path: '/customer/book-parcels',
            color: 'bg-blue-500',
            stats: 'Quick Booking'
          },
          {
            title: 'My Bookings',
            description: 'View all your parcel bookings and their status',
            icon: FaClipboardList,
            path: '/customer/bookings',
            color: 'bg-green-500',
            stats: 'View History'
          },
          {
            title: 'Track Parcel',
            description: 'Real-time tracking of your parcels',
            icon: FaSearch,
            path: '/customer/track-parcel',
            color: 'bg-purple-500',
            stats: 'Live Tracking'
          },
          {
            title: 'Profile Settings',
            description: 'Manage your account and preferences',
            icon: FaCog,
            path: '/customer/profile',
            color: 'bg-gray-500',
            stats: 'Update Info'
          }
        ],
        quickStats: [
          { label: 'Total Bookings', value: '12', icon: FaBox, color: 'text-blue-500' },
          { label: 'In Transit', value: '3', icon: FaTruck, color: 'text-orange-500' },
          { label: 'Delivered', value: '9', icon: FaClipboardList, color: 'text-green-500' },
          { label: 'Total Spent', value: '$245', icon: FaChartBar, color: 'text-purple-500' }
        ]
      },
      'delivery agent': {
        title: 'Delivery Agent Dashboard',
        description: 'Welcome to your delivery dashboard. Manage your assigned parcels and optimize your delivery routes.',
        cards: [
          {
            title: 'Assigned Parcels',
            description: 'View parcels assigned to you for delivery',
            icon: FaBox,
            path: '/agent/assigned-parcels',
            color: 'bg-blue-500',
            stats: '8 Parcels'
          },
          {
            title: 'My Route',
            description: 'View and optimize your delivery route',
            icon: FaRoute,
            path: '/agent/route',
            color: 'bg-green-500',
            stats: 'Optimize Route'
          },
          {
            title: 'Delivery History',
            description: 'Track your completed deliveries and performance',
            icon: FaClipboardList,
            path: '/agent/history',
            color: 'bg-purple-500',
            stats: '156 Delivered'
          },
          {
            title: 'Profile Settings',
            description: 'Update your profile and availability',
            icon: FaCog,
            path: '/agent/profile',
            color: 'bg-gray-500',
            stats: 'Update Info'
          }
        ],
        quickStats: [
          { label: 'Assigned Today', value: '8', icon: FaBox, color: 'text-blue-500' },
          { label: 'Completed', value: '5', icon: FaClipboardList, color: 'text-green-500' },
          { label: 'In Progress', value: '3', icon: FaTruck, color: 'text-orange-500' },
          { label: 'Earnings Today', value: '$85', icon: FaChartBar, color: 'text-purple-500' }
        ]
      }
    };

    return baseConfig[userRole?.toLowerCase()] || baseConfig.customer;
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  const config = getDashboardConfig(user.role);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{config.title}</h1>
        <p className="text-gray-600">{config.description}</p>
        <div className="mt-4 text-sm text-gray-500">
          Welcome back, <span className="font-medium text-gray-700">{user.full_name}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {config.quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <IconComponent className={stat.color} size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {config.cards.map((card, index) => {
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
          {user.role?.toLowerCase() === 'admin' && (
            <>
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
            </>
          )}
          {user.role?.toLowerCase() === 'customer' && (
            <>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Your parcel #PKG-2024-005 has been delivered</span>
                <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">New booking #PKG-2024-006 confirmed</span>
                <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
              </div>
            </>
          )}
          {user.role?.toLowerCase() === 'delivery agent' && (
            <>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Parcel #PKG-2024-003 delivered successfully</span>
                <span className="text-xs text-gray-500 ml-auto">30 min ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">New parcel assigned: #PKG-2024-007</span>
                <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
              </div>
            </>
          )}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-700">System maintenance completed</span>
            <span className="text-xs text-gray-500 ml-auto">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedDashboard;