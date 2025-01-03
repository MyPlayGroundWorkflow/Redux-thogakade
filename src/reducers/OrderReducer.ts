import Order from "../models/Order";
import {createSlice} from "@reduxjs/toolkit";

export const initialState: Order[] = [];

const orderSlice = createSlice({
    name: "order",
    initialState : initialState,
    reducers: {
        saveOrder: (state, action) => {
            const { customer, date, status, items } = action.payload;

            if (!customer || !date || !status || items.length === 0) {
                alert("Please fill in all the fields.");
                return;
            }

            const id = generateOrderId(state);
            state.push({id, customer, date, status, items});
            alert('Order saved successfully!');
        }
    },
});

export const { saveOrder } = orderSlice.actions;
export default orderSlice.reducer;

function generateOrderId(state: Order[]): number {
    return state.length > 0 ? state[state.length - 1].id + 1 : 1;
}