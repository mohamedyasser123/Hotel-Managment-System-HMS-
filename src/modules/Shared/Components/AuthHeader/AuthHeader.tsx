import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  text: string;
  actionText: string;
  actionPath: string;
};

export default function AuthHeader({
  title,
  text,
  actionText,
  actionPath,
}: Props) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

  return (
    <Box
      sx={{
         textAlign: isArabic ? "right" : "left",
        mb: 6,
      }}>
      <Box
        sx={{
          fontSize: 32,
          fontWeight: 700,
          color: "#3252DF",
        }}>
        {title}
      </Box>

      <Box
        sx={{
          mt: 1,
          fontSize: 14,
          color: "#000",
        }}>
        {text}
      </Box>

      <Box
        sx={{
          mt: 0.5,
          fontSize: 14,
          color: "#000",
        }}>
        <Box
          component="span"
          onClick={() => navigate(actionPath)}
          sx={{
            color: "#3252DF",
            fontWeight: 600,
            cursor: "pointer",
          }}>
          {actionText}
        </Box>
      </Box>
    </Box>
  );
}
