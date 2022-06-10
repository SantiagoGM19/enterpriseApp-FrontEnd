import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";


const store = configureStore({
    reducer: {
        product: ProductSlice
    }
})

type stateType = ReturnType<typeof store.getState>

export default store

export type { stateType }
