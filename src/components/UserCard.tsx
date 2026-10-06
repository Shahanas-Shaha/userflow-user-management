import { Link } from "react-router-dom";
import type { User } from "../types/user";

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* User Header */}
      <div className="flex items-start justify-between">
        {/* Avatar + User Info */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-slate-900">
              {user.name}
            </h2>

            <p className="truncate text-sm text-slate-500">{user.email}</p>
          </div>
        </div>

        {/* User ID */}
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          #{user.id}
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-slate-100" />

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          to={`/users/${user.id}`}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Details
        </Link>

        <Link
          to={`/users/${user.id}/edit`}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={() => onDelete(user.id)}
          className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserCard;
