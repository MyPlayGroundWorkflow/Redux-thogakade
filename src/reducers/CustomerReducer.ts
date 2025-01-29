import Customer from "../models/Customer.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const initialState: Customer[] = [];

const api = axios.create({
        baseURL: 'http://localhost:3000',
    }
)

export const addCustomer = createAsyncThunk(
    "customer/addCustomer",
    async (customer: Customer) => {
        try {
            const response = await api.post("/customer/add", customer);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const getCustomers = createAsyncThunk(
    "customer/getCustomer",
    async () => {
        try {
            const response = await api.get("/customer/");
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async (customer: Customer) => {
        try {
            const response = await api.put("/customer/update/"+customer.id, customer);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (id) => {
        try {
            const response = await api.delete("/customer/delete/"+id);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)


const customerSlice = createSlice({
    name: "customer",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(addCustomer.rejected, (state, action) => {
                console.log("customer save rejected");
            })
            .addCase(addCustomer.pending, (state, action) => {
                console.log("customer save pending");
            })
        builder
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.splice(0, state.length);
                state.push(...action.payload);
            })
            .addCase(getCustomers.rejected, (state, action) => {
                console.log("customer get rejected");
            })
            .addCase(getCustomers.pending, (state, action) => {
                console.log("customer get pending");
            })
        builder
            .addCase(updateCustomer.fulfilled, (state, action) => {
                console.log("customer update fulfilled");
                const updatedCustomer = action.payload; // Ensure the server response contains the updated customer object
                const index = state.findIndex((customer) => customer.id === updatedCustomer.id);
                if (index !== -1) {
                    state[index] = { ...state[index], ...updatedCustomer }; // Replace with updated customer data
                }
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                console.log("customer update rejected");
            })
            .addCase(updateCustomer.pending, (state, action) => {
                console.log("customer update pending");
            })
        builder
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                const deletedCustomerId = action.payload.id; // Ensure the server response includes the deleted customer's ID
                return state.filter((customer) => customer.id !== deletedCustomerId);
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                console.log("customer delete rejected");
            })
            .addCase(deleteCustomer.pending, (state, action) => {
                console.log("customer delete pending");
            })
    }
});


export const {} = customerSlice.actions;
export default customerSlice.reducer;
