import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listOfProviders: [
        {
            providerId: '',
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
            const newListOfProviders = [...state.listOfProviders, action.payload]
            const newState = {...state, listOfProviders: newListOfProviders}
            return newState
        },
        updateProviderState(state, action) {
            const newListOfProviders = state.listOfProviders.filter(provider => provider.providerId !== action.payload)
            const newState = {...state, listOfProviders: newListOfProviders}
            return newState
        },
        deleteProviderState(state, action) {
            
        }
    }
})

export default providerSlice.reducer

export const {
    getAllProviders,
    addProvider,
    updateProviderState,
    deleteProviderState
} = providerSlice.actions