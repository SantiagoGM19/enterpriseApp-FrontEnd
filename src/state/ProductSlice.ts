import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listOfProducts: [
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
            saveProduct(state, action) {
                const newListOfProducts = [...state.listOfProducts, action.payload]
                const newState = { ...state, listOfProducts: newListOfProducts }
                return newState
            },
            updateProductState(state, action) {

            },
            deleteProductState(state, action) {
                const newListOfProducts = state.listOfProducts.filter(product => product.productId !== action.payload)
                const newState = { ...state, listOfProviders: newListOfProducts }
                return newState
            }
        }
    }
)

export default productSlice.reducer

export const {
    getAllProducts,
    saveProduct,
    updateProductState,
    deleteProductState } = productSlice.actions