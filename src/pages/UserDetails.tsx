import { Link, useParams } from "react-router-dom";

import { useUserContext } from "../context/UserContext";

function UserDetails() {
  const { id } = useParams();

  const { users, loading, error } = useUserContext();

  const user = users.find((user) => user.id === Number(id));

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-sm font-medium text-slate-600">Loading user...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
            ?
          </div>

          <h1 className="text-xl font-bold text-slate-900">User not found</h1>

          <p className="mt-2 text-sm text-slate-500">
            The user you're looking for doesn't exist.
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
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back */}
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
      >
        <span>←</span>
        Back to Users
      </Link>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Blue Header */}
        <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-600" />

        {/* Profile Content */}
        <div className="px-6 pb-8 sm:px-8">
          {/* Avatar */}
          <div className="-mt-12 mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-linear-to-br from-blue-500 to-indigo-600 text-3xl font-bold text-white shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="pb-1">
                <h1 className="text-2xl font-bold text-slate-900">
                  {user.name}
                </h1>

                <p className="mt-1 text-sm text-slate-500">{user.email}</p>
              </div>
            </div>

            <Link
              to={`/users/${user.id}/edit`}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              Edit User
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Information */}
          <div className="grid gap-4 pt-6 sm:grid-cols-2">
            {/* User ID */}
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                User ID
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                #{user.id}
              </p>
            </div>

            {/* Status */}
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Account Status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-lg font-bold text-slate-900">Active</span>
              </div>
            </div>
          </div>

          {/* Email Information */}
          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              Email Address
            </p>

            <p className="mt-2 break-all font-medium text-slate-800">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
