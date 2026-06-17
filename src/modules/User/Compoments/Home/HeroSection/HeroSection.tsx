import {
  Box,
  Typography,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import heroImg from "../../../../../assets/images/hero.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useExploreRooms } from "../../../../../hooks/portal/useExploreRooms";

export default function HeroSection() {
  const navigate = useNavigate();
  const { capacity, setDates, increase, decrease, loading, dateRange } = useExploreRooms();
  
  const handleExplore = () => {
    if (!dateRange[0] || !dateRange[1]) {
      toast.warning("Please select date range");
      return;
    }

    const startDate = dateRange[0].toISOString();
    const endDate = dateRange[1].toISOString();

    navigate(
      `/explore?startDate=${startDate}&endDate=${endDate}&capacity=${capacity}`,
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        py: 8,
      }}>
      {/* LEFT */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: "42px",
            fontWeight: 700,
            color: "#152C5B",
            lineHeight: 1.3,
            maxWidth: "450px",
          }}>
          Forget Busy Work,
          <br />
          Start Next Vacation
        </Typography>

        <Typography
          sx={{
            color: "#B0B0B0",
            mt: 2,
            maxWidth: "420px",
            lineHeight: 1.8,
            fontSize: "16px",
          }}>
          We provide what you need to enjoy your holiday with family. Time to
          make another memorable moments.
        </Typography>

        {/* BOOKING */}
        <Box sx={{ mt: 5 }}>
          <Typography
            sx={{
              color: "#152C5B",
              fontWeight: 600,
              mb: 1,
            }}>
            Start Booking
          </Typography>

          {/* DATE PICKER */}
          <DateRangePicker
            value={dateRange}
            onChange={(newValue) => setDates(newValue)}
            format="DD MMM"
            slotProps={{
              textField: {
                fullWidth: true,
                sx: {
                  mb: 3,
                  maxWidth: "400px",

                  "& .MuiInputBase-root": {
                    backgroundColor: "#F5F6F8 !important",
                    borderRadius: "8px",
                    height: "44px",
                    "& fieldset": { border: "none !important" },
                    "&:hover fieldset": { border: "none !important" },
                    "&.Mui-focused fieldset": { border: "none !important" },
                  },

                  "& input": {
                    color: "#152C5B !important",
                    WebkitTextFillColor: "#152C5B !important",
                    fontWeight: "600 !important",
                    textAlign: "center",
                  },

                  "& .MuiBox-root, & .MuiTypography-root": {
                    color: "#152C5B !important",
                    fontWeight: "600 !important",
                    mx: 1,
                  },
                },
              },
            }}
          />

          {/* CAPACITY */}
          <Typography
            sx={{
              color: "#152C5B",
              fontWeight: 600,
              mb: 1,
            }}>
            Capacity
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: "320px",
              borderRadius: "8px",
              overflow: "hidden",
            }}>
            <IconButton
              onClick={decrease}
              disableRipple
              sx={{
                width: "45px",
                height: "44px",
                borderRadius: 0,
                backgroundColor: "#E74C3C",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#E74C3C",
                },
              }}>
              <RemoveIcon />
            </IconButton>

            <Box
              sx={{
                flex: 1,
                height: "44px",
                backgroundColor: "#F5F6F8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#152C5B",
                fontWeight: 600,
              }}>
              {capacity}
            </Box>

            <IconButton
              onClick={increase}
              disableRipple
              sx={{
                width: "45px",
                height: "44px",
                borderRadius: 0,
                backgroundColor: "#1ABC9C",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#1ABC9C",
                },
              }}>
              <AddIcon />
            </IconButton>
          </Box>

          {/* BUTTON */}
          <Button
            variant="contained"
            disabled={loading}
            onClick={handleExplore}
            sx={{
              mt: 4,
              backgroundColor: "#3252DF",
              textTransform: "none",
              borderRadius: "8px",
              px: 8,
              py: 1,
              fontWeight: 600,
            }}>
            {loading ? (
              <CircularProgress size={22} sx={{ color: "#fff" }} />
            ) : (
              "Explore"
            )}
          </Button>
        </Box>
      </Box>

      {/* RIGHT IMAGE */}
      <Box sx={{ flex: 1 }}>
        <Box
          component="img"
          src={heroImg}
          alt="hotel"
          sx={{
            width: "100%",
            maxWidth: "500px",
            height: "500px",
            borderRadius: "24px",
          }}
        />
      </Box>
    </Box>
  );
}
