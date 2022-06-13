import { Bill } from "../state/ObjectsTypes";

const URL = "https://enterpriseapp-backend.herokuapp.com/bills"

export const fetchAllBills = async () => {
    let response = await fetch(URL)
    let data = response.json()
    return data
};

export const addBill = async (bill: Bill) => {
    let billSavedPromise = await fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bill)
        })
    let billSaved = await billSavedPromise.json()
    return billSaved
};