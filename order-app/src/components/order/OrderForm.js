import {
  Grid,
  InputAdornment,
  Stack,
  ButtonGroup,
  Button as MuiButton,
} from "@mui/material";
import Form from "../layout/Form";
import Input from "../../controls/Input";
import Select from "../../controls/Select";
import Button from "../../controls/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ReorderIcon from "@mui/icons-material/Reorder";
import { createAPIEndpoints, ENDPOINTS } from "../../api";
import { useEffect, useState } from "react";
import { roundTo2DecimalPoint } from "../../utils";
import Popup from "../layout/Popup";
import OrderList from "./OrderList";
import Notification from "../layout/Notification";

const pMethods = [
  { id: "none", title: "Select" },
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
];

export default function OrderForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;

  const [customerList, setCustomerList] = useState([]);
  const [orderListVisibility, setOrderListVisibility] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });

  useEffect(() => {
    createAPIEndpoints(ENDPOINTS.CUSTOMER)
      .fetchAll()
      .then(res => {
        let customerList = res.data.map(item => ({
          id: item.customerID,
          title: item.customerName,
        }));
        customerList = [{ id: 0, title: "Select" }].concat(customerList);
        setCustomerList(customerList);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.foodItemPrice;
    }, 0);
    setValues({ ...values, gTotal: roundTo2DecimalPoint(gTotal) });
  }, [JSON.stringify(values.orderDetails)]);

  useEffect(() => {
    if (orderId === 0) resetFormControls();
    else {
      createAPIEndpoints(ENDPOINTS.ORDER)
        .fetchById(orderId)
        .then(res => {
          setValues(res.data);
          setErrors({});
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [orderId]);
  const validationForm = () => {
    let temp = {};
    temp.customerId = values.customerId !== 0 ? "" : "this field is required";
    temp.pMethod = values.pMethod !== "none" ? "" : "this field is required";
    temp.orderDetails =
      values.orderDetails.length !== 0 ? "" : "this field is required";
    setErrors({ ...temp });
    return Object.values(temp).every(x => x === "");
  };

  const submitOrder = e => {
    console.log(values);
    e.preventDefault();
    if (validationForm()) {
      if (values.orderMasterId === 0) {
        createAPIEndpoints(ENDPOINTS.ORDER)
          .create(values)
          .then(res => {
            resetFormControls();
            setNotify({ isOpen: true, message: "new order has been created" });
          })
          .catch(err => console.log(err));
      } else {
        createAPIEndpoints(ENDPOINTS.ORDER)
          .update(values.orderMasterId, values)
          .then(res => {
            setOrderId(0);
            setNotify({ isOpen: true, message: "the order has been updated" });
          })
          .catch(err => console.log(err));
      }
    }
  };

  const openOrderList = () => {
    setOrderListVisibility(true);
  };

  const resetForm = () => {
    resetFormControls();
    setOrderId(0);
  };
  return (
    <>
      <Form onSubmit={submitOrder}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Input
                name="orderNumber"
                label="Order Number"
                disabled
                fullWidth
                value={values.orderNumber}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{
                        "& .MuiTypography-root": {
                          color: "#f3b33d",
                          fontWeight: "bolder",
                          fontSize: "1.5em",
                        },
                      }}
                    >
                      #
                    </InputAdornment>
                  ),
                }}
              />
              <Select
                label="Customer"
                name="customerId"
                value={values.customerId}
                onChange={handleInputChange}
                options={customerList}
                fullWidth
                error={errors.customerId}
              />
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack spacing={2}>
              <Select
                label="Payment Method"
                name="pMethod"
                value={values.pMethod}
                onChange={handleInputChange}
                options={pMethods}
                fullWidth
                error={errors.pMethod}
              />
              <Input
                name="grandTotal"
                label="Grand Total"
                disabled
                fullWidth
                value={values.gTotal}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{
                        "& .MuiTypography-root": {
                          color: "#f3b33d",
                          fontWeight: "bolder",
                          fontSize: "1.5em",
                        },
                      }}
                    >
                      $
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <ButtonGroup
              sx={{
                marginTop: "10px",
                backgroundColor: "#f3b33d",
                "& .MuiButton-root": {
                  color: "#000",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#f3b33d",
                  },
                },
              }}
            >
              <MuiButton
                size="large"
                endIcon={<RestaurantIcon />}
                type="submit"
              >
                Submit
              </MuiButton>
              <MuiButton
                size="small"
                onClick={resetForm}
                startIcon={<ReplayIcon />}
              ></MuiButton>
            </ButtonGroup>
            <Button
              onClick={openOrderList}
              size="large"
              startIcon={<ReorderIcon />}
            >
              Orderes
            </Button>
          </Grid>
        </Grid>
      </Form>
      <Popup
        title="list of orders"
        openPopup={orderListVisibility}
        setOpenPopup={setOrderListVisibility}
      >
        <OrderList
          {...{
            setOrderId,
            setOrderListVisibility,
            resetFormControls,
            setNotify,
          }}
        />
      </Popup>
      <Notification {...{ notify, setNotify }} />
    </>
  );
}
