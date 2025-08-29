import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { createAPIEndpoints, ENDPOINTS } from "../../api";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
export default function SearchFoodItem() {
  const [foodItems, setFoodItems] = useState([]);
  useEffect(() => {
    createAPIEndpoints(ENDPOINTS.FOODITEM)
      .fetchAll()
      .then(res => {
        setFoodItems(res.data);
        console.log(foodItems);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <>
      <Paper
        sx={{
          padding: "2px 4px",
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <InputBase placeholder="Search food items" />
        <IconButton
          sx={{
            ml: 20,
            flex: 3,
          }}
        >
          <SearchOutlinedIcon />
        </IconButton>
      </Paper>
      <List>
        {foodItems.map((foodItem, idx) => {
          return (
            <ListItem key={idx}>
              <ListItemText
                primary={foodItem.foodItemName}
                secondary={"$" + foodItem.price}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
