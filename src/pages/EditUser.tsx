import { useState } from "react";
import type React from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useUserContext } from "../context/useUserContext";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { users, updateUser, loading, error: contextError } = useUserContext();

  const user = users.find((user) => user.id === Number(id));

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-sm font-medium text-slate-600">Loading user...</p>
        </div>
      </div>
    );
  }

  if (contextError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {contextError}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">User not found</h1>

          <p className="mt-2 text-sm text-slate-500">
            The user you're trying to edit doesn't exist.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <EditUserForm user={user} updateUser={updateUser} navigate={navigate} />
  );
}

interface EditUserFormProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
  updateUser: (user: { id: number; name: string; email: string }) => void;
  navigate: ReturnType<typeof useNavigate>;
}

function EditUserForm({ user, updateUser, navigate }: EditUserFormProps) {
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [error, setError] = useState<string>("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!email.includes("@gmail.com")) {
      setError("Please enter a valid email address");
      return;
    }

    const updatedUser = {
      id: user.id,
      name: name.trim(),
      email: email.trim(),
    };

    updateUser(updatedUser);

    navigate("/");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back */}
      <Link
        to={`/users/${user.id}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
      >
        <span>←</span>
        Back to User Details
      </Link>

      {/* Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            User Management
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Edit User
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update the user's information below.
          </p>
        </div>

        {/* Current User */}
        <div className="mb-8 flex items-center gap-4 rounded-xl bg-slate-50 p-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900">{user.name}</p>

            <p className="truncate text-sm text-slate-500">{user.email}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="edit-name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Full Name
            </label>

            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="edit-email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email Address
            </label>

            <input
              id="edit-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <Link
              to={`/users/${user.id}`}
              className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
