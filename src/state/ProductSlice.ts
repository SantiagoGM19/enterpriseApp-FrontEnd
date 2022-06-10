import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listOfProducts: [
        {
            id: "",
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
    ]
}

const productSlice = createSlice(
    {
        name: 'product',
        initialState,
        reducers: {
            getAllProducts(state, action) {
                const newState = { ...state, listOfProducts: action.payload }
                return newState
            },
            addProduct(state, action) {

            },
            updateProduct(state, action) {

            },
            deleteProduct(state, action) {

            }
        }
    }
)

export default productSlice.reducer

export const {
    getAllProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct} = productSlice.actions