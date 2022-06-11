import { Receipt } from "../state/ObjectsTypes";

export const fetchAllReceipts = async () => {
    let response = await fetch("http://localhost:8081/receipts")
    let data = response.json()
    return data
};

export const addReceipt = async (receipt: Receipt) => {
    let receiptSavedPromise = await fetch("http://localhost:8081/receipts",
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

