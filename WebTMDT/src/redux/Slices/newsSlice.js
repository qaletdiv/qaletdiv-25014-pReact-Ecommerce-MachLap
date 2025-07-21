import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../api/axiosClient";


export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
    const response = await axiosClient.get("/api/news");
    return response.data;
})





const initialState = { news: [], loading: false, error: null };

const newsSLice = createSlice({
    name: "news",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


    }
});

export default newsSLice.reducer;
