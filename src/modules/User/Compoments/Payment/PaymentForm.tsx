import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";

import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../../../api/axoisClient";
import i18n from "../../../../i18n";
import { useTranslation } from "react-i18next";

export default function PaymentForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const isRTL = i18n.language === "ar";
  const { t } = useTranslation("user");
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  if (!booking) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        {t("payment.noBooking", "No booking found")}
      </Typography>
    );
  }

  const handlePayment = async () => {
    try {
      if (!stripe || !elements) {
        toast.error(t("payment.stripeNotLoaded", "Stripe not loaded"));
        return;
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        toast.error(t("payment.cardFieldNotFound", "Card field not found"));
        return;
      }

      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        toast.error(error.message || t("payment.failed", "Payment failed"));
        return;
      }

      const response = await axiosClient.post(
        `/portal/booking/${booking._id}/pay`,
        {
          token: token.id,
        }
      );

      toast.success(response.data.success);
      onSuccess();
    } catch (error: any) {
      // 🛠️ تم تصليح التداخل هنا لضمان عدم حدوث Crash
      toast.error(
        error?.response?.data?.message || t("payment.failed", "Payment failed")
      );
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "95%", sm: "85%", md: "70%" },
        mx: "auto",
        py: { xs: 4, md: 8 }, 
      }}
    >
      <Grid 
  container 
  spacing={4} 
 
  sx={{ 
    justifyContent:"center",
    flexDirection: isRTL ? "row-reverse" : "row"
  }}
>
  
  <Grid size={{ xs: 12, sm: 10, md: 8 }}>
    <Typography
      sx={{
        mb: 2,
        color: "#152C5B",
        fontWeight: 500,
        textAlign: isRTL ? "right" : "left",
      }}
    >
      {t("payment.cardInformation", "Card Information")}
    </Typography>

    <Box
      sx={{
        border: "1px solid #E5E5E5",
        borderRadius: "12px",
        p: 2,
        minHeight: 55,
        backgroundColor: "#fff",
        position: "relative",
        zIndex: 1,
      }}
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#152C5B",
              "::placeholder": {
                color: "#B0B0B0",
              },
            },
          },
        }}
      />
    </Box>
  </Grid>

  {/* أزرار التحكم السفليّة */}
  <Grid size={{ xs: 12 }}>
    <Box
      sx={{
        mt: { xs: 4, md: 6 },
        display: "flex",
        justifyContent: "center",
        gap: 2,
        flexDirection: { xs: "column", sm: isRTL ? "row-reverse" : "row" },
        alignItems: "center",
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          width: { xs: "100%", sm: 180 },
          height: 50,
          borderColor: "#E5E5E5",
          color: "#B0B0B0",
          textTransform: "none",
          borderRadius: "8px",
        }}
      >
        {t("payment.cancel", "Cancel")}
      </Button>

      <Button
        variant="contained"
        onClick={handlePayment}
        sx={{
          width: { xs: "100%", sm: 180 },
          height: 50,
          bgcolor: "#3252DF",
          textTransform: "none",
          borderRadius: "8px",
          boxShadow: "0px 8px 20px rgba(50,82,223,.25)",
          "&:hover": {
            bgcolor: "#2441c7",
          },
        }}
      >
        {t("payment.payNow", "Pay Now")}
      </Button>
    </Box>
  </Grid>
</Grid>
    </Box>
  );
}