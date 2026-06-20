import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import BookingSummary from "./BookingSummary";
import CompleteStep from "./CompleteStep";
import i18n from "../../../../i18n";
import { useTranslation } from "react-i18next";

const stripePromise = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

export default function Payment() {
    const [activeStep, setActiveStep] = useState(0);
    const isRTL = i18n.language === "ar";
    const { t } = useTranslation("user");
     return (
    <Box
      sx={{
        width: { xs: "95%", sm: "90%", md: "80%" },
py: { xs: 4, md: 8 },
        mx: "auto",
        
      }}
    >
     <Stepper
  activeStep={activeStep}
  alternativeLabel
  
 sx={{
  width: "100%",
  maxWidth: 900,
  mx: "auto",
 mb: { xs: 4, md: 8 },
  direction: isRTL ? "rtl" : "ltr",

  "& .MuiStepConnector-root": {
    left: isRTL ? "calc(50% + 20px)" : "calc(-50% + 20px)",
    right: isRTL ? "calc(-50% + 20px)" : "calc(50% + 20px)",
  },

 "& .MuiStepIcon-root": {
    fontSize: { xs: 28, sm: 35, md: 40 },
  },
  
  "& .MuiStepLabel-label": {
    fontSize: { xs: "12px", sm: "14px", md: "16px" },
  }
}}
>
        <Step>
         <StepLabel>{t("stepper.bookingDetails", "Booking Details")}</StepLabel>
        </Step>

        <Step>
          <StepLabel>{t("stepper.payment", "Payment")}</StepLabel>
        </Step>

        <Step>
          <StepLabel>{t("stepper.completed", "Completed")}</StepLabel>
        </Step>
      </Stepper>

      {activeStep === 0 && (
        <BookingSummary
          onContinue={() => setActiveStep(1)}
        />
      )}

      {activeStep === 1 && (
        <Elements stripe={stripePromise}>
          <PaymentForm
            onSuccess={() => setActiveStep(2)}
          />
        </Elements>
      )}

      {activeStep === 2 && <CompleteStep />}
    </Box>
  );
  
}
