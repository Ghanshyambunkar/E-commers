// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const { data } = await axios.post(
                '/api/v1/login', 
                { email, password },
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async ({ name, email, password, avatar }, { rejectWithValue }) => {
        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const { data } = await axios.post(
                '/api/v1/register', 
                { name, email, password, avatar },
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: {},
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; 
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })

            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; 
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            });
    }
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
