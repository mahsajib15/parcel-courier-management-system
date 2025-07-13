'use client'
import React, { useState, useEffect } from 'react';
import { FaBox, FaTruck, FaCheckCircle, FaClock } from 'react-icons/fa';

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    setBookings([
      {
        id: 'PKG-2024-001',
        recipient: 'John Doe',
        address: '123 Main St, City',
        status: 'delivered',
        date: '2024-01-15',
        amount: '$25.00'
      },
      {
        id: 'PKG-2024-002',
        recipient: 'Jane Smith',
        address: '456 Oak Ave, Town',
        status: 'in_transit',
        date: '2024-01-16',
        amount: '$30.00'
      },
      {
        id: 'PKG-2024-003',
        recipient: 'Bob Johnson',
        address: '789 Pine St, Village',
        status: 'pending',
        date: '2024-01-17',
        amount: '$20.00'
      }
    ]);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <FaCheckCircle className="text-green-500" />;
      case 'in_transit': return <FaTruck className="text-blue-500" />;
      case 'pending': return <FaClock className="text-yellow-500" />;
      default: return <FaBox className="text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'in_transit': return 'In Transit';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(booking.status)}
                    <div>
                      <h3 className="font-semibold text-gray-800">{booking.id}</h3>
                      <p className="text-sm text-gray-600">To: {booking.recipient}</p>
                      <p className="text-sm text-gray-600">{booking.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">{getStatusText(booking.status)}</div>
                    <div className="text-sm text-gray-600">{booking.date}</div>
                    <div className="text-sm font-semibold text-blue-600">{booking.amount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBookings;