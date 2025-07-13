'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUsers, FaBox, FaTruck, FaChartBar, FaMapMarkedAlt, FaCog, FaClipboardList, FaSearch } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'Admin') {
      router.push('/auth/login');
    }
  }, []);

  const menuItems = [
    {
      icon: FaUsers,
      label: 'See Users',
      path: '/admin/users',
      description: 'Manage all users'
    },
    {
      icon: FaClipboardList,
      label: 'Booking History',
      path: '/admin/bookings',
      description: 'View all bookings'
    },
    {
      icon: FaSearch,
      label: 'Track Parcel',
      path: '/admin/track',
      description: 'Track any parcel'
    },
    {
      icon: FaBox,
      label: 'Parcel Management',
      path: '/admin/parcels',
      description: 'Manage all parcels'
    },
    {
      icon: FaTruck,
      label: 'Delivery Agents',
      path: '/admin/agents',
      description: 'Manage delivery agents'
    },
    {
      icon: FaMapMarkedAlt,
      label: 'Route Management',
      path: '/admin/routes',
      description: 'Optimize delivery routes'
    },
    {
      icon: FaChartBar,
      label: 'Reports & Analytics',
      path: '/admin/reports',
      description: 'View business insights'
    },
    {
      icon: FaCog,
      label: 'System Settings',
      path: '/admin/settings',
      description: 'Configure system'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-72 bg-gradient-to-b from-blue-800 to-blue-900 text-white shadow-xl">
        <div className="p-6 border-b border-blue-700">
          <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
          <p className="text-blue-200 text-sm text-center mt-1">Courier Management System</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <button
                    onClick={() => router.push(item.path)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-700 rounded-lg transition-all duration-200 flex items-center space-x-3 group"
                  >
                    <IconComponent className="text-blue-200 group-hover:text-white transition-colors" size={18} />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-blue-200 group-hover:text-blue-100">{item.description}</div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-blue-700 rounded-lg p-3 text-center">
            <p className="text-xs text-blue-200">System Status: Online</p>
          </div>
        </div>
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}