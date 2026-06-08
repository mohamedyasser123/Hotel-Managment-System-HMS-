import { useForm } from 'react-hook-form';
import type { ResetPasswordFormData } from '../../../../api/modules/auth';
import AuthHeader from '../../../Shared/Components/AuthHeader/AuthHeader';
import { Box, Button, CircularProgress, FormLabel, IconButton, InputAdornment, TextField } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

export default function ResetPassword() {
    const { t } = useTranslation("auth");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>();
  const currentRole = window.location.pathname.includes("admin") ? "admin" : "user";
  const { isLoading, handleResetPassword } = useAuth(currentRole);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 
  return  (
    <>
      <AuthHeader
        title={t('resetPassword.title')} 
        text={t('resetPassword.subtitle')} 
        actionText={t('resetPassword.action')} 
        actionPath="/login"
      />
      
      <Box
        component="form"
        onSubmit={handleSubmit(handleResetPassword)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          width: "100%",
        }}
      >
        <Box>
          <FormLabel
           sx={labelStyle}
          >
            {t('resetPassword.email')}
          </FormLabel>
          <TextField
            fullWidth
            placeholder={t('resetPassword.emailPlaceholder')}
            {...register("email", {
              required: t('validation.requiredEmail'),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t('validation.invalidEmail'),
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={textFieldStyle}
          />
        </Box>

        <Box>
          <FormLabel
           sx={labelStyle}
          >
            {t('verify.otp')}
          </FormLabel>
          <TextField
            fullWidth
            placeholder={t('verify.otpPlaceholder')}
            type="text"
            {...register("seed", {
              required: t('validation.requiredOtp'),
            })}
            error={!!errors.seed}
            helperText={errors.seed?.message}
            sx={textFieldStyle}
          />
        </Box>

        <Box>
          <FormLabel
             sx={labelStyle}
          >
            {t('resetPassword.password')}
          </FormLabel>
          <TextField
            fullWidth
            placeholder={t('resetPassword.passwordPlaceholder')}
            type={showPassword ? "text" : "password"}
            {...register("password", { required: t('validation.requiredPassword') })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={textFieldStyle}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
            sx={labelStyle}
          >
            {t('resetPassword.confirmPassword')}
          </FormLabel>
          <TextField
            fullWidth
            placeholder={t('resetPassword.confirmPasswordPlaceholder')}
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: t('validation.requiredConfirmPassword'),
              validate: (value) =>
                value === watch("password") || t('validation.passwordsNotMatch'),
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={textFieldStyle}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
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
          disabled={isLoading}
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
          }}
        >
          {isLoading ? (
            <CircularProgress size={22} sx={{ color: "#fff" }} />
          ) : (
            t('resetPassword.button')
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
const labelStyle = {
  color: "#152C5B",
  fontSize: "14px",
  fontWeight: 500,
  mb: 1,
  display: "block",
};