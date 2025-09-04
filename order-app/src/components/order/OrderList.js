import { useState, useEffect } from "react";
import { createAPIEndpoints, ENDPOINTS } from "../../api";
import Table from "../layout/Table";
import { TableBody, TableCell, TableRow, TableHead } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
export default function OrderList(props) {
  const [orderList, setOrderList] = useState([]);
  const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } =
    props;
  useEffect(() => {
    createAPIEndpoints(ENDPOINTS.ORDER)
      .fetchAll()
      .then(res => {
        setOrderList(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  const showForUpdate = id => {
    setOrderId(id);
    setOrderListVisibility(false);
  };
  const deleteOrder = id => {
    if (window.confirm("Are you sure to delete this record?")) {
      createAPIEndpoints(ENDPOINTS.ORDER)
        .delete(id)
        .then(res => {
          setOrderListVisibility(false);
          setOrderId(0);
          resetFormControls();
          setNotify({ isOpen: true, message: "order has been deleted" });
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Order No.</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Payed With</TableCell>
          <TableCell>Grand Total</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orderList.map(item => (
          <TableRow key={item.orderMasterId}>
            <TableCell
              onClick={() => {
                showForUpdate(item.orderMasterId);
              }}
            >
              {item.orderNumber}
            </TableCell>
            <TableCell
              onClick={() => {
                showForUpdate(item.orderMasterId);
              }}
            >
              {item.customer.customerName}
            </TableCell>
            <TableCell
              onClick={() => {
                showForUpdate(item.orderMasterId);
              }}
            >
              {item.pMethod}
            </TableCell>
            <TableCell
              onClick={() => {
                showForUpdate(item.orderMasterId);
              }}
            >
              {item.gTotal}
            </TableCell>
            <TableCell>
              <DeleteOutlineOutlinedIcon
                onClick={() => {
                  deleteOrder(item.orderMasterId);
                }}
                color="secondary"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
