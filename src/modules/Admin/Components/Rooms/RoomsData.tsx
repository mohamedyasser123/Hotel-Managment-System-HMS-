import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate, useParams } from "react-router-dom";
import { useRooms } from "../../../../hooks/useRooms";
import { useForm } from "react-hook-form";
import { useFacilities } from "../../../../hooks/useFacilities";
import { useEffect, useState } from "react";
import type { RoomForm } from "../../../../types/roomTypes";
import { useTranslation } from "react-i18next";
export default function RoomsData() {
  const { t } = useTranslation("admin");
  const { onSubmit, loading, selectedRoom ,setSelectedRoom,data} = useRooms();
  const navigate = useNavigate();
  const { data: facilitiesList, getFacilitiesList } = useFacilities();


const { id } = useParams();
  const {
  register,
  handleSubmit,
  setValue,
  watch,
  reset,
  formState: { errors },
} = useForm<RoomForm>({
  defaultValues: {
    roomNumber: "",
    price: "",
    capacity: "",
    discount: "0",
    facilities: [],
  },
});

  const watchedFacilities = watch("facilities");
const [previewImages, setPreviewImages] = useState<string[]>([]);
const [newImages, setNewImages] = useState<File[]>([]);
const [, setOldImages] = useState<string[]>([]);
const filesLength = newImages.length;
const onSubmitHandler = async (data: RoomForm) => {
  const formData = new FormData();

  formData.append("roomNumber", data.roomNumber);
  formData.append("price", data.price);
  formData.append("capacity", data.capacity);
  formData.append("discount", data.discount);

  data.facilities.forEach((id) => {
    formData.append("facilities[]", id);
  });

  if (newImages.length > 0) {
    newImages.forEach((img) => {
      formData.append("imgs", img);
    });
  } else {
    try {
      const filePromises = previewImages.map(async (imgUrl) => {
        const response = await fetch(imgUrl);
        const blob = await response.blob();
        const fileName = imgUrl.split('/').pop() || 'old_image.jpg';
        return new File([blob], fileName, { type: blob.type });
      });

      const files = await Promise.all(filePromises);

      files.forEach((file) => {
        formData.append("imgs", file);
      });
    } catch (error) {
      console.error("Error converting URLs to Files in parallel:", error);
    }
  }

  onSubmit(
    formData,
    () => navigate("/admin/room-list"),
    id
  );
};
useEffect(() => {
  if (!id || !data) return;

  const room = data.find((r) => r._id === id);
  if (!room) return;

  setSelectedRoom(room);

  reset({
    roomNumber: room.roomNumber,
    price: String(room.price),
    capacity: String(room.capacity),
    discount: String(room.discount),
    facilities: room.facilities.map((f: any) => f._id || f),
  });

  setPreviewImages(room.images || []);
  setOldImages(room.images || []);
}, [id, data]);

useEffect(() => {
  getFacilitiesList();
}, []);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      sx={{
        p: 4,
        bgcolor: "#fff",
        borderRadius: 3,
        maxWidth: "750px",
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Room Number */}
      <TextField
        fullWidth
        label={t("roomData.roomNumber")}
        slotProps={{
    inputLabel: { shrink: true }
  }}
        {...register("roomNumber", {
         required: t("roomData.validation.roomNumberRequired"),
        })}
        error={!!errors.roomNumber}
        helperText={errors.roomNumber?.message as string}
        sx={textFieldStyle}
      />

      {/* Price + Capacity */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label={t("roomData.price")}
          type="number"
          slotProps={{
    inputLabel: { shrink: true }
  }}
          {...register("price", { required: t("roomData.validation.priceRequired") })}
          error={!!errors.price}
          helperText={errors.price?.message as string}
          sx={textFieldStyle}
        />

        <TextField
          fullWidth
          label={t("roomData.capacity")}
          type="number"
          {...register("capacity", {
           required: t("roomData.validation.capacityRequired"),
          })}
          error={!!errors.capacity}
          helperText={errors.capacity?.message as string}
          slotProps={{
    inputLabel: { shrink: true }
  }}
          sx={textFieldStyle}
        />
      </Box>

      {/* Discount + Facilities */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label={t("roomData.discount")}
          type="number"
          slotProps={{
    inputLabel: { shrink: true }
  }}
          {...register("discount")}
          sx={textFieldStyle}
        />

        <FormControl fullWidth sx={textFieldStyle}>
          <InputLabel>{t("roomData.facilities")}</InputLabel>
          <Select
            multiple
            value={watchedFacilities || []}
            onChange={(e) =>
              setValue("facilities", e.target.value as any)
            }
            renderValue={(selected: any) =>
              facilitiesList
                .filter((f) => selected.includes(f._id))
                .map((f) => f.name)
                .join(", ")
            }
          >
            {facilitiesList.map((facility) => (
              <MenuItem key={facility._id} value={facility._id}>
                {facility.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Upload */}
      <Box
        component="label"
        sx={{
          border: "1px dashed #4caf50",
          borderRadius: 2,
          bgcolor: "#f9fff9",
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;

  if (!files) return;

  setNewImages((prev) => [
    ...prev,
    ...Array.from(files),
  ]);
}}
        />

        <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />

       <Typography>
  {t("roomData.uploadImages")}
</Typography>

        {filesLength > 0 && (
  <Typography sx={{ mt: 1, color: "green" }}>
    {filesLength} {t("roomData.newFilesSelected")}
  </Typography>
)}
      </Box>

      {/* Preview Images */}
      {previewImages.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {previewImages.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              sx={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 1,
                border: "1px solid #ddd",
              }}
            />
          ))}
        </Box>
      )}

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/admin/room-list")}
        >
         {t("roomData.cancel")}
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading
            ? t("roomData.saving")
            : selectedRoom
            ? t("roomData.updateRoom")
            : t("roomData.saveRoom")}
        </Button>
      </Box>
    </Box>
  );
}

/* styles */
const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F5F6F8',
    borderRadius: '4px',

    '& fieldset': {
      border: 'none',
    },

    '& input': {
      padding: '10px 12px',
      fontSize: '14px',
    },
  },
};