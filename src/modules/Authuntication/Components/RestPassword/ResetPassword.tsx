import { useForm } from 'react-hook-form';
import type { ResetPasswordFormData } from '../../../../api/modules/auth';
import AuthHeader from '../../../Shared/Components/AuthHeader/AuthHeader';
import { Box, Button, FormLabel, IconButton, InputAdornment, TextField } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(data);
  };
  return (
    <>
      <AuthHeader
        title="Reset Password"
        text="If you already have an account register"
        actionText="Login here !"
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
        <Box>
          <FormLabel
            sx={{
              color: "#152C5B",
              fontSize: "12px",
              fontWeight: "bold"
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
        <Box>
          <FormLabel
            sx={{
              color: "#152C5B",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Verification Code
          </FormLabel>
          <TextField
            fullWidth
            placeholder="Enter your code" 
            type="text" 
            {...register("seed", {
              required: "Verification code is required", 
            })}
            error={!!errors.seed}
            helperText={errors.seed?.message}
            sx={textFieldStyle}
          />
        </Box>
        <Box>
          <FormLabel
            sx={{
              color: "#152C5B",
              fontSize: "12px",
              fontWeight: "bold"
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
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
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
              fontSize: "12px",
              fontWeight: "bold",

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
                        <MdVisibilityOff />
                      ) : (
                        <MdVisibility />
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
          submit
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
