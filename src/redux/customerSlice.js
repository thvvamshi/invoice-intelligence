import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const customerSlice = createSlice({
  name: "customers",
  initialState,

  reducers: {
    setCustomers: (_, action) => action.payload,

    addCustomers: (state, action) => {
      state.push(...action.payload);
    },

    updateCustomer: (state, action) => {
      const { id, updates } = action.payload;

      const customer = state.find((item) => item.id === id);

      if (customer) {
        Object.assign(customer, updates);
      }
    },

    removeCustomer: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  setCustomers,
  addCustomers,
  updateCustomer,
  removeCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;