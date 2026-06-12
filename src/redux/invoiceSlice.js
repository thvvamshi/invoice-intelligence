import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,

  reducers: {
    setInvoices: (_, action) => action.payload,

    addInvoices: (state, action) => {
      state.push(...action.payload);
    },

    updateInvoice: (state, action) => {
      const { id, updates } = action.payload;

      const invoice = state.find((item) => item.id === id);

      if (invoice) {
        Object.assign(invoice, updates);
      }
    },

    removeInvoice: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  setInvoices,
  addInvoices,
  updateInvoice,
  removeInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;