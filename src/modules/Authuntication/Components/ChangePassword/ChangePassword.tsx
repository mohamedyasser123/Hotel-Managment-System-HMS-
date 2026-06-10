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
import useAuth from "../../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
export default function ChangePassword() {
    const { t } = useTranslation("auth");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordFormData>();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const savedRole = (localStorage.getItem("role") as "admin" | "user") || "user";
 const { isLoading, handleChangePassword } = useAuth(savedRole);

 return (
  <>
    <AuthHeader
      title={t('changePassword.title')} 
      text={t('changePassword.subtitle')} 
      actionText={t('changePassword.action')} 
      actionPath="/login"
    />

    <Box
      component="form"
      onSubmit={handleSubmit(handleChangePassword)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        width: "100%",
      }}
    >
      <Box>
        <FormLabel sx={labelStyle}>
          {t('changePassword.oldPassword')}
        </FormLabel>

        <TextField
          fullWidth
          placeholder={t('changePassword.oldPasswordPlaceholder')}
          type={showOldPassword ? "text" : "password"}
          {...register("oldPassword", {
            required: t('validation.requiredOldPassword'),
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
        <FormLabel sx={labelStyle}>
          {t('changePassword.password')}
        </FormLabel>

        <TextField
          fullWidth
          placeholder={t('changePassword.passwordPlaceholder')}
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: t('validation.requiredPassword'),
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
        <FormLabel sx={labelStyle}>
          {t('changePassword.confirmPassword')}
        </FormLabel>

        <TextField
          fullWidth
          placeholder={t('changePassword.confirmpasswordPlaceholder')}
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
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
     
                 "&.Mui-disabled": {
                   backgroundColor: "#3252DF",
                   color: "#fff",
                 },
               }}>
               {isLoading ? (
                 <CircularProgress size={22} sx={{ color: "#fff" }} />
               ) : (
                 t("changePassword.button")
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