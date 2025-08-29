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
import { makeStyles } from "@mui/styles";
import ReplayIcon from "@mui/icons-material/Replay";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ReorderIcon from "@mui/icons-material/Reorder";
import { createAPIEndpoints, ENDPOINTS } from "../../api";
import { useEffect, useState } from "react";

const pMethods = [
  { id: "none", title: "Select" },
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
];
const useStyles = makeStyles(theme => ({
  adornmentText: {
    "& .MuiTypography-root": {
      color: "#f3b33d",
      fontWeight: "bolder",
      fontSize: "1.5em",
    },
  },
  submitButtonGroup: {
    backgroundColor: "#f3b33d",
    "& .MuiButton-root": {
      color: "#000",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#f3b33d",
      },
    },
  },
}));
export default function OrderForm(props) {
  const { values, errors, handleInputChange } = props;
  const classes = useStyles();
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    createAPIEndpoints(ENDPOINTS.CUSTOMER)
      .fetchAll()
      .then(res => {
        let customerList = res.data.map(item => ({
          id: item.customerId,
          title: item.customerName,
        }));
        customerList = [{ id: 0, title: "Select" }].concat(customerList);
        setCustomerList(customerList);
      })
      .catch(err => console.log(err));
  });

  return (
    <Form>
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
                    className={classes.adornmentText}
                    position="start"
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
                    className={classes.adornmentText}
                    position="start"
                  >
                    $
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <ButtonGroup
            sx={{ marginTop: "10px" }}
            className={classes.submitButtonGroup}
          >
            <MuiButton size="large" endIcon={<RestaurantIcon />} type="submit">
              Submit
            </MuiButton>
            <MuiButton size="small" startIcon={<ReplayIcon />}></MuiButton>
          </ButtonGroup>
          <Button size="large" startIcon={<ReorderIcon />}></Button>
        </Grid>
      </Grid>
    </Form>
  );
}
