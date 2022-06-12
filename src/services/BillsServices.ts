import { Bill } from "../state/ObjectsTypes";

export const fetchAllBills = async () => {
    let response = await fetch("http://localhost:8081/bills")
    let data = response.json()
    return data
};

export const addBill = async (bill: Bill) => {
    let billSavedPromise = await fetch("http://localhost:8081/bills",
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