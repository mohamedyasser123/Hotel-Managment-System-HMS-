import { useNavigate, useParams } from "react-router-dom";
import useRoomDetails from "../../../../hooks/portal/usePageDetailes";
import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
  Link as MuiLink,
  Divider,
  TextField,
  Rating,
} from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { GridAddIcon, GridRemoveIcon } from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
import bathroomIcon from "../../../../assets/images/bathroom.png";
import bedroomIcon from "../../../../assets/images/bedroom.png";
import diningroomIcon from "../../../../assets/images/diningroom.png";
import kulkasIcon from "../../../../assets/images/kulkas.png";
import tvIcon from "../../../../assets/images/tv.png";
import livingroomIcon from "../../../../assets/images/livingroom.png";
import wifiIcon from "../../../../assets/images/wifi.png";
import acroomIcon from "../../../../assets/images/acroom.png";
import useAuth from "../../../../hooks/useAuth";
import { useEffect } from "react";
export default function DetailsPage() {
  const { data, fetchProfile } = useAuth();
  const user = data?.user;
  const role = user?.role;
  useEffect(() => {
    if (!data) fetchProfile();
  }, [data, fetchProfile]);

  const facilities = [
    { icon: bedroomIcon, count: 5, name: "bedroom" },
    { icon: livingroomIcon, count: 1, name: "living room" },
    { icon: bathroomIcon, count: 3, name: "bathroom" },
    { icon: diningroomIcon, count: 1, name: "dining room" },
    { icon: wifiIcon, count: 10, name: "mbp/s" },
    { icon: acroomIcon, count: 7, name: "unit ready" },
    { icon: kulkasIcon, count: 2, name: "refrigerator" },
    { icon: tvIcon, count: 4, name: "television" },
  ];

  const textareaStyle = {
    "& .MuiInputBase-root": {
      backgroundColor: "#F5F6F8",
      borderRadius: "12px",
      padding: "16px",
      "& fieldset": { border: "none" },
      "&:hover fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "none" },
    },
    "& textarea": {
      color: "#152C5B",
      fontWeight: "500",
      fontSize: "15px",
      fontFamily: "'Poppins', sans-serif",
    },
  };

  const buttonStyle = {
    backgroundColor: "#3252DF",
    color: "#fff",
    textTransform: "none",
    px: 8,
    py: 1,
    mt: 3,
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "15px",
    alignSelf: "flex-end",
    boxShadow: "0 6px 12px rgba(50, 82, 223, 0.2)",
    "&:hover": {
      backgroundColor: "#203cb3",
      boxShadow: "0 6px 16px rgba(50, 82, 223, 0.3)",
    },
  };
  const navigate = useNavigate()
  const { id } = useParams();
  const { room, loading } = useRoomDetails(id);
  if (loading || !room) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
          width: "100%",
        }}>
        <CircularProgress size={50} sx={{ color: "#3252DF" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 5 }}>
      <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ mb: 10 }}>
        <MuiLink
          component={RouterLink}
          to="/home"
          underline="hover"
          sx={{
            color: "#B0B0B0",
            fontSize: "16px",
          }}>
          Home
        </MuiLink>

        <Typography
          sx={{
            color: "#152C5B",
            fontWeight: "800",
            fontSize: "16px",
          }}>
          Room Details
        </Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 6 }}>
        <Grid container spacing={2}>
          {/* Main Image */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              component="img"
              src={room.images?.[0] || "/placeholder.jpg"}
              alt={`Room ${room.roomNumber}`}
              sx={{
                width: "100%",
                height: { xs: 280, md: 440 },
                objectFit: "cover",
                display: "block",
                borderRadius: "16px",
              }}
            />
          </Grid>

          {/* Side Images */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ mb: 10 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}>
              {room.images?.slice(1, 3).map((img: string, i: number) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt={`Sub view ${i + 1}`}
                  sx={{
                    width: "100%",
                    height: { xs: 132, md: 212 },
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "16px",
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={6} sx={{ mb: 15 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="h4"
                sx={{ color: "#152C5B", fontWeight: 700, mb: 1 }}>
                Room {room.roomNumber}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "#B0B0B0",
                  lineHeight: 2.3,
                  textAlign: "justify",
                  mb: 1,
                }}>
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell.
              </Typography>

              <Typography
                sx={{
                  color: "#B0B0B0",
                  lineHeight: 2.3,
                  textAlign: "justify",
                  mb: 1,
                }}>
                Such trends saw the demise of the soul-infused techno that
                typified the original Detroit sound. Robert Hood has noted that
                he and Daniel Bell both realized something was missing from
                techno in the post-rave era.
              </Typography>

              <Typography
                sx={{
                  color: "#B0B0B0",
                  lineHeight: 2.3,
                  textAlign: "justify",
                }}>
                Design is a plan or specification for the construction of an
                object or system or for the implementation of an activity or
                process, or the result of that plan or specification in the form
                of a prototype, product or process. The national agency for
                design: enabling Singapore to use design for economic growth and
                to make lives better.
              </Typography>
            </Box>
            <Box sx={{ mt: 5, width: "100%" }}>
              <Grid container spacing={{ xs: 4, md: 5 }}>
                {facilities.map((item, index) => (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 1.5,
                      }}>
                      <Box
                        component="img"
                        src={item.icon}
                        alt={item.name}
                        sx={{
                          height: "38px",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontFamily: "'Poppins', sans-serif",
                          lineHeight: 1,
                        }}>
                        <Box
                          component="span"
                          sx={{ color: "#152C5B", fontWeight: 600, mr: 0.5 }}>
                          {item.count}
                        </Box>
                        <Box
                          component="span"
                          sx={{ color: "#B0B0B0", fontWeight: 300 }}>
                          {item.name}
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #E5E5E5",
              borderRadius: "16px",
              p: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              position: "sticky",
              top: "24px",
            }}>
            <Typography
              sx={{
                color: "#152C5B",
                fontWeight: 600,
                fontSize: "20px",
                mb: 2,
              }}>
              Start Booking
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                <Typography
                  sx={{ color: "#1ABC9C", fontWeight: 700, fontSize: "32px" }}>
                  ${room.price}
                </Typography>
                <Typography
                  sx={{
                    color: "#B0B0B0",
                    fontSize: "18px",
                    fontWeight: "light",
                  }}>
                  per night
                </Typography>
              </Box>

              {room.discount > 0 && (
                <Typography
                  sx={{
                    color: "#FF4D80",
                    fontWeight: 600,
                    fontSize: "14px",
                    mt: 0.5,
                  }}>
                  Discount {room.discount}% off
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}>
              <Typography
                sx={{
                  color: "#152C5B",
                  fontWeight: 600,
                  mb: 1,
                  fontSize: "15px",
                }}>
                Pick a Date
              </Typography>

              {/* DATE PICKER */}
              <DateRangePicker
                format="DD MMM"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      mb: 3,
                      width: "100%",
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
                        fontSize: "14px",
                      },
                    },
                  },
                }}
              />

              <Typography
                sx={{
                  color: "#152C5B",
                  fontWeight: 600,
                  mb: 1,
                  fontSize: "15px",
                }}>
                Capacity
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                  borderRadius: "8px",
                  overflow: "hidden",
                  mb: 4,
                }}>
                <IconButton
                  disableRipple
                  sx={{
                    width: "45px",
                    height: "44px",
                    borderRadius: 0,
                    backgroundColor: "#E74C3C",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#c0392b" },
                  }}>
                  <GridRemoveIcon />
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
                  1
                </Box>

                <IconButton
                  disableRipple
                  sx={{
                    width: "45px",
                    height: "44px",
                    borderRadius: 0,
                    backgroundColor: "#1ABC9C",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#16a085" },
                  }}>
                  <GridAddIcon />
                </IconButton>
              </Box>

              <Box sx={{ mb: 3, width: "100%" }}>
                <Typography
                  sx={{
                    color: "#B0B0B0",
                    fontSize: "15px",
                    textAlign: "center",
                    lineHeight: 1.5,
                  }}>
                  You will pay{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#152C5B",
                      fontWeight: 600,
                      fontSize: "18px",
                    }}>
                    $480 USD
                  </Box>{" "}
                  per 2 Persons
                </Typography>
              </Box>

              <Button
                onClick={() => navigate("/payment")}
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#3252DF",
                  color: "#fff",
                  textTransform: "none",
                  py: 1.5,
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "16px",
                  boxShadow: "0 8px 16px rgba(50, 82, 223, 0.24)",
                  "&:hover": {
                    backgroundColor: "#203cb3",
                    boxShadow: "0 8px 20px rgba(50, 82, 223, 0.35)",
                  },
                }}>
                Continue to Book
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {role === "user" && (
        <Box
          sx={{
            mt: 8,
            py: 5,
            width: "100%",
            border: "1px solid #E5E5E5",
            borderRadius: "15px",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 5 },
            alignItems: "flex-start",
          }}>
          {/* RATE SECTION */}
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 45%" }, p: 3 }}>
            <Typography
              sx={{
                color: "#152C5B",
                fontWeight: 600,
                fontSize: "20px",
                mb: 2,
              }}>
              Rate this Room
            </Typography>

            <TextField
              multiline
              rows={4}
              placeholder="add your rate"
              fullWidth
              sx={textareaStyle}
            />

            <Button variant="contained" sx={buttonStyle}>
              Rate
            </Button>
          </Box>

          {/* Divider */}
          <Divider orientation="vertical" flexItem />

          {/* COMMENT SECTION */}
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 45%" }, p: 3 }}>
            <Typography
              sx={{
                color: "#152C5B",
                fontWeight: 600,
                fontSize: "20px",
                mb: 2,
              }}>
              Add your comments
            </Typography>

            <TextField
              multiline
              rows={4}
              placeholder="add your comment"
              fullWidth
              sx={textareaStyle}
            />

            <Button variant="contained" sx={buttonStyle}>
              Send
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
