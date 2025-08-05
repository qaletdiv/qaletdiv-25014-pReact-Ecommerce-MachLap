import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../api/axiosClient";


export const fetchUserNow = createAsyncThunk("user/fetchUsers", async () => {
    const response = await axiosClient.get("/api/me");
    console.log("---", response.data);

    return response.data;
})






const initialState = { user: null, loading: false, error: null };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {


    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUserNow.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserNow.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserNow.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })



    }
});
export const { setCurrUser } = userSlice.actions
export default userSlice.reducer;
