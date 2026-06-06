import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom"
import type { LoginFormData } from '../../../../api/modules/auth';
import AuthHeader from '../../../Shared/Components/AuthHeader/AuthHeader';
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useState } from 'react';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <>
      <AuthHeader
        title="Sign In"
        text="If you don't have an account register"
        actionText="Register here !"
        actionPath="/register"
      />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
          width: '100%',
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
            Email 
          </FormLabel>

          <TextField
            fullWidth
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
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
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
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
        <Box
         sx={{
         display: "flex",
         justifyContent: "flex-end",
          }}
         >
        <Link
        to="/forgot-password"
        style={{
        textDecoration: "none",
        color: "#3252DF",
        fontSize: "14px",
         }}
          >
       Forgot Password ?
       </Link>
      </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#3252DF',
            height: 46,
            borderRadius: '4px',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 600,
            marginTop: '8px',
            '&:hover': {
              backgroundColor: '#2441c7',
            },
          }}
        >
          Login
        </Button>
      </Box>
    </>
  );
}

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F5F6F8',
    borderRadius: '4px',
    height: '44px',

    '& fieldset': {
      border: 'none',
    },

    '& input': {
      padding: '8px 12px',
      fontSize: '14px',
    },

    '& input::placeholder': {
      color: '#D3D6DC',
      opacity: 1,
      fontSize: '14px',
    },
  },
};
