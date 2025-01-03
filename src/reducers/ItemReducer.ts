import Item from "../models/Item.ts";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: Item[] = [];

const itemSlice = createSlice({
    name: "item",
    initialState: initialState,
    reducers: {
        saveItem: (state, action) => {
            const { name, qty, unitPrice } = action.payload;

            if (!name || qty <= 0 || unitPrice <= 0) {
                alert("Please fill in all the fields correctly.");
                return;
            }

            const itemExists = state.some((item) => item.name === name);
            if (itemExists) {
                alert("Item already exists.");
                return;
            }

            const id = generateItemId(state);
            const newItem = {id, name, qty, unitPrice};
            state.push(newItem);
        },
        updateItem: (state, action) => {
            const { name, qty, unitPrice } = action.payload;

            if (!name || qty <= 0 || unitPrice <= 0) {
                alert("Please fill in all the fields correctly.");
                return;
            }

            const item = state.find((item) => item.name === name);
            if (!item) {
                alert("Item not found.");
                return;
            }

            item.qty = qty;
            item.unitPrice = unitPrice;
        },
        deleteItem: (state, action) => {
            const updatedState = state.filter((item) => item.name !== action.payload);

            if (updatedState.length === state.length) {
                alert("Item not found.");
                return;
            }

            return updatedState;
        },
    },
});

export const { saveItem, updateItem, deleteItem } = itemSlice.actions;
export default itemSlice.reducer;

export const generateItemId = (state: Item[]): number => {
    return state.length > 0 ? state[state.length - 1].id + 1 : 1;
};
