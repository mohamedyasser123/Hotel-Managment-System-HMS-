import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ChangePasswordFormData } from "../../../../api/modules/auth";
import AuthHeader from "../../../Shared/Components/AuthHeader/AuthHeader";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordFormData>();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const onSubmit = async (data: ChangePasswordFormData) => {
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
        title="Change Password"
        text="If you already have an account"
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
        }}
      >
        <Box>
          <FormLabel
            sx={{
              color: "#152C5B",
              fontSize: "14px",
              fontWeight: "500",
              mb: 1,
              display: "block",
            }}
          >
            Old Password
          </FormLabel>

          <TextField
            fullWidth
            placeholder="Enter your old password"
            type={showOldPassword ? "text" : "password"}
            {...register("oldPassword", {
              required: "Old Password is required",
            })}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword?.message}
            sx={textFieldStyle}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      edge="end"
                    >
                      {showOldPassword ? (
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

        <Box>
          <FormLabel
            sx={{
              color: "#152C5B",
              fontSize: "14px",
              fontWeight: "500",
              mb: 1,
              display: "block",
            }}
          >
            Password
          </FormLabel>

          <TextField
            fullWidth
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={textFieldStyle}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
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

        <Box>
          <FormLabel
            sx={{
              color: "#152C5B",
              fontSize: "14px",
              fontWeight: "500",
              mb: 1,
              display: "block",
            }}
          >
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
                      edge="end"
                    >
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
                   "Change Password"
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