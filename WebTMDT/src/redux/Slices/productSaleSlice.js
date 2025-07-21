import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosClient } from "../../api/axiosClient";


export const fetchProductSale = createAsyncThunk("productSale/fetchProductSale", async () => {
    const response = await axiosClient.get("/api/productSale");
    return response.data;
})

export const fetchProductById = createAsyncThunk('productSale/fetchProductById', async (id) => {
    const response = await axiosClient.get(`/api/productSale/${id}`);
    return response.data;
})



const initialState = { productSale: [], loading: false, error: null , currentProductSale: null};

const productSaleSlice = createSlice({
    name: "productSale",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProductSale.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductSale.fulfilled, (state, action) => {
                state.loading = false;
                state.productSale = action.payload;
            })
            .addCase(fetchProductSale.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                state.currentProductSale = action.payload


            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


    }
});

export default productSaleSlice.reducer;
