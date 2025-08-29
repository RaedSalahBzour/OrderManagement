import { Typography } from "@mui/material";
import "./App.css";
import Container from "@mui/material/Container";
import Order from "./components/order/Order";
function App() {
  return (
    <Container maxWidth="md">
      <Typography gutterBottom variant="h3" align="center">
        Order Management
      </Typography>
      <Order />
    </Container>
  );
}

export default App;
