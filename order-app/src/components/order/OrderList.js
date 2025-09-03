import { useState, useEffect } from "react";
import { createAPIEndpoints, ENDPOINTS } from "../../api";
import Table from "../layout/Table";
import { TableBody, TableCell, TableRow, TableHead } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
export default function OrderList(props) {
  const [orderList, setOrderList] = useState([]);
  const { setOrderId, setOrderListVisibility } = props;
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
              <DeleteOutlineOutlinedIcon color="secondary" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
