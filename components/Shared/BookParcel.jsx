"use client";

import React from "react";
import { useForm } from "react-hook-form";

const BookParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log("Parcel Booking Data:", data);
    // You can send `data` to backend via fetch/axios here
    reset();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Book a Parcel Pickup</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Pickup Address */}
        <div>
          <label className="block mb-1 font-semibold">Pickup Address</label>
          <input
            type="text"
            {...register("pickupAddress", { required: true })}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter pickup address"
          />
          {errors.pickupAddress && (
            <p className="text-red-500 text-sm">Pickup address is required</p>
          )}
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block mb-1 font-semibold">Delivery Address</label>
          <input
            type="text"
            {...register("deliveryAddress", { required: true })}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Enter delivery address"
          />
          {errors.deliveryAddress && (
            <p className="text-red-500 text-sm">Delivery address is required</p>
          )}
        </div>

        {/* Parcel Type/Size */}
        <div>
          <label className="block mb-1 font-semibold">Parcel Type/Size</label>
          <select
            {...register("parcelType", { required: true })}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option value="">Select a size</option>
            <option value="small">Small (0-2 kg)</option>
            <option value="medium">Medium (2-5 kg)</option>
            <option value="large">Large (5-10 kg)</option>
            <option value="extra-large">Extra Large (10+ kg)</option>
          </select>
          {errors.parcelType && (
            <p className="text-red-500 text-sm">Parcel size/type is required</p>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <label className="block mb-1 font-semibold">Payment Method</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                value="cod"
                {...register("paymentMethod", { required: true })}
              />
              <span>Cash on Delivery (COD)</span>
            </label>

            <label className="flex items-center space-x-1">
              <input
                type="radio"
                value="prepaid"
                {...register("paymentMethod", { required: true })}
              />
              <span>Prepaid</span>
            </label>
          </div>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm">Payment method is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-500"
          >
            Book Pickup
          </button>
        </div>
      </form>
    </div>
  );
};


export default BookParcel
