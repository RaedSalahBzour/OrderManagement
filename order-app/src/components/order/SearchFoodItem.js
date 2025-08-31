import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { createAPIEndpoints, ENDPOINTS } from "../../api";
import { useEffect, useState } from "react";

export default function SearchFoodItem(props) {
  const { values, setValues } = props;
  const [foodItems, setFoodItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  let OrderedFoodItems = values.orderDetails;
  useEffect(() => {
    createAPIEndpoints(ENDPOINTS.FOODITEM)
      .fetchAll()
      .then(res => {
        setFoodItems(res.data);
        setSearchList(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const addFoodItem = foodItem => {
    let x = {
      orderMasterId: values.orderMasterId,
      orderDetailId: 0,
      foodItemId: foodItem.foodItemId,
      quantity: 1,
      foodItemPrice: foodItem.price,
      foodItemName: foodItem.foodItemName,
    };

    setValues({
      ...values,
      orderDetails: [...values.orderDetails, x],
    });
  };

  useEffect(() => {
    let x = [...foodItems];
    x = x.filter(
      item =>
        item.foodItemName.toLowerCase().includes(searchKey.toLowerCase()) &&
        OrderedFoodItems.every(y => y.foodItemId !== item.foodItemId)
    );
    setSearchList(x);
  }, [searchKey, OrderedFoodItems]);

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
        <InputBase
          placeholder="Search food items"
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
        />
        <IconButton
          sx={{
            ml: 20,
            flex: 3,
          }}
        >
          <SearchOutlinedIcon />
        </IconButton>
      </Paper>

      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        <List>
          {searchList.map((foodItem, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={foodItem.foodItemName}
                secondary={`$${foodItem.price}`}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => addFoodItem(foodItem)}>
                  <AddCircleOutlinedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}
