'use client'
import React, { useState, useEffect } from 'react';
import { FaBox, FaMapMarkerAlt, FaPhone, FaCheckCircle } from 'react-icons/fa';

const AssignedParcels = () => {
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    setParcels([
      {
        id: 'PKG-2024-001',
        recipient: 'John Doe',
        phone: '+1234567890',
        address: '123 Main St, City',
        priority: 'high',
        status: 'assigned',
        estimatedTime: '2:30 PM'
      },
      {
        id: 'PKG-2024-002',
        recipient: 'Jane Smith',
        phone: '+1234567891',
        address: '456 Oak Ave, Town',
        priority: 'medium',
        status: 'assigned',
        estimatedTime: '3:15 PM'
      }
    ]);
  }, []);

  const markAsDelivered = (parcelId) => {
    setParcels(parcels.map(parcel => 
      parcel.id === parcelId 
        ? { ...parcel, status: 'delivered' }
        : parcel
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Assigned Parcels</h1>
      
      <div className="grid gap-6">
        {parcels.map((parcel) => (
          <div key={parcel.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <FaBox className="text-blue-500" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{parcel.id}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(parcel.priority)}`}>
                    {parcel.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">ETA: {parcel.estimatedTime}</div>
                {parcel.status === 'assigned' && (
                  <button
                    onClick={() => markAsDelivered(parcel.id)}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Mark as Delivered
                  </button>
                )}
                {parcel.status === 'delivered' && (
                  <div className="flex items-center text-green-600 mt-2">
                    <FaCheckCircle className="mr-1" />
                    Delivered
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-red-500" />
                <div>
                  <div className="font-medium text-gray-800">{parcel.recipient}</div>
                  <div className="text-sm text-gray-600">{parcel.address}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-green-500" />
                <div className="text-gray-800">{parcel.phone}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedParcels;