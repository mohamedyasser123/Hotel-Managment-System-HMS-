import {
  Box,
  Button,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import type { SignUpFormData } from "../../../../api/modules/auth";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import AuthHeader from "../../../Shared/Components/AuthHeader/AuthHeader";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const navigate  = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);

    try {
      console.log(data);
      navigate("/login")
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader
        title="Sign up"
        text="If you already have an account register"
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
        {/* 1. USER NAME */}
        <Box>
          <FormLabel
            sx={{
              color: "#152C5B",
              fontSize: "14px",
              fontWeight: "500",
              mb: 1,
              display: "block",
            }}>
            User Name
          </FormLabel>
          <TextField
            fullWidth
            placeholder="Enter your username"
            {...register("userName", { required: "User Name is required" })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            sx={textFieldStyle}
          />
        </Box>

        {/* Phone & Country  */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}>
          <Box sx={{ flex: 1 }}>
            <FormLabel
              sx={{
                color: "#152C5B",
                fontSize: "14px",
                fontWeight: "500",
                mb: 1,
                display: "block",
              }}>
              Phone
            </FormLabel>
            <TextField
              fullWidth
              placeholder="Enter phone"
              {...register("phone", {
                required: "Phone is required",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={textFieldStyle}
            />
          </Box>
        </Box>

        {/* 3. EMAIL ADDRESS */}
        <Box>
          <FormLabel
            sx={{
              color: "#152C5B",
              fontSize: "14px",
              fontWeight: "500",
              mb: 1,
              display: "block",
            }}>
            Email Address
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

        {/* 4. PASSWORD */}
        <Box>
          <FormLabel
            sx={{
              color: "#152C5B",
              fontSize: "14px",
              fontWeight: "500",
              mb: 1,
              display: "block",
            }}>
            Password
          </FormLabel>
          <TextField
            fullWidth
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={textFieldStyle}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end">
                      {showPassword ? (
                        <MdVisibilityOff size={18} color="#152C5B" />
                      ) : (
                        <MdVisibility size={18} color="#152C5B" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* 5. CONFIRM PASSWORD */}
        <Box>
          <FormLabel
            sx={{
              color: "#152C5B",
              fontSize: "14px",
              fontWeight: "500",
              mb: 1,
              display: "block",
            }}>
            Confirm Password
          </FormLabel>
          <TextField
            fullWidth
            placeholder="Confirm your password"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={textFieldStyle}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end">
                      {showConfirmPassword ? (
                        <MdVisibilityOff size={18} color="#152C5B" />
                      ) : (
                        <MdVisibility size={18} color="#152C5B" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
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
            "Sign up"
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
