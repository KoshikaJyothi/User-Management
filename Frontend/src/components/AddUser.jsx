import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const onFormSubmit = async (data) => {
    try {
      setServerError('');
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          age: Number(data.age),
          dateofbirth: data.dateofbirth || undefined,
          mobileNumber: data.mobileNumber ? Number(data.mobileNumber) : undefined,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        setServerError(result.message || 'Failed to create user');
        return;
      }
      navigate('/user-list');
    } catch (err) {
      setServerError('Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New User</h1>
      {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border rounded px-3 py-2"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border rounded px-3 py-2"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age *</label>
          <input
            type="number"
            {...register("age", { required: "Age is required", min: { value: 1, message: "Age must be positive" } })}
            className="w-full border rounded px-3 py-2"
            placeholder="25"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            {...register("dateofbirth")}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <input
            type="tel"
            {...register("mobileNumber")}
            className="w-full border rounded px-3 py-2"
            placeholder="9876543210"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser
