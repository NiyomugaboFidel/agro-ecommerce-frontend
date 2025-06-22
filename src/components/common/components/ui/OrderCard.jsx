import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import i18n from "../LangConfig";

const OrderCard = ({ order, getStatusStyle, handleCancelOrder }) => {
  return (
    <Card
      className="text-sm"
      style={{
        width: "100%",
        maxWidth: 400,
        marginBottom: "1rem",
        border: "1px",
        borderColor: "yellowgreen",
      }}
    >
      <CardContent style={{ padding: "16px" }}>
        <div className="flex items-center justify-between mb-3">
          <h1 component="">
            {i18n.t("orderCard.orderId")}: {order._id.slice(0, 10)}...
          </h1>
          <h1 variant="h6" style={getStatusStyle(order.orderStatus)}>
            {order.orderStatus}
          </h1>
        </div>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>{i18n.t("orderCard.orderDate")}: </strong>
          {format(new Date(order.createdAt), "MMMM d, yyyy")}
        </Typography>

        <h1 className="mt-3 font-bold text-base">
          {i18n.t("orderCard.products")}:
        </h1>
        <Table size="small" aria-label="products table">
          <TableBody>
            {order.products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body2">
                    {product.product.title}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {product.quantity} {product.unit}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    CFA {product.product.price}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h1 className="mt-2 text-sm flex justify-between">
          <strong>{i18n.t("orderCard.totalPrice")}: </strong> FCA{" "}
          {order.totalPrice}
        </h1>

        {order.orderStatus !== "Cancelled" ||
          (order.orderStatus !== "Delivered" && (
            <Button
              variant="contained"
              color="secondary"
              className="mt-4"
              onClick={() => handleCancelOrder(order._id)}
              style={{ padding: "6px 12px", fontSize: "0.875rem" }}
            >
              {i18n.t("orderCard.cancelOrder")}
            </Button>
          ))}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
