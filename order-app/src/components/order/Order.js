import React from "react";
import OrderForm from "./OrderForm";
import useForm from "../../hooks/useForm";
import { Box, Grid } from "@mui/material";
import SearchFoodItem from "./SearchFoodItem";
import OrderedFoodItems from "./OrderedFoodItems";
const generateOrderNumber = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const getFreshModelObject = () => ({
  orderMasterId: 0,
  orderNumber: generateOrderNumber(),
  customerId: 0,
  pMethod: "none",
  gTotal: 0,
  deletedOrderItemIds: "",
  orderDetails: [],
});

export default function Order() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getFreshModelObject);

  return (
    <>
      <Grid container>
        <Grid xs={12}>
          <OrderForm
            {...{
              values,
              setValues,
              errors,
              setErrors,
              handleInputChange,
              resetFormControls,
            }}
          />
        </Grid>
        <Grid xs={6}>
          <SearchFoodItem {...{ values, setValues }} />
        </Grid>
        <Grid xs={6}>
          <Box sx={{ ml: 1 }}>
            <OrderedFoodItems
              {...{
                values,
                setValues,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
