import { useState } from "react";

import UserCard from "../components/UserCard";
import UserForm from "../components/UserForm";
import { useUserContext } from "../context/UserContext";

function Home() {
  const {
    users,
    loading,
    error,
    addUser,
    deleteUser,
  } = useUserContext();

  const [search, setSearch] = useState<string>("");

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      {/* Hero Section */}
      <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            User Management
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Manage your users
          </h1>

          <p className="mt-2 max-w-xl text-slate-500">
            Add, edit and manage your users from one simple dashboard.
          </p>
        </div>

        <button
          onClick={() =>
            document
              .getElementById("add-user-form")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <span className="text-lg leading-none">+</span>
          Add User
        </button>

      </section>

      {/* Search */}
      <section className="mb-8">

        <div className="relative">

          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search users by name or email..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

        </div>

      </section>

      {/* Add User */}
      <section
        id="add-user-form"
        className="mb-10"
      >
        <UserForm onAddUser={addUser} />
      </section>

      {/* Users Header */}
      <section className="mb-5 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            All Users
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredUsers.length}{" "}
            {filteredUsers.length === 1
              ? "user"
              : "users"}{" "}
            found
          </p>
        </div>

      </section>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-sm font-medium text-slate-600">
            Loading users...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Users */}
      {!loading &&
        !error &&
        filteredUsers.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={deleteUser}
              />
            ))}

          </div>
        )}

      {/* Empty search result */}
      {!loading &&
        !error &&
        filteredUsers.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              🔍
            </div>

            <h3 className="text-lg font-semibold text-slate-900">
              No users found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try searching with a different name or email.
            </p>

          </div>
        )}

    </div>
  );
}

export default Home;