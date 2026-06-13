import { useEffect, useState } from "react";
import { createFacilities, deleteFacility, getFacilities, updateFacility } from "../api/modules/facilities";
import { useForm } from "react-hook-form";
import type { CreateFacilityData, Facility } from "../types/facilitiesTyepes";
import { toast } from "react-toastify";

export function useFacilities() {
const [data, setData] = useState<Facility[]>([]);
const [loading, setLoading] = useState(false);
const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

    const {
    register,
    handleSubmit,
    reset,
    setValue, 
    formState: { errors },
  } = useForm<CreateFacilityData>();



  // Get Facilities
  const getFacilitiesList = async () => {
    setLoading(true);
    try {
      const resposne = await getFacilities();
      console.log(resposne);
      setData(resposne.data.facilities);
    } finally {
      setLoading(false);
    }
  };



  /* CREATE & UPDATE FACILITY */
const onSubmit = async (
  formData: CreateFacilityData,
  onClose?: () => void
) => {
  try {
    let response;

    if (selectedFacility) {
      response = await updateFacility(
        selectedFacility._id,
        formData
      );
    } else {
      response = await createFacilities(formData);
    }

    toast.success(response.message);

    reset();

    getFacilitiesList();

    setSelectedFacility(null);

    onClose?.();
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
        "Something went wrong"
    );
  }
};


  /* DELETE  FACILITY */
const handleDelete = async (id: string) => {
  try {
    const response = await deleteFacility(id);

    toast.success(response.message);

    getFacilitiesList();
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
        "Something went wrong"
    );
  }
};


  
  useEffect(() => {
    getFacilitiesList();
  }, []);

  return {
  data,
  loading,
  register,
  handleSubmit,
  onSubmit,
  errors,
  reset,
  selectedFacility,
  setSelectedFacility,
  setValue,
  handleDelete,
  getFacilitiesList
};
}