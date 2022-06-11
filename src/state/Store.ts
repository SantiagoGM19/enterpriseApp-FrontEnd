import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import ProviderSlice from "./ProviderSlice";


const store = configureStore({
    reducer: {
        product: ProductSlice,
        provider: ProviderSlice
    }
})

type stateType = ReturnType<typeof store.getState>

export default store

export type { stateType }
