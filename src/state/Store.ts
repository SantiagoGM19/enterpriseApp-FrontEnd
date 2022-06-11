import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import ProviderSlice from "./ProviderSlice";
import ReceiptSlice from "./ReceiptSlice";


const store = configureStore({
    reducer: {
        product: ProductSlice,
        provider: ProviderSlice,
        receipt: ReceiptSlice
    }
})

type stateType = ReturnType<typeof store.getState>

export default store

export type { stateType }
