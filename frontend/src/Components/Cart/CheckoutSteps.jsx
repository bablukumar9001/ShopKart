import React from "react";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: <LocalShippingIcon />,
    },
    {
      label: "Confirm Order",
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: "Payment",
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
      {steps.map((item, index) => (
        <Step
          key={index}
          active={activeStep === index}
          completed={activeStep > index}
        >
          <StepLabel
            style={{
              color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
            }}
            icon={item.icon}
          >
            <Typography>{item.label}</Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutSteps;