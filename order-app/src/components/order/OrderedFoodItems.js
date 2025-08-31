import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  ButtonGroup,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "../../controls/Button";
import { roundTo2DecimalPoint } from "../../utils";

export default function OrderedFoodItems(props) {
  const { values, setValues } = props;
  const OrderedFoodItems = values.orderDetails;

  const updateQuantity = (idx, value) => {
    const updatedValues = { ...values };
    const foodItem = updatedValues.orderDetails[idx];
    if (foodItem.quantity + value > 0) {
      foodItem.quantity += value;
      setValues(updatedValues);
    }
  };
  const removeFoodItem = (index, id) => {
    let x = { ...values };
    x.orderDetails = x.orderDetails.filter((_, i) => {
      return i != index;
    });
    setValues({ ...x });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {OrderedFoodItems.map((item, idx) => (
          <Paper key={idx} sx={{ padding: 1 }}>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  disableRipple
                  onClick={() => removeFoodItem(idx, item.OrderDetailId)}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={item.foodItemName}
                primaryTypographyProps={{
                  component: "h1",
                  style: {
                    fontWeight: 500,
                    fontSize: "1.2em",
                  },
                }}
                secondary={
                  <ButtonGroup size="small">
                    <Button
                      onClick={() => updateQuantity(idx, -1)}
                      style={{ backgroundColor: "gray", color: "white" }}
                    >
                      -
                    </Button>
                    <Button disabled>{item.quantity}</Button>
                    <Button
                      onClick={() => updateQuantity(idx, 1)}
                      style={{ backgroundColor: "gray", color: "white" }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                }
                secondaryTypographyProps={{ component: "span" }}
              />
              <span>
                {"$" + roundTo2DecimalPoint(item.quantity * item.foodItemPrice)}
              </span>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
}
