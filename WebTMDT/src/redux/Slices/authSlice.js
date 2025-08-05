import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from './../../api/axiosClient';




export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password, fullName }, { rejectWithValue }) => {
        try {
            console.log("email--re", email);
            console.log("password--re", password);
            console.log("name--re", fullName);
            const response = await axiosClient.post("/api/signup", {
                email,
                password,
                fullName,
            });
            console.log("response--re", response);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            console.log(message, "message");
            if (error.response?.status === 409) {
                return rejectWithValue(message);
            }
            return rejectWithValue("Loi khong xac dinh")
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post("/api/login", {
                email,
                password,
            });
            console.log("response", response);
            const { accessToken, user } = response.data;
            console.log("user", user);

            console.log("accesstoken_", accessToken);


            if (accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken)
            }

            return accessToken;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            console.log(message, "message");
            if (error.response?.status === 401) {
                return rejectWithValue(message);
            }
            return rejectWithValue("Loi khong xac dinh")
        }
    }
)

export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
})

const authSlices = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        accessToken: localStorage.getItem("accessToken") || null,
        loading: false,
        error: null,
    },
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || "Regisser Failed";
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || "Login Failed";
            })
            .addCase(logout.fulfilled, (state) => {
                state.accessToken = null;
                state.user = null;
            });
    }
})



export default authSlices.reducer

