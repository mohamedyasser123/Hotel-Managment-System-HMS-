import {
    Typography,
    Button,
    Card,
    Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useLocation, useNavigate } from "react-router-dom";
import i18n from "../../../../i18n";

export default function BookingSummary({
    onContinue,
}: {
    onContinue: () => void;
}) {
    const location = useLocation();
    const navigate = useNavigate();

    const onBack = () => {
        navigate(-1);
    };
    const booking = location.state?.booking;

    if (!booking) {
        return <Typography>No Booking Found</Typography>;
    }
    const totalPrice =
        booking.totalPrice + booking.totalPrice * 0.1;
    const isRTL = i18n.language === "ar";
    const { t } = useTranslation("user");

    return (
        <Card elevation={0} sx={{
            p: { xs: 2, sm: 4 },
            width: { xs: "100%", md: "70%" },
            mx: "auto", textAlign: isRTL ? "right" : "left"
        }}>     <Typography
            sx={{
                color: "#152C5B",
                fontWeight: 500,
                mb: 3,
            }}
        >
                {t("booking.transferPayment", "Transfer Payment:")}
            </Typography>

            <Typography sx={{ mb: 1, color: "#152C5B" }}>
                {t("booking.startDate", "Start Date")}: {booking.startDate}
            </Typography>

            <Typography sx={{ mb: 1, color: "#152C5B" }}>
                {t("booking.endDate", "End Date")}: {booking.endDate}          </Typography>
            <Typography sx={{ mb: 1, color: "#152C5B" }}>
                {t("booking.subTotal", "Sub Total")}: ${booking.totalPrice}
            </Typography>

            <Typography sx={{ mb: 1, color: "#152C5B" }}>
                {t("booking.tax", "Tax")} 10%
            </Typography>



            <Typography
                sx={{
                    mb: 5,
                    color: "#152C5B",
                    fontWeight: 700,
                }}
            >
                {t("booking.total", "Total")}: ${totalPrice.toFixed(2)}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: "#152C5B",
                    }}
                >
                    VISA
                </Typography>

                <Box>
                    <Typography color="#152C5B">
                        {t("booking.secureStripe", "Secure Stripe Payment")}
                    </Typography>


                </Box>
            </Box>
            <Box
                sx={{
                    mt: 4,
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    flexDirection: { xs: "column", sm: isRTL ? "row-reverse" : "row" },
                    alignItems: "center",
                }}
            >
                <Button
                    variant="outlined"
                    onClick={onBack}
                    sx={{
                        borderColor: "#B0B0B0",
                        color: "#B0B0B0",
                        px: 4,
                        py: 1.5,
                        borderRadius: "8px",
                        fontWeight: 500,
                        width: { xs: "100%", sm: "auto" },
                        "&:hover": {
                            borderColor: "#152C5B",
                            color: "#152C5B",
                        },
                    }}
                >
                    {t("booking.back", "Back")}
                </Button>

                <Button
                    variant="contained"
                    onClick={onContinue}
                    sx={{
                        backgroundColor: "#3252DF",
                        color: "#fff",
                        px: 4,
                        py: 1.5,
                        borderRadius: "8px",
                        fontWeight: 500,
                        width: { xs: "100%", sm: "auto" },
                        "&:hover": {
                            backgroundColor: "#2943B4",
                        },
                    }}
                >
                    {t("booking.continueToPayment", "Continue To Payment")}
                </Button>
            </Box>
        </Card>
    );
}