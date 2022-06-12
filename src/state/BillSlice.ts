import { createSlice } from "@reduxjs/toolkit";
import { Bill } from "./ObjectsTypes";

const initialState = {
    listOfBills: [
        {
            billId: "",
            date: Date.now(),
            clientName: '',
            salePerson: '',
            boughtProducts: [
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
            totalPaid: 0.0
        }
    ]
}


const billSlice = createSlice(
    {
        name: 'bill',
        initialState,
        reducers: {
            getAllBills(state, action) {
                const listOfBills = [...action.payload]
                const newStateListOfBills = listOfBills.map(bill => {
                    return {
                        billId: bill.billId,
                        date: bill.date,
                        clientName: bill.clientName,
                        salePerson: bill.salePerson,
                        boughtProducts: [...bill.boughtProducts],
                        totalPaid: bill.totalPaid
                    }
                })
                const newSate = { ...state, listOfBills: newStateListOfBills }
                return newSate
            },
            saveBill(state, action) {
                const newListOfBills = [...state.listOfBills, action.payload]
                const newStateOfBills = {...state, listOfReceipts: newListOfBills}
                return newStateOfBills
            }
        }
    }
)

export default billSlice.reducer

export const {
    getAllBills,
    saveBill
} = billSlice.actions

