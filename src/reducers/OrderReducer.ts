import Order from "../models/Order";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: Order[] = [];

const api = axios.create({
        baseURL: 'http://localhost:3000',
    }
)

export const getOrders = createAsyncThunk(
    "order/getOrder",
    async () => {
        try {
            const response = await api.get("/order/");
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const addOrder = createAsyncThunk(
    "order/addOrder",
    async (order: Order) => {
        try {
            const response = await api.post("/order/add", order);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)
const orderSlice = createSlice({
    name: "order",
    initialState : initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.splice(0, state.length);
                state.push(...action.payload);
            })
            .addCase(getOrders.rejected, (state, action) => {
                console.log("order get rejected");
            })
            .addCase(getOrders.pending, (state, action) => {
                console.log("order get pending");
            })
        builder
            .addCase(addOrder.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(addOrder.rejected, (state, action) => {
                console.log("order add rejected");
            })
            .addCase(addOrder.pending, (state, action) => {
                console.log("order add pending");
            })
    }
});

export const { } = orderSlice.actions;
export default orderSlice.reducer;
