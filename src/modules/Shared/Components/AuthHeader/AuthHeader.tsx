import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: "left",
        mb: 8,
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
        You can{" "}
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
