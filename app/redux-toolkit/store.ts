import { configureStore } from "@reduxjs/toolkit";
import quotesReducer from "./slices/quotes/index";
// import { Reducer } from "redux";

const store = configureStore({
    reducer: {
        quotes: quotesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;