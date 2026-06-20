import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import complete from "../../../../assets/images/Complete.png"
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CompleteStep() {
  const navigate = useNavigate();
const { t } = useTranslation("user");
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          mb: 5,
        }}
      >
        <CheckCircleIcon
          color="success"
          sx={{ fontSize: 40 }}
        />

        <CheckCircleIcon
          color="success"
          sx={{ fontSize: 40 }}
        />

        <CheckCircleIcon
          color="success"
          sx={{ fontSize: 40 }}
        />
      </Box>

      <Typography
        variant="h4"
        sx={{
          color: "#152C5B",
          mb: 2,
        }}
      >
        {t("complete.title", "Yay! Completed")}
      </Typography>

      <Box
        component="img"
        src={complete}
        sx={{
         width: { xs: "60%", sm: "40%", md: "20%" },
          mb: 2,
        }}
      />

      <Typography
        sx={{
          color: "#B0B0B0",
          mb: 5,
        }}
      >
       {t("complete.description", "We will inform you via email later once the transaction has been accepted")}
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/home")}
        sx={{
          px: 5,
          py: 1.5,
          width: { xs: "100%", sm: "auto" },
        }}
      >
        {t("complete.backHome", "Back To Home")}
      </Button>
    </Box>
  );
}