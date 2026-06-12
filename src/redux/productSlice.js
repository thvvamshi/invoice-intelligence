import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    setProducts: (_, action) => action.payload,

    addProducts: (state, action) => {
      state.push(...action.payload);
    },

    updateProduct: (state, action) => {
      const { id, updates } = action.payload;

      const product = state.find((item) => item.id === id);

      if (product) {
        Object.assign(product, updates);
      }
    },

    removeProduct: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  setProducts,
  addProducts,
  updateProduct,
  removeProduct,
} = productSlice.actions;

export default productSlice.reducer;