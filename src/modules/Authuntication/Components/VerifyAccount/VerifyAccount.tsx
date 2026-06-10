import { Box, Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import AuthHeader from "../../../Shared/Components/AuthHeader/AuthHeader";
import type { VerifyAccountFormData } from "../../../../api/modules/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
export default function VerifyForm() {
    const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyAccountFormData>();

  const onSubmit = async (data: VerifyAccountFormData) => {
    setLoading(true);

    try {
      console.log(data);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader
        title="Verify Account"
        text="If you already verified your account"
        actionText="Login here!"
        actionPath="/login"
      />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          width: "100%",
        }}>
        {/* EMAIL */}
        <Box>
          <FormLabel
            sx={{
              color: "#152C5B",
              fontSize: "14px",
              fontWeight: "500",
              mb: 1,
              display: "block",
            }}>
            Email
          </FormLabel>

          <TextField
            fullWidth
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={textFieldStyle}
          />
        </Box>

        {/* OTP */}
        <Box>
          <FormLabel
            sx={{
              color: "#152C5B",
              fontSize: "14px",
              fontWeight: "500",
              mb: 1,
              display: "block",
            }}>
            OTP
          </FormLabel>

          <TextField
            fullWidth
            placeholder="Enter OTP code"
            {...register("otp", {
              required: "OTP is required",
            })}
            error={!!errors.otp}
            helperText={errors.otp?.message}
            sx={textFieldStyle}
          />
        </Box>

        {/* BUTTON */}
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "#3252DF",
            height: 46,
            borderRadius: "4px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 500,
            marginTop: "8px",

            "&:hover": {
              backgroundColor: "#2441c7",
            },
          }}>
          {loading ? (
            <CircularProgress
              size={22}
              sx={{
                color: "#fff",
              }}
            />
          ) : (
            "Verify Account"
          )}
        </Button>
      </Box>
    </>
  );
}

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F5F6F8",
    borderRadius: "4px",
    height: "44px",

    "& fieldset": {
      border: "none",
    },

    "& input": {
      padding: "8px 12px",
      fontSize: "14px",
    },

    "& input::placeholder": {
      color: "#D3D6DC",
      opacity: 1,
      fontSize: "14px",
    },
  },
};
