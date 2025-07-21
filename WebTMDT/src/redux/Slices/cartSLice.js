import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosClient } from "../../api/axiosClient";


export const fetchCart = createAsyncThunk("cart/fetchProduct", async () => {
    const response = await axiosClient.get("/api/cart");
    return response.data;
})

export const addCart = createAsyncThunk("cart/addCart", async ({ idProduct, quantity }) => {
    const reponse = await axiosClient.post("/api/cart", { idProduct, quantity });
    return reponse.data;

})

export const deleteCart = createAsyncThunk("products/deleteCart", async (id) => {
    await axiosClient.delete(`/api/cart/${id}`);
    return id;
})

export const updateCart = createAsyncThunk("products/updateCart", async ({ id, quantity }) => {


    const updateProduct = { quantity };
    const response = await axiosClient.patch(`/api/products/${id}`, updateProduct)

    return response.data;
})

// payment


export const fetchBill = createAsyncThunk("bill/fetchBill", async () => {
    const response = await axiosClient.get("/api/payment");
    return response.data;
})

export const addBill = createAsyncThunk("bill/addBill", async ({ name, phone , address , note , cart , totalPrice }) => {
    const reponse = await axiosClient.post("/api/payment", { name, phone , address , note , cart , totalPrice });
    return reponse.data;

})



const initialState = { cart: [] , bill : [], loading: false, error: null };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // setFilter: (state, action) => {
        //     state.filter = action.payload;
        // },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.loading = false;
                // state.cart.unshift(action.payload);
            })
            .addCase(addCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = state.cart.filter(item => item.id !== action.payload);
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false;
                let index = state.cart.findIndex(item => item.id === action.payload.id)
                if (index !== -1) {
                    state.cart[index] = action.payload;
                }

            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchBill.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBill.fulfilled, (state, action) => {
                state.loading = false;
                state.bill = action.payload;
            })
            .addCase(fetchBill.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addBill.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBill.fulfilled, (state, action) => {
                state.loading = false;
                state.bill.unshift(action.payload);
            })
            .addCase(addBill.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
});
// export const { setFilter } = cartSlice.actions
export default cartSlice.reducer;
