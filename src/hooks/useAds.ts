import { useEffect, useState } from "react";
import {
  createAds,
  deleteAds,
  getAds,
  updateAds,
} from "../api/modules/ads";

import { getRooms } from "../api/modules/rooms";

import { useForm } from "react-hook-form";

import type {
  Ads,
  CreateAdsData,
} from "../types/ads.Type";

import type { Room } from "../types/room.Type";

import { toast } from "react-toastify";

export function useAds() {
  const [data, setData] = useState<Ads[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedAd, setSelectedAd] =
    useState<Ads | null>(null);

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
  } = useForm<CreateAdsData>();

  // GET ADS
  const getAdsList = async () => {
    setLoading(true);

    try {
      const response = await getAds(
                  paginationModel.page + 1,
        paginationModel.pageSize
      );

      console.log(response);

      setData(response.data.ads);
            setTotalCount(response.data.totalCount);

    } finally {
      setLoading(false);
    }
  };

  // GET ROOMS
  const getRoomsList = async () => {
    try {
      const response = await getRooms(                  paginationModel.page + 1,
        paginationModel.pageSize);
      setRooms(response.data.rooms);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  /* CREATE & UPDATE ADS */
  const onSubmit = async (
    formData: CreateAdsData,
    onClose?: () => void
  ) => {
    try {
      let response;

      if (selectedAd) {
        console.log(formData);
  response = await updateAds(
    selectedAd._id,
    {
      discount: formData.discount,
      isActive: formData.isActive,
    }
  );
} else {
  response = await createAds(formData);
}

      toast.success(response.message);

      reset();

      getAdsList();

      setSelectedAd(null);

      onClose?.();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  /* DELETE ADS */
  const handleDelete = async (id: string) => {
    console.log("DELETE ID SENT =>", id);
    try {
      const response = await deleteAds(id);
console.log("DELETE RESPONSE =>", response);
      toast.success(response.message);

      getAdsList();
    } catch (error: any) {
      console.log("DELETE ERROR =>", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  useEffect(() => {
    getAdsList();
    getRoomsList();
  }, [paginationModel]);

  return {
    data,
    rooms,
    loading,
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    selectedAd,
    setSelectedAd,
    setValue,
    handleDelete,
    paginationModel,
    setPaginationModel,
    totalCount
  };
}