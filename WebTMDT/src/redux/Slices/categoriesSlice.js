import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { axiosClient } from "../../api/axiosClient";


export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    const response = await axiosClient.get("/api/categories");
    return response.data;
})

export const fetchCategoriesById = createAsyncThunk('products/fetchCategoriesById', async (id) => {
    const response = await axiosClient.get(`/api/categories/${id}`);
    return response.data;
})





const initialState = { categories: [], loading: false, error: null, currentCaterogy: null , filter: ""};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
         setLowToHighPrice: (state, action) => {
            state.currentCaterogy.productList = action.payload

        },
        setHighToLowPrice: (state, action) => {
            state.currentCaterogy.productList = action.payload  

        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCategoriesById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoriesById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCaterogy = action.payload
            })
            .addCase(fetchCategoriesById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


    }
});
export const { setLowToHighPrice , setHighToLowPrice , setFilter} = categoriesSlice.actions
export default categoriesSlice.reducer;
