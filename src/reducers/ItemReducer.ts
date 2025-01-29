import Item from "../models/Item.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: Item[] = [];

const api = axios.create({
        baseURL: 'http://localhost:3000',
    }
)

export const getItems = createAsyncThunk(
    "item/getItem",
    async () => {
        try {
            const response = await api.get("/item/");
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const addItem = createAsyncThunk(
    "item/addItem",
    async (item: Item) => {
        try {
            const response = await api.post("/item/add", item);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateItem = createAsyncThunk(
    "item/updateItem",
    async (item: Item) => {
        try {
            const response = await api.put("/item/update/"+item.id, item);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteItem = createAsyncThunk(
    "item/deleteItem",
    async (id) => {
        try {
            const response = await api.delete(`/item/delete/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

const itemSlice = createSlice({
    name: "item",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addItem.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(addItem.rejected, (state, action) => {
                console.log("item save rejected");
            })
            .addCase(addItem.pending, (state, action) => {
                console.log("item save pending");
            })
        builder
            .addCase(getItems.fulfilled, (state, action) => {
                state.splice(0, state.length);
                state.push(...action.payload);
            })
            .addCase(getItems.rejected, (state, action) => {
                console.log("item get rejected");
            })
            .addCase(getItems.pending, (state, action) => {
                console.log("item get pending");
            })
        builder
            .addCase(updateItem.fulfilled, (state, action) => {
                console.log("item update fulfilled");
                const updatedItem = action.payload; // Ensure the server response contains the updated item object
                const index = state.findIndex((item) => item.id === updatedItem.id);
                if (index !== -1) {
                    state[index] = { ...state[index], ...updatedItem }; // Replace with updated item data
                }
            })
            .addCase(updateItem.rejected, (state, action) => {
                console.log("item update rejected");
            })
            .addCase(updateItem.pending, (state, action) => {
                console.log("item update pending");
            })
        builder
            .addCase(deleteItem.fulfilled, (state, action) => {
                console.log("item delete fulfilled");
                const deletedItemId = action.payload.id; // Ensure the server response contains the deleted item id
                return state.filter((item) => item.id !== deletedItemId);
            })
            .addCase(deleteItem.rejected, (state, action) => {
                console.log("item delete rejected");
            })
            .addCase(deleteItem.pending, (state, action) => {
                console.log("item delete pending");
            })
    }
});

export const { } = itemSlice.actions;
export default itemSlice.reducer;

