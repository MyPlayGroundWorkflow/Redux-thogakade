import {configureStore} from "@reduxjs/toolkit";
import CustomerReducer from "../reducers/CustomerReducer.ts";
import ItemReducer from "../reducers/ItemReducer.ts";
import OrderReducer from "../reducers/OrderReducer.ts";

export const store = configureStore({
    reducer: {
        customers : CustomerReducer,
        items : ItemReducer,
        orders : OrderReducer
    }
})