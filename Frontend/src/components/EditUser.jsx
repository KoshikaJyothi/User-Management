import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/user/${id}`);
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();
        const user = data.payload;
        reset({
          name: user.name,
          email: user.email,
          age: user.age,
          dateofbirth: user.dateofbirth ? user.dateofbirth.substring(0, 10) : '',
          mobileNumber: user.mobileNumber || '',
        });
      } catch (err) {
        setServerError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id, reset]);

  const onFormSubmit = async (data) => {
    try {
      setServerError('');
      const res = await fetch(`/api/user/${id}`, {
        method: 'PUT',
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
        setServerError(result.message || 'Failed to update user');
        return;
      }
      navigate(`/user/${id}`);
    } catch (err) {
      setServerError('Something went wrong');
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age *</label>
          <input
            type="number"
            {...register("age", { required: "Age is required", min: { value: 1, message: "Age must be positive" } })}
            className="w-full border rounded px-3 py-2"
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
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium"
          >
            Update User
          </button>
          <button
            type="button"
            onClick={() => navigate(`/user/${id}`)}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser
