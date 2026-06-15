import { useEffect, useState } from "react";
import { getUsersList } from "../api/modules/users";
import type { User } from "../types/UsersTypes";

export function useUsers() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
  page: 0,
  pageSize: 5,
});
 const [totalCount, setTotalCount] = useState(0);

  const getUsers = async () => {
    setLoading(true);

    try {
      const response = await getUsersList(        paginationModel.page + 1,
        paginationModel.pageSize);

      setData(response.data.users);
            setTotalCount(response.data.totalCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [paginationModel]);

  return {
    data,
    loading,
    refetch: getUsers, 
    paginationModel,
    setPaginationModel,
    totalCount
  };
}