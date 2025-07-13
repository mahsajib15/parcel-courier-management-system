"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import { toast } from "react-hot-toast";

const roles = ["Admin", "Delivery Agent", "Customer"];

const Registration = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { email, password, name, phone, role } = data;

    try {
      // Check if email already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('user_profile')
        .select('email')
        .eq('email', email)
        .single();

      if (existingUser) {
        toast.error("Email already registered");
        return;
      }

      if (checkError && checkError.code !== 'PGRST116') {
        toast.error("Error checking email");
        console.error(checkError);
        return;
      }

      
      const { error: profileError } = await supabase
        .from('user_profile')
        .insert([
          {
            email: email,
            password: password, // Note: In production, you should hash the password
            full_name: name,
            phone: phone,
            role: role.toLowerCase(),
          },
        ]);

      if (profileError) {
        toast.error("Failed to create user profile");
        console.error(profileError);
        return;
      }

      toast.success("Sign up successful");
      router.push("/auth/login");
    } catch (err) {
      toast.error("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 border rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
          Register
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?\d{10,14}$/,
                message: "Invalid phone number",
              },
            })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block mb-1">Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="text-center flex justify-center">
          <p>Already have an account?</p>
          <Link href="/auth/login">
            <button className="text-blue-600 font-bold hover:text-blue-900 ml-2">
              Login now
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
