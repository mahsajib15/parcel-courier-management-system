'use client'
import React from 'react';
import BookParcel from '@/components/Shared/BookParcel';

const BookParcelPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Book a New Parcel</h1>
        <BookParcel />
      </div>
    </div>
  );
};

export default BookParcelPage;
