import {
  Box,
  Button,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Avatar,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";

import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AuthHeader from "../../../Shared/Components/AuthHeader/AuthHeader";

import type { AuthFormData } from "../../../../api/modules/auth";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation("auth");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const imageFile = watch("profileImage");

  const imagePreview =
    imageFile && imageFile[0] ? URL.createObjectURL(imageFile[0]) : null;

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("userName", data.userName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("password", data.password);

      if (data.profileImage?.[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      console.log(data);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}>
        <AuthHeader
          title={t("register.title")}
          text={t("register.subtitle")}
          actionText={t("register.action")}
          actionPath="/login"
        />

        {/* PROFILE IMAGE */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 15,
          }}>
          <Button
            component="label"
            sx={{
              width: "90px",
              height: "90px",
              minWidth: "90px",
              border: "2px dashed #D3D6DC",
              backgroundColor: "#F5F6F8",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              textTransform: "none",
              color: "#7E8A97",
              padding: 0,

              "&:hover": {
                backgroundColor: "#eef1f5",
              },
            }}>
            {imagePreview ? (
              <Avatar
                src={imagePreview}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <FiUploadCloud size={24} />
            )}

            <Box
              component="input"
              type="file"
              accept="image/*"
              hidden
              {...register("profileImage", {
                required: t("validation.requiredProfileImg"),
              })}
            />
          </Button>

          {errors.profileImage && (
            <Box
              sx={{
                color: "#d32f2f",
                fontSize: "12px",
                mt: 1,
                textAlign: "center",
              }}>
              {errors.profileImage.message}
            </Box>
          )}
        </Box>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          width: "100%",
        }}>
        {/* USER NAME */}
        <Box>
          <FormLabel sx={labelStyle}>{t("register.userName")}</FormLabel>

          <TextField
            fullWidth
            placeholder={t("register.userNamePlaceholder")}
            {...register("userName", {
              required: t("validation.requiredUserName"),
            })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            sx={textFieldStyle}
          />
        </Box>

        {/* PHONE  & COUNTRY */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}>
          {/* COUNTRY */}
          <Box sx={{ flex: 1 }}>
            <FormLabel sx={labelStyle}>{t("register.country")}</FormLabel>

            <TextField
              fullWidth
              placeholder={t("register.countryPlaceholder")}
              {...register("country", {
                required: t("validation.requiredCountry"),
              })}
              error={!!errors.country}
              helperText={errors.country?.message}
              sx={textFieldStyle}
            />
          </Box>

          {/* PHONE */}
          <Box sx={{ flex: 1 }}>
            <FormLabel sx={labelStyle}>{t("register.phone")}</FormLabel>

            <TextField
              fullWidth
              placeholder={t("register.phonePlaceholder")}
              {...register("phone", {
                required: t("validation.requiredPhone"),
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={textFieldStyle}
            />
          </Box>
        </Box>

        {/* EMAIL */}
        <Box>
          <FormLabel sx={labelStyle}>{t("register.email")}</FormLabel>

          <TextField
            fullWidth
            placeholder={t("register.emailPlaceholder")}
            {...register("email", {
              required: t("validation.requiredEmail"),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t("validation.invalidEmail"),
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={textFieldStyle}
          />
        </Box>

        {/* PASSWORD */}
        <Box>
          <FormLabel sx={labelStyle}>{t("register.password")}</FormLabel>

          <TextField
            fullWidth
            placeholder={t("register.passwordPlaceholder")}
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: t("validation.requiredPassword"),
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

        {/* CONFIRM PASSWORD */}
        <Box>
          <FormLabel sx={labelStyle}>{t("register.confirmPassword")}</FormLabel>

          <TextField
            fullWidth
            placeholder={t("register.confirmPasswordPlaceholder")}
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: t("validation.requiredConfirmPassword"),
              validate: (value) =>
                value === watch("password") ||
                t("validation.passwordsNotMatch"),
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
            <CircularProgress size={22} sx={{ color: "#fff" }} />
          ) : (
            t("register.button")
          )}
        </Button>
      </Box>
    </>
  );
}

const labelStyle = {
  color: "#152C5B",
  fontSize: "14px",
  fontWeight: 500,
  mb: 1,
  display: "block",
};

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

  "& .MuiFormHelperText-root": {
    textAlign: "start",
    marginRight: 0,
    marginLeft: 0,
  },
};