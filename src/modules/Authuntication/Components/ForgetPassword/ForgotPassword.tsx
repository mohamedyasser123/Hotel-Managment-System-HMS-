import { useForm } from 'react-hook-form';
import AuthHeader from '../../../Shared/Components/AuthHeader/AuthHeader';
import { Box, Button, CircularProgress, FormLabel, TextField } from '@mui/material';
import type { ForgotPasswordFormData } from '../../../../api/modules/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ForgotPassword() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ForgotPasswordFormData>();
     const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
    const onSubmit = (data: ForgotPasswordFormData) => {
      setLoading(true);

    try {
      console.log(data);
      navigate("/reset-password")
    } finally {
      setLoading(false);
    }
    };
  return (
    <>
    <AuthHeader
            title="Forgot password"
            text="If you already have an account register You can"
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
                      "Send mail"
                    )}
                  </Button>

          </Box>
    </>
  )
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