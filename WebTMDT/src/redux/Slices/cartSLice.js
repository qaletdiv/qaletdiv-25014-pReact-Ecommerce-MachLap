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

export const updateCartQuantity = createAsyncThunk("products/updateCartQuantity", async ({ id, quantity }) => {


    const updateProduct = { id, quantity };
    const response = await axiosClient.patch(`/api/updateCartQuantity`, updateProduct)

    return response.data;
})

export const toggleChecked = createAsyncThunk("cart/toggleItemChecked", async ({ id, checked }) => {
    const updateCart = { id, checked };

    const response = await axiosClient.patch(`/api/toggleCart`, updateCart)

    return response.data;
})


// payment


export const fetchBill = createAsyncThunk("bill/fetchBill", async () => {
    const response = await axiosClient.get("/api/payment");
    return response.data;
})

export const addBill = createAsyncThunk("bill/addBill", async ({ name, phone, address, note, cart, totalPrice }) => {
    const reponse = await axiosClient.post("/api/payment", { name, phone, address, note, cart, totalPrice });
    return reponse.data;

})

// confirm cart
export const fetchConfirmCart = createAsyncThunk("bill/fetchConfirmCart", async () => {
    const response = await axiosClient.get("/api/confirmCart");
    return response.data;
})

export const addConfirmCart = createAsyncThunk("bill/addConfirmCart", async ({ cart, totalPrice }) => {
    const reponse = await axiosClient.post("/api/confirmCart", { cart, totalPrice });
    return reponse.data;

})


const initialState = { cart: [], bill: [], loading: false, error: null, confirmCart: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // toggleItemChecked: (state, action) => {
        //     const item = state.cart.find((i) => i.id === action.payload);
        //     if (item) item.checked = !item.checked;
        // },
        // toggleAllChecked: (state, action) => {
        //     state.cart.forEach((item) => {
        //         item.checked = action.payload;
        //     });
        // },
        increaseQuantity: (state, action) => {
            const item = state.cart.find((i) => i.id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const item = state.cart.find((i) => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload
                // .map(item => ({
                //     ...item,
                //     checked: item.checked ?? false, // Luôn có giá trị boolean
                //     quantity: item.quantity ?? 1
                // }));
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
            .addCase(updateCartQuantity.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload

            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(toggleChecked.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleChecked.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload

            })
            .addCase(toggleChecked.rejected, (state, action) => {
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
            .addCase(fetchConfirmCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConfirmCart.fulfilled, (state, action) => {
                state.loading = false;
                state.confirmCart = action.payload;
            })
            .addCase(fetchConfirmCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addConfirmCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addConfirmCart.fulfilled, (state, action) => {
                state.loading = false;
                state.confirmCart.unshift(action.payload);
                state.cart = state.cart.filter(item => item.checked === false);
            })
            .addCase(addConfirmCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
});
// export const { setFilter } = cartSlice.actions
export default cartSlice.reducer;
export const { increaseQuantity, decreaseQuantity } = cartSlice.actions;
