import { Box, Typography, Button } from "@mui/material";

interface CrudHeaderProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  onClick?: () => void;
}

export default function CrudHeader({
  title,
  subtitle,
  buttonText,
  onClick,
}: CrudHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        mx: "auto",
        mb: 3,
      }}>
      <Box>
        <Typography
          sx={{
            color: "#1F263E",
            fontSize: "20px",
            fontWeight: 600,
          }}>
          {title}
        </Typography>

        {subtitle && (
          <Typography
            sx={{
              color: "#323C47",
              fontSize: "14px",
              mt: 0,
            }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {/*   BUTTON */}
      {buttonText && (
        <Button
          onClick={onClick}
          sx={{
            backgroundColor: "#203FC7",
            color: "#fff",
            textTransform: "none",
            px: 3,
            py: 1,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#1a33a3",
            },
          }}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
}