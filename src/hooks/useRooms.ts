import { useEffect, useState } from "react";
import { createRoom, deleteRoom, getRooms, updateRoom } from "../api/modules/rooms"; 
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { CreateRoomData, Room } from "../types/roomTypes";

export function useRooms() {
  const [data, setData] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
const [paginationModel, setPaginationModel] = useState({
  page: 0,
  pageSize: 5,
});
  const [totalCount, setTotalCount] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateRoomData>();

 const getRoomsList = async () => {
  setLoading(true);

  try {
    const response = await getRooms(
      paginationModel.page + 1,
      paginationModel.pageSize
    );

    setData(response.data.rooms);
setTotalCount(response.data.totalCount);
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
      "Failed to fetch rooms"
    );
  } finally {
    setLoading(false);
  }
};

const onSubmit = async (
  formData: FormData,
  onSuccess?: () => void,
  id?: string
) => {
  setLoading(true);

  try {
    let response;

    if (id) {
      response = await updateRoom(id, formData);
    } else {
      response = await createRoom(formData);
    }

    toast.success(response.message);

    if (onSuccess) onSuccess();
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error");
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteRoom(id);
      toast.success(response.message);
      setData((prevData) => prevData.filter((room) => room._id !== id));
      getRoomsList();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  useEffect(() => {
    getRoomsList();
  }, [paginationModel.page, paginationModel.pageSize]);

  return {
    
    data,
    loading,
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    selectedRoom,
    setSelectedRoom,
    setPaginationModel,
    setValue,
    handleDelete,
    paginationModel,
    totalCount
  };
}