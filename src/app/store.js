import { configureStore } from "@reduxjs/toolkit";

import invoiceReducer from "../redux/invoiceSlice";
import productReducer from "../redux/productSlice";
import customerReducer from "../redux/customerSlice";

export const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
    products: productReducer,
    customers: customerReducer,
  },
});