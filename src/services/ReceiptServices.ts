import { Receipt } from "../state/ObjectsTypes";

const URL = "https://enterpriseapp-backend.herokuapp.com/receipts"

export const fetchAllReceipts = async () => {
    let response = await fetch(URL)
    let data = response.json()
    return data
};

export const addReceipt = async (receipt: Receipt) => {
    let receiptSavedPromise = await fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(receipt)
        })
    let receiptSaved = await receiptSavedPromise.json()
    return receiptSaved
};

