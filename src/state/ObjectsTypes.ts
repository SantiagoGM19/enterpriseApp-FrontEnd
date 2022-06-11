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
    id:string,
    providerName:string,
    listOfProductsReceived:Product[],
    idProvider:string
}

export type Bill = {
    id:string,
    date:Date,
    clientName:string,
    salePerson:string,
    listOfProductsBought:Product[],
    totalPaid:number
}