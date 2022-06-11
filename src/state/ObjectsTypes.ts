export type Product = {
    productId?:string,
    name:string,
    description:string,
    minimum:number,
    maximum:number,
    stock:number,
    price:number,
    provider:ProviderObject
}

export type ProviderObject = {
    providerId?:string,
    name:string,
    phone:string
}

export type Receipt = {
    receiptId?:string,
    name:string,
    productsReceived:Product[],
    providerId:string,
    date: Date
}

export type Bill = {
    billId?:string,
    date:Date,
    clientName:string,
    salePerson:string,
    productsBought:Product[],
    totalPaid:number
}