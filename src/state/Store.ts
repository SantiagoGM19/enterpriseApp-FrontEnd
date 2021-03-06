import { configureStore, Middleware } from "@reduxjs/toolkit";
import BillSlice from "./BillSlice";
import loggedInSlice from "./loggedInSlice";
import ProductSlice from "./ProductSlice";
import ProviderSlice from "./ProviderSlice";
import ReceiptSlice from "./ReceiptSlice";


const store = configureStore({
    reducer: {
        product: ProductSlice,
        provider: ProviderSlice,
        receipt: ReceiptSlice,
        bill: BillSlice,
        logged: loggedInSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})

type stateType = ReturnType<typeof store.getState>

export default store

export type { stateType }
