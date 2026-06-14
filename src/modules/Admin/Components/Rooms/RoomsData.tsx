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

export default function RoomsData() {
  const { onSubmit, loading, selectedRoom ,setSelectedRoom,data} = useRooms();
  const navigate = useNavigate();
  const { data: facilitiesList, getFacilitiesList } = useFacilities();

  const [previewImages, setPreviewImages] = useState<string[]>([]);

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
    imgs: null,
  },
});

  const watchedFacilities = watch("facilities");
  const watchedImgs = watch("imgs");
const filesLength = watchedImgs ? (watchedImgs as FileList).length : 0;
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
    facilities: room.facilities.map((f: any) => f._id),
    imgs: null,
  });

  setPreviewImages(room.images || []);
  getFacilitiesList();
}, [id, data]);
const onSubmitHandler = (data: RoomForm) => {
    console.log("files", data.imgs);

  const formData = new FormData();

  formData.append("roomNumber", data.roomNumber);
  formData.append("price", data.price);
  formData.append("capacity", data.capacity);
  formData.append("discount", data.discount);

  data.facilities.forEach((id) => {
    formData.append("facilities[]", id);
  });


  const files = data.imgs as any; 
  if (files && files.length > 0) {
    Array.from(files).forEach((file: any) => {
      formData.append("imgs", file);
    });
  }

  onSubmit(formData, () => {
    navigate("/admin/room-list");
  }, id);
};

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
        label="Room Number"
        slotProps={{
    inputLabel: { shrink: true }
  }}
        {...register("roomNumber", {
          required: "Room number is required",
        })}
        error={!!errors.roomNumber}
        helperText={errors.roomNumber?.message as string}
        sx={textFieldStyle}
      />

      {/* Price + Capacity */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Price"
          type="number"
          slotProps={{
    inputLabel: { shrink: true }
  }}
          {...register("price", { required: "Price is required" })}
          error={!!errors.price}
          helperText={errors.price?.message as string}
          sx={textFieldStyle}
        />

        <TextField
          fullWidth
          label="Capacity"
          type="number"
          {...register("capacity", {
            required: "Capacity is required",
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
          label="Discount"
          type="number"
          slotProps={{
    inputLabel: { shrink: true }
  }}
          {...register("discount")}
          sx={textFieldStyle}
        />

        <FormControl fullWidth sx={textFieldStyle}>
          <InputLabel>Facilities</InputLabel>
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
          onChange={(e) =>
            setValue("imgs", e.target.files as any)
          }
        />

        <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />

        <Typography>
          Drag & Drop or Choose Images
        </Typography>

        {filesLength > 0 && (
  <Typography sx={{ mt: 1, color: "green" }}>
    {filesLength} new files selected
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
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : selectedRoom
            ? "Update Room"
            : "Save Room"}
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