import { useEffect, useState } from "react";
import { getUsersList } from "../api/modules/users";
import type { User } from "../types/UsersTypes";

export function useUsers() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);

    try {
      const response = await getUsersList();

      setData(response.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    data,
    loading,
    refetch: getUsers, // optional مفيد جدًا
  };
}