import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
export default function Notification(props) {
  const { notify, setNotify } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      autoHideDuration={3000}
      open={notify.isOpen}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
      style={{ top: 72 }} // 72px = theme.spacing(9)
    >
      <Alert
        onClose={handleClose}
        style={{
          backgroundColor: "#f3b33d",
          color: "#000",
        }}
        icon={<span style={{ color: "#000" }}>!</span>}
      >
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
