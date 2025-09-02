import { useState, useEffect } from "react";
import { createAPIEndpoints, ENDPOINTS } from "../../api";
import Table from "../layout/Table";
import { TableBody, TableCell, TableRow, TableHead } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
export default function OrderList() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    createAPIEndpoints(ENDPOINTS.ORDER)
      .fetchAll()
      .then(res => {
        setOrderList(res.data);
      })
      .catch(err => console.log(err));
  }, []);

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
            <TableCell>{item.orderNumber}</TableCell>
            <TableCell>{item.customer.customerName}</TableCell>
            <TableCell>{item.pMethod}</TableCell>
            <TableCell>{item.gTotal}</TableCell>
            <TableCell>
              <DeleteOutlineOutlinedIcon color="secondary" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
