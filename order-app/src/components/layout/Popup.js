import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      PaperProps={{
        style: {
          padding: 16,
          position: "absolute",
          top: 40,
        },
      }}
    >
      <DialogTitle style={{ paddingRight: 0 }}>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton onClick={() => setOpenPopup(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
