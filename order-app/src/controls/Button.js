import React from "react";
import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(MuiButton)(({ theme }) => ({
  margin: theme.spacing(1),
  textTransform: "none",
}));

export default function Button(props) {
  const { children, color, variant, onClick, className, ...other } = props;

  return (
    <StyledButton
      className={className}
      color={color || "primary"}
      variant={variant || "contained"}
      onClick={onClick}
      {...other}
    >
      {children}
    </StyledButton>
  );
}
