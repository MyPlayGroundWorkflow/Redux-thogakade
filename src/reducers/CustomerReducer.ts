import Customer from "../models/Customer.ts";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: Customer[] = [];

const customerSlice = createSlice({
    name: "customer",
    initialState: initialState,
    reducers: {
        saveCustomer: (state, action) => {
            const { name, email, telephone } = action.payload;
            if (!name || !email || !telephone) {
                alert("Please fill in all the fields.");
                return;
            }
            const emailExists = state.some((customer) => customer.email === email);
            if (emailExists) {
                alert("This email is already in use. Please use a different email.");
                return;
            }

            const id = generateCustomerId(state);
            const newCustomer = {id, name, email, telephone};
            state.push(newCustomer);
        },
        updateCustomer: (state, action) => {
            if (confirm("Are you sure you want to update this customer?")) {
                const { name, email, telephone } = action.payload;
                if (!name || !email || !telephone) {
                    alert("Please fill in all the fields.");
                    return;
                }
                const customer = state.find((customer) => customer.email === email);
                if (!customer) {
                    alert("Customer not found.");
                    return;
                }

                customer.name = name;
                customer.email = email;
                customer.telephone = telephone;

                alert("Customer updated successfully!");
            }
        },
        deleteCustomer: (state, action) => {
            if (confirm("Are you sure you want to delete this customer?")) {
                const updatedState = state.filter((customer) => customer.email !== action.payload);

                if (updatedState.length === state.length) {
                    alert("Customer not found.");
                    return;
                }

                alert("Customer deleted successfully!");
                return updatedState;
            }
        }
    },
});


export const {saveCustomer, updateCustomer, deleteCustomer} = customerSlice.actions;
export default customerSlice.reducer;

export const generateCustomerId = (state: Customer[]): number => {
    return state.length > 0 ? state[state.length - 1].id + 1 : 1;
};