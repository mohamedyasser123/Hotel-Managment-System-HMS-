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

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
import { useEffect, useState } from "react";
import { usePortalBooking } from "../../../../hooks/portal/usePortalBooking";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useAuthContext } from "../../../../context/AuthContext";
export default function DetailsPage() {
  const { t, i18n } = useTranslation("user");
  const isArabic = i18n.language === "ar";
  const { id } = useParams();
  const navigate = useNavigate();
  const { room } = useRoomDetails(id);
  const { data, fetchProfile } = useAuth();
  const user = data?.user;
  const role = user?.role;
  useEffect(() => {
    if (!data) fetchProfile();
  }, [data, fetchProfile]);
  const {
    capacity,
    increase,
    decrease,
    createBooking,
    setStartDate,
    setEndDate,
    startDate,
    endDate,
    loading,
  } = usePortalBooking(id);
  const { loginData } = useAuthContext();
  const [openLoginModal, setOpenLoginModal] = useState(false);

  // Handle booking
  const handleBooking = async () => {
    if (!loginData) {
      setOpenLoginModal(true);
      return;
    }
    try {
      if (!startDate || !endDate) {
        toast.warning("Please select date range");
        return;
      }

      if (!room?.price) {
        toast.error("Room data not loaded");
        return;
      }

      const res = await createBooking(room.price);

      const booking = res?.data?.booking;

      if (res?.success && booking) {
        toast.success(`Booking created successfully`);

        navigate("/payment", {
          state: { booking },
        });

        return;
      }

      toast.error(res?.message || "Failed to create booking");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };
  // faclities
  const facilities = [
    { icon: bedroomIcon, count: 5, name: t("roomDetailes.bedroom") },
    { icon: livingroomIcon, count: 1, name: t("roomDetailes.livingRoom") },
    { icon: bathroomIcon, count: 3, name: t("roomDetailes.bathroom") },
    { icon: diningroomIcon, count: 1, name: t("roomDetailes.diningroom") },
    { icon: wifiIcon, count: 10, name: "mbp/s" },
    { icon: acroomIcon, count: 7, name: t("roomDetailes.unitready") },
    { icon: kulkasIcon, count: 2, name: t("roomDetailes.refrigerator") },
    { icon: tvIcon, count: 4, name: t("roomDetailes.television") },
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
  const discountedPrice = room.price - (room.price * room.discount) / 100;
  const totalPrice = discountedPrice * capacity;

  return (
    <>
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
            {t("roomDetailes.home")}
          </MuiLink>

          <Typography
            sx={{
              color: "#152C5B",
              fontWeight: "800",
              fontSize: "16px",
            }}>
            {t("roomDetailes.roomDetails")}
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
                  {t("roomDetailes.room")} {room.roomNumber}
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
                  {t("roomDetailes.description1")}
                </Typography>

                <Typography
                  sx={{
                    color: "#B0B0B0",
                    lineHeight: 2.3,
                    textAlign: "justify",
                    mb: 1,
                  }}>
                  {t("roomDetailes.description2")}
                </Typography>

                <Typography
                  sx={{
                    color: "#B0B0B0",
                    lineHeight: 2.3,
                    textAlign: "justify",
                  }}>
                  {t("roomDetailes.description3")}
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
                {t("roomDetailes.startBooking")}
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                  <Typography
                    sx={{
                      color: "#1ABC9C",
                      fontWeight: 700,
                      fontSize: "32px",
                    }}>
                    ${room.price}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#B0B0B0",
                      fontSize: "18px",
                      fontWeight: "light",
                    }}>
                    {t("roomDetailes.night")}
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
                    {t("roomDetailes.roomDiscount")} {room.discount}% off
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
                  {t("roomDetailes.pickDate")}
                </Typography>

                {/* DATE PICKER */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}>
                  <Box sx={{ width: "100%" }}>
                    <DatePicker
                      label={t("roomDetailes.startDate")}
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            backgroundColor: "#F5F6F8",
                            borderRadius: "8px",
                            "& .MuiInputLabel-root": {
                              right: isArabic ? 20 : "auto",
                              left: isArabic ? "auto" : 0,
                              textAlign: isArabic ? "right" : "left",
                            },
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ width: "100%" }}>
                    <DatePicker
                      label={t("roomDetailes.EndDate")}
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            backgroundColor: "#F5F6F8",
                            borderRadius: "8px",
                            "& .MuiInputLabel-root": {
                              right: isArabic ? 20 : "auto",
                              left: isArabic ? "auto" : 0,
                              textAlign: isArabic ? "right" : "left",
                            },
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Typography
                  sx={{
                    color: "#152C5B",
                    fontWeight: 600,
                    mb: 1,
                    fontSize: "15px",
                  }}>
                  {t("roomDetailes.capacity")}
                </Typography>
                <Box
                  sx={{
                    flexDirection:
                      i18n.language === "ar" ? "row-reverse" : "row",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                    borderRadius: "8px",
                    overflow: "hidden",
                    mb: 4,
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
                    {t("roomDetailes.youWillPay")}{" "}
                    <Box
                      component="span"
                      sx={{
                        color: "#152C5B",
                        fontWeight: 600,
                        fontSize: "18px",
                      }}>
                      ${totalPrice.toFixed(2)} USD
                    </Box>{" "}
                    {t("roomDetailes.for")} {capacity}{" "}
                    {capacity === 1
                      ? t("roomDetailes.person")
                      : t("roomDetailes.persons")}
                  </Typography>
                </Box>
                <Button
                  onClick={handleBooking}
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
                  {t("roomDetailes.bookingBtn")}
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
                {t("roomDetailes.rate")}
              </Typography>

              <TextField
                multiline
                rows={4}
                placeholder={t("roomDetailes.ratePlace")}
                fullWidth
                sx={textareaStyle}
              />

              <Button variant="contained" sx={buttonStyle}>
                {t("roomDetailes.rateBtn")}
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
                {t("roomDetailes.comment")}
              </Typography>

              <TextField
                multiline
                rows={4}
                placeholder={t("roomDetailes.commentPlace")}
                fullWidth
                sx={textareaStyle}
              />

              <Button variant="contained" sx={buttonStyle}>
                {t("roomDetailes.commentBtn")}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Dialog
        open={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "24px",
            padding: "16px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
          },
        }}>
        <DialogContent sx={{ pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mt: 2,
            }}>
            <Box
              sx={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "#f5a52344",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 3,
                border: "1px solid #f5a52344",
              }}>
              <ReportProblemOutlinedIcon
                sx={{ fontSize: "35px", color: "#F5A623" }}
              />{" "}
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#000",
                mb: 1.5,
                fontSize: "22px",
              }}>
              Login Required
            </Typography>

            <Typography
              sx={{
                color: "#B0B0B0",
                fontSize: "15px",
                lineHeight: 1.6,
                maxWidth: "85%",
              }}>
              You need to login first to unlock full access and add this room to
              your favorites.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            gap: 2,
            px: 3,
            pb: 3,
            pt: 2,
          }}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenLoginModal(false);
            }}
            sx={{
              backgroundColor: "#3252DF",
              color: "#fff",
              fontWeight: 600,
              px: 5,
              py: 1.2,
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: "0px 4px 12px rgba(50, 82, 223, 0.24)",
              "&:hover": {
                backgroundColor: "#2943B7",
                boxShadow: "0px 6px 16px rgba(50, 82, 223, 0.35)",
              },
            }}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
