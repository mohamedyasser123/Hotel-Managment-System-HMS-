import { useForm } from 'react-hook-form';
import AuthHeader from '../../../Shared/Components/AuthHeader/AuthHeader';
import { Box, Button, FormLabel, TextField } from '@mui/material';
import type { ForgotPasswordFormData } from '../../../../api/modules/auth';

export default function ForgotPassword() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ForgotPasswordFormData>();
    const onSubmit = (data: ForgotPasswordFormData) => {
      console.log(data);
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
              fontSize: "12px",
              fontWeight:"bold"
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
          sx={{
            backgroundColor: "#3252DF",
            height: 46,
            borderRadius: "4px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            marginTop: "8px",
            "&:hover": {
              backgroundColor: "#2441c7",
            },
          }}>
          Send mail
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
      fontSize: "11px",
      
    },

    "& input::placeholder": {
      color: "#D3D6DC",
      opacity: 1,
      fontSize: "11px",
    },
  },
};