import {
  createContext,
  useEffect,
  useState,
} from "react";

import type { User } from "../types/user";

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string;
  addUser: (user: User) => void;
  deleteUser: (id: number) => void;
  updateUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: User[] = await response.json();

        setUsers(data);
      } catch {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = (newUser: User) => {
    setUsers((currentUsers) => [
      ...currentUsers,
      newUser,
    ]);
  };

  const deleteUser = (id: number) => {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== id)
    );
  };

  const updateUser = (updatedUser: User) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === updatedUser.id
          ? updatedUser
          : user
      )
    );
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        addUser,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;