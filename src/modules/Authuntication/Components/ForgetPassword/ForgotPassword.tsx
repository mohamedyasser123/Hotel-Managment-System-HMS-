import { useForm } from 'react-hook-form';
import AuthHeader from '../../../Shared/Components/AuthHeader/AuthHeader';
import { Box, Button, CircularProgress, FormLabel, TextField } from '@mui/material';
import type { ForgotPasswordFormData } from '../../../../api/modules/auth';
import useAuth from '../../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword() {
  const { t } = useTranslation("auth");

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ForgotPasswordFormData>();

  const { isLoading, handleForgotPassword } = useAuth("users");
  return (
    <>
    <AuthHeader
           title={t('forgotPassword.title')} 
        text={t('forgotPassword.subtitle')} 
        actionText={t('forgotPassword.action')} 
        actionPath="/login"
          />
          <Box
           component="form"
        onSubmit={handleSubmit(handleForgotPassword)}
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
                      {t('forgotPassword.email')}
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder={t('forgotPassword.emailPlaceholder')}
                      {...register("email", {
                        required:t('validation.requiredEmail'),
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
                    }}>
                    {isLoading ? (
                      <CircularProgress
                        size={22}
                        sx={{
                          color: "#fff",
                        }}
                      />
                    ) : (
                      t('forgotPassword.button')
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