import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listOfProviders: [
        {
            id: '',
            name: '',
            phone: ''
        }
    ]
}

const providerSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {
        getAllProviders(state, action) {
            const newState = { ...state, listOfProviders: action.payload }
            return newState
        },
        addProvider(state, action) {

        },
        updateProvider(state, action) {

        },
        deleteProvider(state, action) {

        }
    }
})

export default providerSlice.reducer

export const {
    getAllProviders,
    addProvider,
    updateProvider,
    deleteProvider
} = providerSlice.actions