import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listOfReceipts: [
        {
            receiptId: '',
            name: '',
            productsReceived: [
                {
                    productId: "",
                    name: "",
                    description: "default description",
                    minimum: 0,
                    maximum: 0,
                    stock: 0,
                    price: 0.0,
                    provider: {
                        id: "",
                        name: "",
                        phone: ""
                    }
                }
            ],
            providerId: '',
            date: Date.now()
        }
    ]
}

const receiptSlice = createSlice({
    name:'receipt',
    initialState,
    reducers: {
        getAllReceipts(state, action){
            const listOfReceipts = [...action.payload]
            const newStateListOfReceipts = listOfReceipts.map(receipt => {
                return {receiptId: receipt.receiptId, 
                    name: receipt.providerName,
                    productsReceived: [...receipt.productsReceived],
                    providerId: receipt.providerId,
                    date: receipt.date
                }
            })
            const newSate = {...state, listOfReceipts: newStateListOfReceipts}
            return newSate
        },
        saveReceipt(state, action){
            const newListOfReceipts = [...state.listOfReceipts, action.payload]
            const newStateOfReceipts = {...state, listOfReceipts: newListOfReceipts}
            return newStateOfReceipts
        }
    }
})

export default receiptSlice.reducer

export const {
    getAllReceipts,
    saveReceipt
} = receiptSlice.actions